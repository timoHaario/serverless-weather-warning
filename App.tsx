import React from "react";
import { YellowBox } from "react-native";
import firebase from "firebase";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SignInScreen from "./screens/SignInScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CreateScreen from "./screens/CreateScreen";
import firebaseConfig from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Ignore annoying yellowbox warnings regarding the timer
YellowBox.ignoreWarnings(["Setting a timer", "Remote debugger"]);

export default function App() {
    return <AppNavigator />;
}

const AppStack = createStackNavigator(
    {
        DashboardScreen,
        SettingsScreen,
        CreateScreen
    },
    { headerMode: "none" }
);
const AuthStack = createStackNavigator({ SignInScreen }, { headerMode: "none" });

const AppSwitchNavigator = createSwitchNavigator(
    {
        LoadingScreen,
        App: AppStack,
        Auth: AuthStack
    },
    {
        initialRouteName: "LoadingScreen"
    }
);

const AppNavigator = createAppContainer(AppSwitchNavigator);
