import React, { useState } from "react";
import { View, Text, StyleSheet, Button, ActivityIndicator } from "react-native";
import firebase from "firebase";
import { useNavigation } from "react-navigation-hooks";

const LogoutButton = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);

    const onLogoutPress = async () => {
        setLoading(true);
        firebase
            .auth()
            .signOut()
            .then(() => {
                setLoading(false);
                navigate("SignInScreen");
            })
            .catch(error => {
                console.log(error);
            });
    };

    const renderButtonOrSpinner = () => {
        if (loading) {
            return <ActivityIndicator size="small" />;
        }

        return <Button onPress={() => onLogoutPress()} title="Log out" />;
    };

    return renderButtonOrSpinner();
};
export default LogoutButton;

const styles = StyleSheet.create({
    container: {
        height: 200,
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
