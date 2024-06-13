import { config } from "@gluestack-ui/config";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import Home from "./screens/Home";
import React from "react";
export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <Home />
    </GluestackUIProvider>
  );
}
