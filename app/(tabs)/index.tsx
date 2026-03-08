import { StyleSheet, View } from "react-native";
import Top10Lists from "../../components/top-10/Top10Lists";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Top10Lists />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
