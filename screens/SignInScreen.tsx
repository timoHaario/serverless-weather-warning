import React from "react";
import { View, StyleSheet } from "react-native";
import { LoginForm } from "../components/common/LoginForm";

export interface Props {
    navigation: any;
}

const SignInScreen = () => {
    return (
        <View style={styles.container}>
            <LoginForm />
        </View>
    );
};
export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222222",
        alignItems: "center",
        justifyContent: "center"
    }
});
