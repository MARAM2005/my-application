import { StyleSheet, Text, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text>All rights reserved by SMU, 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    width: 500,
    height: 50,
  },
});
