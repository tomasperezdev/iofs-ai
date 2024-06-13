import {
  Box,
  Button,
  ButtonText,
  FlatList,
  Text,
  View,
} from "@gluestack-ui/themed";
import React from "react";
import { ListRenderItem, ListRenderItemInfo, TextInput } from "react-native";

import { z } from "zod";
import {
  ChatCompletionMessageOrReactElement,
  OpenAI,
  isReactElement,
  useChat,
} from "react-native-gen-ui";
import Match from "../components/card/Match";
import Thinking from "../components/loaders/Thinking";
import { fetchLastMathcData } from "../constants/utils";

import { OPENAISECRET } from "@env";

const FeatureCard = ({ iconSvg: IconSvg, name, desc }: any) => {
  return (
    <Box
      flexDirection="column"
      borderWidth={1}
      borderColor="$borderDark700"
      $web-flex={1}
      m="$2"
      p="$4"
      rounded="$md"
    >
      <Box alignItems="center" display="flex" flexDirection="row">
        {/* <Image source={iconSvg} alt="document" width={22} height={22} /> */}
        <Text>
          <IconSvg />
        </Text>
        <Text fontSize={22} color="$white" fontWeight="500" ml="$2">
          {name}
        </Text>
      </Box>
      <Text color="$textDark400" mt="$2">
        {desc}
      </Text>
    </Box>
  );
};

export interface Item {
  item: React.ReactElement | ChatCompletionMessageOrReactElement;
  index: number;
}

const Home = () => {
  const openAi = new OpenAI({
    apiKey: OPENAISECRET,
    model: "gpt-3.5-turbo",
  });
  const { input, messages, isLoading, handleSubmit, onInputChange } = useChat({
    openAi,
    initialMessages: [
      { content: "Hi! How can I help you today?", role: "assistant" },
    ],
    onSuccess: (messages) => console.log("Chat success:", messages),
    onError: (error) => console.error("Chat error:", error),
    tools: {
      getSchedule: {
        description: "Get information about a tournament match",
        parameters: z.object({}),
        render: async function* () {
          yield <Thinking />;
          let league = 4;
          if (input.toLowerCase().includes("america")) league = 9;
          const matchData = await fetchLastMathcData(league);
          return {
            component: <Match fixture={matchData} />,
            data: {
              instructions:
                "Get fun facts about the teams and players if the match has not started yet. Otherwise, get the score, statistics and other match details. Avoid sharing the teams logos",
              fixture: matchData,
            },
          };
        },
      },
      // Example function - roll a dice
      /* rollDice: {
        description: "Roll a dice",
        parameters: z.object({}),
        render: async function* () {
          return {
            component: <></>,
            data: {
              // Random number between 1 and 6
              result: Math.floor(Math.random() * 6) + 1,
            },
          };
        },
      }, */
    },
  });

  const renderItem: ListRenderItem<ChatCompletionMessageOrReactElement> = ({
    item,
    index,
  }: ListRenderItemInfo<ChatCompletionMessageOrReactElement>) => {
    const isLast = index === messages.length - 1;
    if (isReactElement(item)) {
      // Message can React component or string (see function calling section for more details)
      return item;
    }

    switch (item.role) {
      case "user":
        // User sent messages
        return (
          <Text
            style={{
              color: "blue",
              paddingVertical: 8,
            }}
            key={index}
          >
            {item.content?.toString()}
          </Text>
        );
      case "assistant":
        // Assistant responses
        return (
          <Text key={index} style={{ paddingVertical: 8 }}>
            {item.content?.toString()}
          </Text>
        );
      default:
        // This includes tool calls, tool results and system messages
        // Those are visible to the model, but here we hide them to the user
        return null;
    }
  };
  return (
    <Box flex={1} backgroundColor="$white">
      {/* <ScrollView
        style={{
          height: "100%",
        }}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Box
          position="absolute"
          $base-h={500}
          $base-w={500}
          $lg-h={700}
          $lg-w={700}
        >
          <Gradient />
        </Box>
        <Box
          height="60%"
          $base-my="$16"
          $base-mx="$5"
          $base-h="80%"
          $lg-my="$24"
          $lg-mx="$32"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            bg="#64748B33"
            py="$2"
            px="$6"
            rounded="$full"
            alignItems="center"
            marginTop={20}
            $base-flexDirection="column"
            $sm-flexDirection="row"
            $md-alignSelf="flex-start"
          >
            <Text color="$white" fontWeight="$normal">
              Get started by editing
            </Text>
            <Text color="$white" fontWeight="$medium" ml="$2">
              App.tsx
            </Text>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Logo />
          </Box>
          <Box $base-flexDirection="column" $md-flexDirection="row">
            <FeatureCard
              iconSvg={DocumentData}
              name="Docs"
              desc="Find in-depth information about gluestack features and API."
            />
            <FeatureCard
              iconSvg={LightBulbPerson}
              name="Learn"
              desc="Learn about gluestack in an interactive course with quizzes!"
            />
            <FeatureCard
              iconSvg={Rocket}
              name="Deploy"
              desc="Instantly drop your gluestack site to a shareable URL with vercel."
            />
          </Box>
        </Box>
      </ScrollView> */}
      <View style={{ flex: 1, display: "flex", paddingHorizontal: 20 }}>
        <FlatList
          data={messages}
          inverted
          style={{ flexGrow: 1 }}
          fadingEdgeLength={10}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{
            flexDirection: "column-reverse",
            padding: 12,
          }}
          renderItem={renderItem}
        />
        <View
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          {/* Text input for user to type messages + send button */}
          <TextInput
            value={input}
            style={{
              flex: 1,
              padding: 10,
              borderWidth: 1,
              color: "black",
              borderColor: "black",
            }}
            onChangeText={onInputChange}
          />
          <Button onPress={() => handleSubmit(input)} disabled={isLoading}>
            <ButtonText>Send</ButtonText>
          </Button>
        </View>
      </View>
    </Box>
  );
};

export default Home;
