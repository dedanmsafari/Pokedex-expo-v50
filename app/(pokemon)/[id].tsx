import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Pokemon, getPokemonDetails } from "@/app/api/pokeApi";
import { useLocalSearchParams, useNavigation } from "expo-router";

const PokemonDetails = () => {
  const [pokemonDetails, setPokemonDetails] = useState<Pokemon>();
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  useEffect(() => {
    const load = async () => {
      const details = await getPokemonDetails(id);
      setPokemonDetails(details);
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      });
    };
    load();
  }, [id]);

  return (
    <>
      {pokemonDetails ? (
        <>
          <View style={[styles.card, { alignItems: "center" }]}>
            <Image
              source={{ uri: pokemonDetails.sprites.front_shiny }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.text}>
              #{pokemonDetails.id} {pokemonDetails.name}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Stats:</Text>
            {pokemonDetails.stats.map((stat: any) => (
              <Text>
                {stat.stat.name} : {stat.base_stat}
              </Text>
            ))}
          </View>
        </>
      ) : (
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
