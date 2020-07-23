import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "react-navigation-hooks";
import * as firebase from "firebase";

const WeatherCard = props => {
    const { isActive, location, weekdays, startTime, endTime, key } = props.locationItem;
    const { navigate } = useNavigation();

    const [toggleActive, setToggleActive] = useState(isActive);
    const toggleSwitch = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("users/" + userId + "/locations/" + key)
            .update({ isActive: !toggleActive })
            .then(function() {
                console.log("Activation toggled");
                setToggleActive(!toggleActive);
            })
            .catch(function(error) {
                console.log("Activation toggling failed with error: ", error);
            });
    };

    const WeekDayButton = props => {
        const { day } = props;
        const on = weekdays[day];
        return (
            <TouchableHighlight
                style={on ? styles.circleOn : styles.circleOff}
                underlayColor={"#ccc"}
            >
                <Text style={on ? styles.circleOnText : { color: "#aaaaaa", fontSize: 18 }}>
                    {day[0].toUpperCase()}
                </Text>
            </TouchableHighlight>
        );
    };

    const Weekdays = props => {
        return (
            <View style={styles.weekDays}>
                <WeekDayButton day={"monday"} />
                <WeekDayButton day={"tuesday"} />
                <WeekDayButton day={"wednesday"} />
                <WeekDayButton day={"thursday"} />
                <WeekDayButton day={"friday"} />
                <WeekDayButton day={"saturday"} />
                <WeekDayButton day={"sunday"} />
            </View>
        );
    };

    const Edit = () => {
        return (
            <View style={styles.editButton}>
                <Ionicons
                    name="md-create"
                    size={32}
                    color="#00BFFF"
                    onPress={() =>
                        navigate("CreateScreen", {
                            item: props.locationItem
                        })
                    }
                />
            </View>
        );
    };

    const TitleAndSwitch = () => {
        return (
            <View style={styles.title}>
                <Text style={styles.text}>{location.name}</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={toggleActive}
                    trackColor={{ true: "#5271A5", false: "#767577" }}
                    thumbColor={toggleActive ? "#81b0ff" : "#f4f3f4"}
                />
            </View>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <TitleAndSwitch />
                <Weekdays />
                <View style={styles.timesAndEdit}>
                    <Times startTime={startTime} endTime={endTime} />
                    <Edit />
                </View>
            </View>
            <View
                style={{
                    marginLeft: 5,
                    borderBottomColor: "#666666",
                    borderBottomWidth: 1
                }}
            />
        </>
    );
};

const Times = props => {
    return (
        <View style={styles.times}>
            <HoursMinutes time={convertToHoursMinutes(props.startTime)} />
            <Text style={styles.text}>- </Text>
            <HoursMinutes time={convertToHoursMinutes(props.endTime)} />
        </View>
    );
};

const convertToHoursMinutes = date => {
    const d = new Date(date);
    return `${("0" + d.getHours()).slice(-2)} : ${("0" + d.getMinutes()).slice(-2)} `;
};

const HoursMinutes = props => {
    return (
        <View style={styles.timeBox}>
            <Text style={styles.text}>{props.time}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#222222",
        flexDirection: "column"
    },
    title: {
        height: 80,
        paddingLeft: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#222222",
        color: "white"
    },
    weekDays: {
        paddingLeft: 5,
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#222222"
    },
    circleOn: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3B4C6B",
        width: 30,
        height: 30,
        borderRadius: 15
    },
    circleOnText: {
        fontSize: 18,
        color: "#81b0ff"
    },
    circleOff: {
        borderWidth: 1,
        borderColor: "#888888",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222222",
        color: "#888888",
        width: 30,
        height: 30,
        borderRadius: 15
    },
    times: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    timeBox: {
        height: 60,
        width: 100,
        backgroundColor: "#222222",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 28,
        color: "#eeeeee"
    },
    timesAndEdit: {
        flexDirection: "row"
    },
    editButton: {
        flex: 1,
        backgroundColor: "#222222",
        alignItems: "flex-end",
        justifyContent: "center"
    }
});

export default WeatherCard;
