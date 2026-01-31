import axios from "axios";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import uuid from "react-native-uuid";
import Product from "../Products";

export default function ListProducts() {
  const [state, setData] = useState([]);
  const url = "https://fakestoreapi.com/products?limit=10";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {state.length === 0 ? (
        <Text>loading...</Text>
      ) : (
        state.map((p) => (
          <Product
            key={uuid.v4()}
            title={p.title}
            price={p.price}
            category={p.category}
            imageUrl={p.image}
            rating={p.rating?.rate ?? "N/A"}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 20,
  },
});
