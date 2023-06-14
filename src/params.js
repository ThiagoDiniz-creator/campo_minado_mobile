import { Dimensions } from "react-native";

const params = {
  blockSize: 30,
  borderSize: 5,
  fontSize: 15,
  headerRatio: 0.2, // Proportion of upper panel
  difficultLevel: 0.1,
  getColumnsAmount() {
    const window = Dimensions.get("window").width;
    const numColumns = Math.floor(window / this.blockSize);
    return numColumns;
  },
  getRownsAmount() {
    const height = Dimensions.get("window").height;
    const heightWithHeader = height - height * this.headerRatio;
    const numRows = Math.floor(heightWithHeader / this.blockSize);
    return numRows;
  },
};

export default params;
