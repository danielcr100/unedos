import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import ReactDOM from "react-dom";

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  AuthLoadingScreen,
  Dashboard,
  AddUserScreen,
  UserScreen,
} from "./screens";

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    AuthLoadingScreen,
    AddUserScreen,
    UserScreen,
  },
  {
    initialRouteName: "AuthLoadingScreen",
    headerMode: "none",
  }
);

export default createAppContainer(Router);
