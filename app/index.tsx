import { View, Text } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const Index = () => {
  return (
    <View>
      <Link href="/(pokemon)/test">Go to User</Link>
    </View>
  );
};

export default Index;
