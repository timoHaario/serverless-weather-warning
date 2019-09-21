import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useNavigation } from "react-navigation-hooks";
const AddButton = props => {
    const { navigate } = useNavigation();

    return (
        <TouchableHighlight
            style={styles.circle}
            underlayColor="#ccc"
            onPress={() => navigate("CreateScreen")}
        >
            <Text style={styles.fontSize}>+</Text>
        </TouchableHighlight>
    );
};
export default AddButton;

const styles = StyleSheet.create({
    circle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: 66,
        height: 66,
        borderRadius: 33
    },
    fontSize: {
        fontSize: 28
    }
});
