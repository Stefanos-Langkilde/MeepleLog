import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: "#1119b3ff",
            tabBarInactiveTintColor: "#1119b3ff",
            headerStyle: { backgroundColor: "#1119b3ff" },
            headerTintColor: "#ffffff",
            headerShadowVisible: false,
            tabBarStyle: { backgroundColor: "#D3D3D3" },
        }}
    >
      <Tabs.Screen 
        name="index"
        options={{ 
            headerTitle: "Games",
            tabBarIcon: ({focused, color}) => <Ionicons name={focused ? "library" : "library-outline"} size={24} color={color} />,
            }} />
      <Tabs.Screen 
        name="profile" 
        options={{ 
            headerTitle: "Profile", 
            tabBarIcon: ({focused, color}) => <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />,
            }} />
    </Tabs>
  );
}