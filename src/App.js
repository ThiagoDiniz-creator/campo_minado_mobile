import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Minefield from "./components/minefield/Minefield";
import params from "./params";
import {
  cloneBoard,
  createMinedBoard,
  flagsUsed,
  hasExploded,
  invertFlag,
  openField,
  showMines,
  wonGame,
} from "./gameLogic";
import { Alert, StyleSheet, View } from "react-native";
import { useState } from "react";
import Header from "./components/header/Header";
import LevelSelection from "./screens/levelSelection/LevelSelection";

export default function App() {
  const minesAmount = () => {
    const rows = params.getRownsAmount();
    const columns = params.getColumnsAmount();
    return Math.ceil(columns * rows * params.difficultLevel);
  };

  const createGameState = () => {
    const rows = params.getRownsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMinedBoard(rows, columns, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false,
    };
  };

  const onOpenField = (row, column) => {
    if (gameState.lost || gameState.won) return;

    const board = cloneBoard(gameState.board);
    openField(board, row, column);
    const lost = hasExploded(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Que pena", "Você perdeu :(");
    }
    if (won) {
      Alert.alert("Parabéns", "Você ganhou");
    }

    setGameState({ ...gameState, board });
  };

  const onLongPress = (row, column) => {
    if (gameState.lost || gameState.won) return;

    const board = cloneBoard(gameState.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    setGameState({ ...gameState, board, won });
  };

  const onLevelSelected = level => {
    params.difficultLevel = level;
    createGameState();
  };

  const [gameState, setGameState] = useState(createGameState());

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <LevelSelection
          onCancel={() =>
            setGameState({ ...gameState, showLevelSelection: false })
          }
          onLevelSelected={onLevelSelected}
          isVisible={gameState.showLevelSelection}
        />
        <Header
          flagsLeft={minesAmount() - flagsUsed(gameState.board)}
          onNewGame={() => setGameState(createGameState())}
          onFlagPress={() =>
            setGameState({ ...gameState, showLevelSelection: true })
          }
        />
        <View style={styles.board}>
          <Minefield
            board={gameState.board}
            onOpenField={onOpenField}
            onSelect={onLongPress}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    backgroundColor: "#AAA",
  },
});
