import React, { Component, useState } from "react";
import { View, Button, Text, ActivityIndicator, StyleSheet } from "react-native";
import { TitledInput } from "./TitledInput";
import firebase from "firebase";
import { useNavigation } from "react-navigation-hooks";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { navigate } = useNavigation();

    //TODO divide
    const onLoginPress = () => {
        setLoading(true);
        setError("");
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(async () => {
                const userId = firebase.auth().currentUser.uid;
                console.log("userId: ", userId);
                const token = await registerForPushNotificationsAsync();

                firebase
                    .database()
                    .ref("users/" + userId)
                    .update({
                        deviceToken: token
                    })
                    .then(function() {
                        console.log("Device token created");
                        navigate("DashboardScreen");
                    })
                    .catch(function(error) {
                        console.log("Device token creation failed");
                        navigate("DashboardScreen");
                    });

                navigate("DashboardScreen");
            })
            .catch(() => {
                // Login was not successful, let's create a new account
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(async () => {
                        const userId = firebase.auth().currentUser.uid;
                        console.log("userId: ", userId);
                        const token = await registerForPushNotificationsAsync();

                        firebase
                            .database()
                            .ref("users/" + userId)
                            .update({
                                deviceToken: token
                            })
                            .then(function() {
                                console.log("Device token created");
                                navigate("DashboardScreen");
                            })
                            .catch(function(error) {
                                console.log("Device token creation failed");
                                navigate("DashboardScreen");
                            });

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

//TODO move
const registerForPushNotificationsAsync = async () => {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C"
        });
    }

    return token;
};

const styles = StyleSheet.create({
    errorTextStyle: {
        color: "#E64A19",
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10
    }
});
