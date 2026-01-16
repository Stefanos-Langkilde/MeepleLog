import AsyncStorage from "@react-native-async-storage/async-storage";
import { SplashScreen, useRouter } from "expo-router";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isReady: boolean;
  logIn: () => void;
  logOut: () => void;
  userId: number | null;
};

const authStorageKey = "isLoggedIn";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isReady: false,
  logIn: () => {},
  logOut: () => {},
  userId: 1,
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    const [userId, setUserId] = useState<number | null>(null);

    const storeAuthState = async (newState: {isLoggedIn: boolean}) => {
        try {
            const JsonValue = JSON.stringify(newState);
            await AsyncStorage.setItem(authStorageKey, JsonValue);
        } catch (error) {
            console.error("Failed to store auth state", error);
        }
    };

    //fetch user information from api
    // const fetchUserInfo = async () => {
    //     try {
    //         const response = await fetch("https://example.com/api/userinfo", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();
    //         const fetchedUserId = data.userId;
    //         setUserId(fetchedUserId);
    //         await storeUserInfo(fetchedUserId);
    //     } catch (error) {
    //         console.error("Failed to fetch user info", error);
    //     }
    // };

    // //store user information upon login
    // const storeUserInfo = async (newUserId: number) => {
    //     try {
    //         await AsyncStorage.setItem("userId", JSON.stringify(newUserId));
    //     } catch (error) {
    //         console.error("Failed to store user info", error);
    //     }
    // };

    const logIn = () => {   
        setIsLoggedIn(true);
        storeAuthState({ isLoggedIn: true });
        router.replace("/");
    };
    const logOut = () => {
        setIsLoggedIn(false);
        storeAuthState({ isLoggedIn: false });
        router.replace("/login");
    };

    useEffect(() => {
        const getAuthFromStorage = async () => {
            try {
                const value = await AsyncStorage.getItem(authStorageKey);
                if (value !== null) {
                    const auth = JSON.parse(value);
                    setIsLoggedIn(auth.isLoggedIn);
                }
            } catch (error) {
                console.error("Failed to retrieve auth state", error);
            }
            setIsReady(true);
        };

        getAuthFromStorage();
    }, []);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isReady,
        logIn,
        logOut,
        userId
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};