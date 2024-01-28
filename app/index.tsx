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
import getPokemon from "@/app/api/pokeApi";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["getPokemon"],
    queryFn: () => getPokemon(),
  });

  return (
    <View>
      {isLoading && <ActivityIndicator color="#f4511e" />}
      <ScrollView>
        {data?.map((p) => (
          <Link key={p.id} href={`/(pokemon)/${p.id}`} asChild>
            <TouchableOpacity>
              <View style={styles.Item}>
                <Image source={{ uri: p.image }} style={styles.Image} />
                <Text style={styles.Text}>{p.name}</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={36}
                  color="#f4511e"
                />
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
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
