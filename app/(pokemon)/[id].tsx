import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Pokemon, getPokemonDetails } from "@/app/api/pokeApi";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

const PokemonDetails = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);

  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={toggleFavourite}>
          <AntDesign
            name={isFavourite ? "star" : "staro"}
            size={24}
            color="#fff"
          />
        </Pressable>
      ),
    });
  }, [isFavourite]);

  const toggleFavourite = async () => {
    await AsyncStorage.setItem(
      `favourite- ${id}`,
      !isFavourite ? "true" : "false"
    );
    setIsFavourite(!isFavourite);
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["getPokemon", id],
    queryFn: () => getPokemonDetails(id),
  });

  {
    isSuccess &&
      navigation.setOptions({
        title: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      });
  }

  useEffect(() => {
    const load = async () => {
      const isFavourite = await AsyncStorage.getItem(`favourite- ${id}`);
      setIsFavourite(isFavourite === "true");
    };
    load();
  }, [id]);

  return (
    <>
      {data && (
        <>
          <View style={[styles.card, { alignItems: "center" }]}>
            <Image
              source={{ uri: data.sprites.front_shiny }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.text}>
              #{data.id} {data.name}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Stats:</Text>
            {data.stats.map((stat: any) => (
              <Text>
                {stat.stat.name} : {stat.base_stat}
              </Text>
            ))}
          </View>
        </>
      )}
      {isLoading && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="#ff551e" />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 5,
    margin: 10,
    padding: 5,
    gap: 5,
    elevation: 3, // This property creates a shadow for Android devices
    shadowColor: "#000", // Shadow color for iOS
    shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
    shadowOpacity: 0.2, // Shadow opacity for iOS
    shadowRadius: 3, // Shadow radius for iOS
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    textTransform: "capitalize",
  },
});

export default PokemonDetails;
