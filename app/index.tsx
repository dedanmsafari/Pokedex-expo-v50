import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import getPokemon, { Pokemon } from "@/app/api/pokeApi";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { FlashList, ListRenderItem } from "@shopify/flash-list";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getPokemon"],
    queryFn: () => getPokemon(),
  });

  const renderItem: ListRenderItem<Pokemon> = ({ item }) => (
    <Link key={item.id} href={`/(pokemon)/${item.id}`} asChild>
      <TouchableOpacity>
        <View style={styles.Item}>
          <Image source={{ uri: item?.image }} style={styles.Image} />
          <Text style={styles.Text}>{item.name}</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={36}
            color="#f4511e"
          />
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator color="#f4511e" />}
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={100} />
    </View>
  );
};

const styles = StyleSheet.create({
  Item: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "grey",
    paddingRight: 10,
    margin: 10,
    alignItems: "center",
  },
  Image: {
    height: 100,
    width: 100,
  },
  Text: {
    flex: 1,
    fontSize: 15,

    fontWeight: "700",
    textTransform: "capitalize",
    color: "grey",
  },
});

export default Index;
