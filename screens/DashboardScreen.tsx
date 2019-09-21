import React, { Component, useState, useContext, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    ActivityIndicator,
    StatusBar,
    Platform,
    View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";
import WeatherCard from "../components/weatherCard/weatherCard";
import AddButton from "../components/common/AddButton";

export interface Props {
    navigation: any;
}

const DashboardScreen = () => {
    const { navigate } = useNavigation();
    const [loading, setLoading] = useState(false);

    const renderContentOrSpinner = () => {
        if (loading) {
            return <ActivityIndicator size="large" />;
        }

        return (
            <>
                <WeatherCard />
                <View
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 1
                    }}
                />
                <WeatherCard />
                <View
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: 1
                    }}
                />
                <WeatherCard />
            </>
        );
    };

    return (
        <>
            <View style={styles.screen}>
                <View style={styles.settingsButton}>
                    <Ionicons
                        name="md-settings"
                        size={32}
                        color="#00BFFF"
                        onPress={() => navigate("SettingsScreen")}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.container}>
                    <WeatherCard weatherCard={mockData.asd.weatherCards[0]} />
                    <WeatherCard weatherCard={mockData.asd.weatherCards[0]} />
                    <WeatherCard weatherCard={mockData.asd.weatherCards[0]} />
                    <WeatherCard weatherCard={mockData.asd.weatherCards[0]} />
                </ScrollView>
            </View>
            <View style={styles.addButton}>
                <AddButton />
            </View>
        </>
    );
};
export default DashboardScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight
    },
    container: {
        flexGrow: 1,
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-start",
        color: "black",
        marginLeft: 15,
        marginRight: 15
    },
    logout: {
        alignItems: "flex-end"
    },
    settingsButton: {
        alignItems: "flex-end",
        margin: 15
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 20,
        left: "42%"
    }
});

const mockData = {
    asd: {
        weatherCards: [
            {
                id: 123,
                name: "Helsinki",
                lat: 100,
                lon: 100,
                weekdays: {
                    monady: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true,
                    saturday: false,
                    sunday: false
                },
                startTime: "06:00",
                endTime: "19:00",
                trackers: {
                    rain: true
                }
            }
        ]
    }
};
