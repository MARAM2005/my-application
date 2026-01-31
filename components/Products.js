import { Image, StyleSheet, Text, View } from "react-native";

export default function Product({ title, price, category, imageUrl, rating }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      <View style={styles.content}>
        <Image source={{ uri: imageUrl }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.label}>
            Price: <Text style={styles.value}>${price}</Text>
          </Text>
          <Text style={styles.label}>
            Category: <Text style={styles.value}>{category}</Text>
          </Text>
          <Text style={styles.label}>
            Rating: <Text style={styles.value}>{rating}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginVertical: 10,
    marginHorizontal: 12,
    shadowRadius: 4,
  },
  title: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    flexDirection: "row",
  },
  image: {
    width: 90,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
  },
  info: {
    justifyContent: "center",
    flexShrink: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 6,
  },
  value: {
    fontWeight: "500",
  },
});
