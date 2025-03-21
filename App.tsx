import { StatusBar, useColorScheme } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Dumbbell, Utensils, LineChart, MessageSquare, Users } from "lucide-react-native"

import { ThemeProvider } from "./context/ThemeContext"
import { colors } from "./theme/colors"
import HomeScreen from "./screens/HomeScreen"
import WorkoutScreen from "./screens/WorkoutScreen"
import NutritionScreen from "./screens/NutritionScreen"
import TrackingScreen from "./screens/TrackingScreen"
import AIChatScreen from "./screens/AIChatScreen"
import SocialScreen from "./screens/SocialScreen"

const Tab = createBottomTabNavigator()

export default function App() {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar
            barStyle={isDark ? "light-content" : "dark-content"}
            backgroundColor={isDark ? colors.dark.background : colors.light.background}
          />
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: isDark ? colors.dark.text : colors.light.text,
              tabBarStyle: {
                backgroundColor: isDark ? colors.dark.card : colors.light.card,
                borderTopColor: isDark ? colors.dark.border : colors.light.border,
              },
              headerStyle: {
                backgroundColor: isDark ? colors.dark.card : colors.light.card,
              },
              headerTintColor: isDark ? colors.dark.text : colors.light.text,
              tabBarIcon: ({ color, size }) => {
                let icon

                if (route.name === "Home") {
                  icon = <Dumbbell size={size} color={color} />
                } else if (route.name === "Nutrition") {
                  icon = <Utensils size={size} color={color} />
                } else if (route.name === "Tracking") {
                  icon = <LineChart size={size} color={color} />
                } else if (route.name === "AI Chat") {
                  icon = <MessageSquare size={size} color={color} />
                } else if (route.name === "Social") {
                  icon = <Users size={size} color={color} />
                }

                return icon
              },
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Workout" component={WorkoutScreen} />
            <Tab.Screen name="Nutrition" component={NutritionScreen} />
            <Tab.Screen name="Tracking" component={TrackingScreen} />
            <Tab.Screen name="AI Chat" component={AIChatScreen} />
            <Tab.Screen name="Social" component={SocialScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

