import React from "react";
import { View, Text, StyleSheet, Switch, TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/*
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
                endtime: "19:00",
                trackers: {
                    rain: true
                }
            }
*/
const WeatherCard = props => {
    const { name, weekdays, startTime, endTime } = props.weatherCard;

    return (
        <View style={styles.container}>
            <Title name={name} />
            <Weekdays weekdays={weekdays} />
            <View style={styles.timesAndEdit}>
                <Times startTime={startTime} endTime={endTime} />
                <Edit />
            </View>
        </View>
    );
};

const Title = props => {
    return (
        <View style={styles.title}>
            <Text style={styles.fontSize}>{props.name}</Text>
            <Switch />
        </View>
    );
};

const Weekdays = props => {
    return (
        <View style={styles.weekDays}>
            <WeekDayButton day={"M"} />
            <WeekDayButton day={"T"} />
            <WeekDayButton day={"W"} />
            <WeekDayButton day={"T"} />
            <WeekDayButton day={"F"} />
            <WeekDayButton day={"S"} />
            <WeekDayButton day={"S"} />
        </View>
    );
};

const WeekDayButton = props => {
    const { day } = props;

    return (
        <TouchableHighlight
            style={styles.circle}
            underlayColor="#ccc"
            onPress={() => alert("Yaay!")}
        >
            <Text>{day}</Text>
        </TouchableHighlight>
    );
};

const Times = props => {
    return (
        <View style={styles.times}>
            <HoursMinutes time={props.startTime} />
            <Text style={styles.fontSize}> - </Text>
            <HoursMinutes time={props.endTime} />
        </View>
    );
};

const HoursMinutes = props => {
    return (
        <View style={styles.timeBox}>
            <Text style={styles.fontSize}>{props.time}</Text>
        </View>
    );
};

const Edit = props => {
    return (
        <View style={styles.editButton}>
            <Ionicons name="md-create" size={32} color="#00BFFF" onPress={() => {}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#bbbbbb",
        flexDirection: "column"
    },
    title: {
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "red"
    },
    weekDays: {
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "red"
    },
    circle: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
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
        backgroundColor: "green",
        justifyContent: "center",
        alignItems: "center"
    },
    fontSize: {
        fontSize: 28
    },
    timesAndEdit: {
        flexDirection: "row"
    },
    editButton: {
        flex: 1,
        backgroundColor: "yellow",
        alignItems: "flex-end",
        justifyContent: "center"
    }
});

export default WeatherCard;
