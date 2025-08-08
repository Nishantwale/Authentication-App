import { Stack } from "expo-router";
import { ThemeProvider } from "./components/ThemeContext.jsx";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack initialRouteName="screens/LoginScreen">
        <Stack.Screen name="screens/LoginScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/SignupScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/WelcomeScreen" options={{ headerShown: false }} />
        <Stack.Screen name="screens/ForgotPasswordScreen" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
