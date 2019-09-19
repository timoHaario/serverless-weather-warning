import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

const CreateScreen = () => {
    return (
        <View style={styles.container}>
            <Text>CreateScreen</Text>
        </View>
    );
};
export default CreateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
});
