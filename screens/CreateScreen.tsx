import React, { Component, useState } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { TitledInput } from "../components/common/TitledInput";
import WeatherCardEdit from "../components/weatherCard/WeatherCardEdit";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";
import { placesAPIKey } from "../config";

const GooglePlacesInput = setSelectedLocationDetails => {
    return (
        <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
                setSelectedLocationDetails(details);
            }}
            query={{
                key: placesAPIKey,
                language: "en",
                fields: "geometry"
            }}
            styles={{
                textInputContainer: {
                    backgroundColor: "rgba(0,0,0,0)",
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 38,
                    color: "#5d5d5d",
                    fontSize: 16
                },
                predefinedPlacesDescription: {
                    color: "#1faadb"
                },
                listView: {
                    backgroundColor: "#ffffff"
                }
            }}
        />
    );
};

const CreateScreen = () => {
    const params = useNavigation().state.params;
    const [selectedLocationDetails, setSelectedLocationDetails] = useState(
        params ? params.item.location : {}
    );
    return !selectedLocationDetails.name ? (
        <View style={styles.container}>
            <View style={styles.search}>{GooglePlacesInput(setSelectedLocationDetails)}</View>
        </View>
    ) : (
        <View style={styles.createContainer}>
            <WeatherCardEdit
                location={selectedLocationDetails}
                item={params ? params.item : null}
                key={params ? params.item.key : null}
            />
        </View>
    );
};
export default CreateScreen;

const styles = StyleSheet.create({
    createContainer: {
        flex: 1,
        backgroundColor: "#222222",
        justifyContent: "center"
    },
    container: {
        flex: 1,
        paddingLeft: "10%",
        paddingRight: "10%",
        backgroundColor: "#222222",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    screen: {
        flex: 1,
        backgroundColor: "#222222"
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
