import { Slot } from "expo-router";
import { SessionProvider, UrlProvider } from "../ctx";

export default function Root() {
  // Set up the auth context and render our layout inside of it.
  return (
    <UrlProvider>
      <SessionProvider>
        <Slot />
      </SessionProvider>
    </UrlProvider>
  );
}
