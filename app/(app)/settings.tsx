import { Text, View } from "react-native";

export default function Settings() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
        }}
      >
        Settings
      </Text>
    </View>
  );
}
