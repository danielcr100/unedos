import React from "react";
import { Provider } from "react-native-paper";
import App from "./src";
import { theme } from "./src/core/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AddUserScreen from "./src/screens/AddUserScreen";
import UserScreen from "./src/screens/UserScreen";
import UserDetailScreen from "./src/screens/UserDetailScreen";

const Main = () => (
  <Provider theme={theme}>
    <App />
  </Provider>
);
const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#621FF7",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{ title: "Añadir Materia" }}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{ title: "Users List" }}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{ title: "User Detail" }}
      />
    </Stack.Navigator>
  );
}
export default Main;
