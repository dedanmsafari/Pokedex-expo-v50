import { View, Text, Pressable } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

const queryClient = new QueryClient();

const Layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Pokémons",
            headerRight: () => (
              <Link href="/favourites" asChild>
                <Pressable>
                  <Ionicons name="heart-circle" size={28} color="#fff" />
                </Pressable>
              </Link>
            ),
          }}
        />
        <Stack.Screen name="(pokemon)/[id]" options={{ title: "Loading..." }} />
        <Stack.Screen
          name="favourites"
          options={{ title: "Favourites", presentation: "modal" }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
