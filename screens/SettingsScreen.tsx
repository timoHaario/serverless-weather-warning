import React from "react";
import LogoutButton from "../components/common/LogoutButton";
import { StatusBar } from "expo-status-bar";

const SettingsScreen = () => {
    return (
        <>
            <StatusBar style="light" />
            <LogoutButton />
        </>
    );
};

export default SettingsScreen;
