import { Stack, Href, useRouter, useFocusEffect } from "expo-router";

import { useSession } from "../../../ctx";
import { Text, View } from "react-native";
import { useCallback } from "react";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function AppLayout() {
  const { session, isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Repush href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}

/** Redirects to the href as soon as the component is mounted. */
export function Repush<T>({ href }: { href: Href<T> }) {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      try {
        router.push(href);
      } catch (error) {
        console.error(error);
      }
    }, [])
  );

  return null;
}
