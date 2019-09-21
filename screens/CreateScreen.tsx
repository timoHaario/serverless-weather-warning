import React, { Component, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TitledInput } from "../components/common/TitledInput";
import { Ionicons } from "@expo/vector-icons";

const searchLocations = async location => {
    console.log(location);

    return [];
};

const CreateScreen = () => {
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState({});
    const [location, setLocation] = useState("");

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TitledInput
                    label="Location"
                    placeholder="Location"
                    value={location}
                    onChangeText={location => setLocation(location)}
                />
                <View style={styles.searchButton}>
                    <Ionicons
                        name="md-search"
                        size={32}
                        color="#00BFFF"
                        onPress={() =>
                            searchLocations(location).then(result => setLocations(result))
                        }
                    />
                </View>
            </View>
        </View>
    );
};
export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: "10%",
        marginRight: "10%",
        backgroundColor: "gray",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    searchButton: {
        width: "20%",
        backgroundColor: "yellow",
        alignItems: "center",
        justifyContent: "center"
    },
    search: {
        flexDirection: "row"
    }
});
