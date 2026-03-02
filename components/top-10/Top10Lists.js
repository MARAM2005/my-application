import { StyleSheet, Text, View } from "react-native";
import Footer from "../header-footer/Footer";
import Header from "../header-footer/Header";
import ListProducts from "../top-10/ListProducts";

export default function Top10Lists() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>TOP 10 Products For you!</Text>
      <ListProducts />
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "	#ffdfba",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    marginTop: 10,
    fontSize: 16,
  },
});
