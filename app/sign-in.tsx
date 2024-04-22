import { router } from "expo-router";
import { Linking, Text, View } from "react-native";

import { useSession, useURL } from "../ctx";

export default function SignIn() {
  const { signIn } = useSession();
  const url = useURL();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.

          if (url) {
            Linking.openURL(url);
          } else {
            router.replace("/");
          }
        }}
      >
        Sign In {url ? `to ${url}` : ""}
      </Text>
    </View>
  );
}
