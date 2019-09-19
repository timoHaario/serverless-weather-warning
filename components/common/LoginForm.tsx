import React, { Component, useState } from "react";
import { View, Button, Text, ActivityIndicator, StyleSheet } from "react-native";
import { TitledInput } from "./TitledInput";
import firebase from "firebase";
import { useNavigation } from "react-navigation-hooks";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { navigate } = useNavigation();

    const onLoginPress = () => {
        setLoading(true);
        setError("");
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                navigate("DashboardScreen");
            })
            .catch(() => {
                // Login was not successful, let's create a new account
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        navigate("DashboardScreen");
                    })
                    .catch(error => {
                        console.log(error);
                        setError(error.message);
                        setLoading(false);
                    });
            });
    };

    const renderButtonOrSpinner = () => {
        if (loading) {
            return <ActivityIndicator size="small" />;
        }

        return <Button onPress={() => onLoginPress()} title="Sign in or create account" />;
    };

    return (
        <View>
            <TitledInput
                label="Email Address"
                placeholder="you@domain.com"
                value={email}
                onChangeText={email => setEmail(email)}
            />
            <TitledInput
                label="Password"
                placeholder="*******"
                secureTextEntry
                value={password}
                onChangeText={password => setPassword(password)}
            />
            <Text style={styles.errorTextStyle}>{error}</Text>
            {renderButtonOrSpinner()}
        </View>
    );
};

const styles = StyleSheet.create({
    errorTextStyle: {
        color: "#E64A19",
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10
    }
});
