import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { storage } from "./api/mmkv";
import React, { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { getPokemonDetails } from "./api/pokeApi";
import { Pokemon } from "./api/pokeApi";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  LinearTransition,
  SlideOutLeft,
} from "react-native-reanimated";

const Favourites = () => {
  const [keys, setKeys] = useState(storage.getAllKeys());
  const [data, setData] = useState<Pokemon[]>([]);
  const pokemonQueries = useQueries({
    queries: keys.map((key) => {
      const pokeId = key.split("-")[1];
      return {
        queryKey: ["pokemon", pokeId],
        queryFn: () => getPokemonDetails(pokeId),
      };
    }),
  });

  const allFinished = pokemonQueries.map((p) => p.isSuccess);

  useEffect(() => {
    if (allFinished) {
      const newData = pokemonQueries.map((p) => p.data!);
      setData(newData);
    }
  }, []);

  const removeItem = (id: number) => {
    storage.delete(`favourite-${id}`);
    setData(data.filter((data) => data.id !== id));
  };

  return (
    <ScrollView>
      {data.length > 0 &&
        data?.map((item, index) => (
          <Animated.View
            key={item.id}
            style={styles.Item}
            layout={LinearTransition.delay(100)}
            entering={FadeIn.delay(100 * index)}
            exiting={SlideOutLeft.duration(200)}
          >
            <Image
              source={{ uri: item?.sprites.front_shiny }}
              style={styles.Image}
            />
            <Text style={styles.Text}>{item?.name}</Text>
            <TouchableOpacity onPress={() => removeItem(item?.id)}>
              <FontAwesome name="trash-o" size={24} color="#c10505" />
            </TouchableOpacity>
          </Animated.View>
        ))}
    </ScrollView>
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

export default Favourites;
