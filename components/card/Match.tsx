import React from "react";
import { Fixture } from "../../constants/interfaces";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  ButtonText,
  Card,
  Divider,
  Heading,
  Image,
  VStack,
  Button,
  Text,
  ImageBackground,
  View,
} from "@gluestack-ui/themed";

interface MatchProps {
  fixture: Fixture;
}

const Match = ({ fixture }: MatchProps) => {
  const { teams } = fixture;

  return (
    <Card p="$6" borderRadius="$lg" maxWidth={360} m="$3">
      <Box flexDirection="row">
        <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">EURO</AvatarFallbackText>
          <AvatarImage
            alt="league-logo"
            source={{
              uri: fixture.league.logo,
            }}
          />
        </Avatar>
        <VStack>
          <Heading size="md" fontFamily="$heading" mb="$1">
            {fixture.league.round}
          </Heading>
          <Text size="sm" fontFamily="$heading">
            {fixture.league.name} - {fixture.league.season}
          </Text>
        </VStack>
      </Box>
      <Box
        sx={{
          mt: "$5",
          flex: 1,
          flexDirection: "row",
        }}
      >
        <View h="$24" w="$24" style={{ flex: 1 }}>
          <ImageBackground
            alt="home-team-logo"
            resizeMode="contain"
            source={{ uri: teams.home?.logo }}
            style={{
              flex: 1,
            }}
          ></ImageBackground>
          <Text size="sm" fontFamily="$heading" textAlign="center">
            {teams.home?.name}
          </Text>
        </View>
        <Divider orientation="vertical" />
        <View h="$24" w="$24" style={{ flex: 1 }}>
          <ImageBackground
            alt="away-team-logo"
            source={{ uri: teams.away?.logo }}
            resizeMode="contain"
            style={{
              flex: 1,
            }}
          ></ImageBackground>
          <Text size="sm" fontFamily="$heading" textAlign="center">
            {teams.away?.name}
          </Text>
        </View>
      </Box>
      <Box
        my="$5"
        sx={{
          flexDirection: "column",
          mb: "$6",
        }}
      >
        <VStack
          alignItems="center"
          sx={{
            pb: "$0",
          }}
        >
          <Heading size="xs" fontFamily="$heading">
            {fixture.fixture.venue.name}
          </Heading>
          <Text size="xs">Place</Text>
        </VStack>
        <Box
          mt="$5"
          sx={{
            flexDirection: "row",
          }}
        >
          <VStack
            alignItems="center"
            sx={{
              flex: 1,
              borderRightWidth: 1,
              borderColor: "$backgroundLight300",
              _dark: {
                borderRightColor: "$backgroundDark800",
              },
            }}
          >
            <Heading size="xs" fontFamily="$heading">
              {fixture.fixture.date
                ? new Date(fixture.fixture.date).toDateString()
                : "N/A"}
            </Heading>
            <Text size="xs">Date</Text>
          </VStack>

          <VStack
            alignItems="center"
            sx={{
              flex: 1,
            }}
          >
            <Heading size="xs" fontFamily="$heading">
              {fixture.fixture.date
                ? new Date(fixture.fixture.date).toLocaleTimeString()
                : "N/A"}
            </Heading>
            <Text size="xs">Time</Text>
          </VStack>
        </Box>
      </Box>

      {/*       <Button py="$2" px="$4">
        <ButtonText size="sm">Follow</ButtonText>
      </Button> */}
    </Card>
    /* <View>
      <Image
        size="md"
        source={{
          uri: teams.home?.logo,
        }}
      />
      <Text>{teams.home?.name}</Text>
      <Image
        size="md"
        source={{
          uri: teams.away?.logo,
        }}
      />
      <Text>{teams.away?.name}</Text>

      {/* <Text>Match Info {JSON.stringify(fixture)}</Text> 
    </View> */
  );
};

export default Match;
