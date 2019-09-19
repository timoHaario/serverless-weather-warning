import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import firebase from "firebase";
import { useNavigation } from "react-navigation-hooks";

export interface Props {
    navigation: any;
}

const LoadingScreen = () => {
    useEffect(() => checkIfLoggedIn(), []);
    const { navigate } = useNavigation();

    const checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                navigate("DashboardScreen");
            } else {
                navigate("DashboardScreen");
            }
        });
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};
export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
