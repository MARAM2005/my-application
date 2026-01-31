import { StyleSheet, View } from "react-native";
import Top10Lists from "../components/top-10/Top10Lists";

export default function Index() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      marginTop: 10,
      fontSize: 16,
    },
  });
  return (
    <View style={styles.container}>
      <Top10Lists />
    </View>
  );
}
