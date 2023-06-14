import { View } from "react-native";
import Field from "../field/Field";
import { StyleSheet } from "react-native";

const Minefield = ({ board, onOpenField, onSelect: onSelectField }) => {
  const rows = board.map((row, r) => {
    const columns = row.map((field, c) => (
      <Field
        {...field}
        key={c}
        onOpen={() => onOpenField(r, c)}
        onSelect={() => onSelectField(r, c)}
      />
    ));
    return (
      <View style={{ flexDirection: "row" }} key={r}>
        {columns}
      </View>
    );
  });

  return <View style={styles.container}>{rows}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EEE",
    alignSelf: "center",
  },
});

export default Minefield;
