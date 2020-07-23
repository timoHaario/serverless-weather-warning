import React from "react";
import firebase from "firebase";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SignInScreen from "./screens/SignInScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CreateScreen from "./screens/CreateScreen";
import firebaseConfig from "./config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default function App() {
    return <AppNavigator />;
}

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen,
    DashboardScreen,
    SignInScreen,
    SettingsScreen,
    CreateScreen
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
