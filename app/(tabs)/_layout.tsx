import { Tabs } from "expo-router";
import { Platform } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0a7ea4",
        tabBarInactiveTintColor: "#555555",
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
          marginBottom: 1,
          marginTop: 2,
        },
        tabBarShowLabel: true,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: "#e0e0e0",
          backgroundColor: "#ffffff",
          paddingBottom: Platform.OS === "ios" ? 20 : 10,
          height: Platform.OS === "ios" ? 100 : 70,
          paddingTop: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 10,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="all-products"
        options={{
          title: "Products",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="square.stack.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categories",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="tag.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
