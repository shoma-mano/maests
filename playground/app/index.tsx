import { useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const [count, setCount] = useState(0);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text data-testid="test">Edit app/index.tsx to edit this screen.</Text>
      <Text>{count}</Text>
      <Text onPress={() => setCount(count + 1)}>Increment</Text>
    </View>
  );
}
