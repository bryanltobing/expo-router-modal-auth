import React from "react";
import { useStorageState } from "./useStorageState";
import { useURL as useURLHook } from "expo-linking";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Perform sign-in logic here
          setSession("xxx");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

const UrlContext = React.createContext<string | null>(null);

export const useURL = () => {
  return React.useContext(UrlContext);
};
export const UrlProvider = ({ children }: React.PropsWithChildren) => {
  const url = useURLHook();

  return <UrlContext.Provider value={url}>{children}</UrlContext.Provider>;
};
