import React, { Component, useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Text, ActivityIndicator, Platform, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "react-navigation-hooks";
import { withNavigationFocus } from "react-navigation";
import WeatherCard from "../components/weatherCard/weatherCard";
import AddButton from "../components/common/AddButton";
import * as firebase from "firebase";

export interface Props {
    navigation: any;
}

const DashboardScreen = props => {
    const { navigate } = useNavigation();
    const isFocused = props.isFocused;

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);
    const userId = firebase.auth().currentUser.uid;

    const usersRef = firebase.database().ref("users");
    const locationsRef = usersRef.child(userId + "/locations");
    const query = locationsRef.orderByKey();
    useEffect(() => loadLocations(), [isFocused]);
    const loadLocations = () => {
        const locations = [];
        query.once("value").then(function(snapshot) {
            snapshot.forEach(function(childSnapshot) {
                // key will be "ada" the first time and "alan" the second time
                const key = childSnapshot.key;
                // childData will be the actual contents of the child
                const childData = childSnapshot.val();
                locations.push({ ...childData, key: key });
            });
            setItems(locations);
            setLoading(false);
        });
    };

    const renderContentOrSpinner = () => {
        if (loading) {
            return (
                <View style={styles.loadingScreen}>
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <>
                <View style={styles.screen}>
                    <StatusBar style="light" />
                    <View style={styles.settingsButton}>
                        <Ionicons
                            name="md-settings"
                            size={32}
                            color="#eeeeee"
                            onPress={() => navigate("SettingsScreen")}
                        />
                    </View>
                    <ScrollView contentContainerStyle={styles.container}>
                        {items.map(item => {
                            return <WeatherCard locationItem={item} key={item.key} />;
                        })}
                    </ScrollView>
                </View>
                <View style={styles.addButton}>
                    <AddButton />
                </View>
            </>
        );
    };

    return renderContentOrSpinner();
};

//using HOC withNavigationFocus to fire the components useEffect after navigation
export default withNavigationFocus(DashboardScreen);

const styles = StyleSheet.create({
    loadingScreen: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#222222"
    },
    screen: {
        flex: 1,
        backgroundColor: "#222222"
    },
    container: {
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        color: "black",
        backgroundColor: "#222222",
        marginLeft: 15,
        marginRight: 15
    },
    settingsButton: {
        alignItems: "flex-end",
        margin: 15,
        marginTop: 30
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        left: "42%"
    }
});
