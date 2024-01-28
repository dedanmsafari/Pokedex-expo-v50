import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { Link, router } from "expo-router";
import getPokemon, { Pokemon } from "@/app/api/pokeApi";

const Index = () => {
  const [pokemon, setPokemon] = React.useState<Pokemon[]>([]);

  React.useEffect(() => {
    const load = async () => {
      const results = await getPokemon();
      setPokemon(results);
    };
    load();
  }, []);

  return (
    <View>
      <Link href="/(pokemon)/test">Go to User</Link>
      <ScrollView>
        {pokemon.map((p) => (
          <Link key={p.id} href={`/(pokemon)/${p.id}`} style={styles.Item}>
            <TouchableOpacity>
              <View>
                <Image source={{ uri: p.image }} style={styles.Image} />
                <Text>{p.name}</Text>
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
    padding: 10,
  },
  Image: {
    height: 100,
    width: 100,
  },
});

export default Index;
