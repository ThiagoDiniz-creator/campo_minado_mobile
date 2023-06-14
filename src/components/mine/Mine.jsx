import { StyleSheet, View } from "react-native";

const Mine = () => {
  return (
    <View style={styles.container}>
      <View style={styles.coreMine} />
      <View style={styles.line} />
      <View style={[styles.line, { transform: [{ rotate: "45deg" }] }]} />
      <View style={[styles.line, { transform: [{ rotate: "90deg" }] }]} />
      <View style={[styles.line, { transform: [{ rotate: "135deg" }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "relative",
  },
  coreMine: {
    height: 14,
    width: 14,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    position: "absolute",
    top: "40%",
    height: 3,
    width: 20,
    borderRadius: 3,
    backgroundColor: "#000",
  },
});

export default Mine;
