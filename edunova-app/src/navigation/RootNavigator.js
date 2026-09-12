import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RoleSelectScreen from "../screens/RoleSelectScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import HomeScreen from "../screens/parent/HomeScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ComposeMessageScreen from "../screens/ComposeMessageScreen";

const Stack = createNativeStackNavigator();

// Flow: RoleSelect -> SignIn -> (SignUp, if no account yet, then back to
// SignIn) -> Home (parents) or Messages (teachers/functionaries).
export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="RoleSelect">
      <Stack.Screen name="RoleSelect" component={RoleSelectScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="Compose" component={ComposeMessageScreen} />
    </Stack.Navigator>
  );
}
