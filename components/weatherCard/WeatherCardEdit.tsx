import React, { Component, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Switch,
    Button,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "react-navigation-hooks";

import * as firebase from "firebase";

const initializedWeekdays = {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true
};

const WeatherCardEdit = props => {
    const { location, item } = props;
    const [startTime, setStartTime] = useState(item ? new Date(item.startTime) : new Date());
    const [endTime, setEndTime] = useState(item ? new Date(item.endTime) : new Date());
    const [isActive, setIsActive] = useState(item ? item.isActive : true);
    const [weekdays, setWeekdays] = useState(item ? item.weekdays : initializedWeekdays);

    const [choosingStartTime, setChoosingStartTime] = useState(false);
    const [choosingEndTime, setChoosingEndTime] = useState(false);
    const [show, setShow] = useState(false);
    const { navigate } = useNavigation();

    const storeLocation = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("users/" + userId + "/locations")
            .push({
                location: location,
                startTime: startTime.getTime(),
                endTime: endTime.getTime(),
                weekdays: weekdays,
                isActive: true
            })
            .then(function() {
                console.log("Location item created");
                navigate("DashboardScreen");
            })
            .catch(function(error) {
                console.log("Location item creation failed");
                navigate("DashboardScreen");
            });
    };

    const editLocation = () => {
        const userId = firebase.auth().currentUser.uid;
        firebase
            .database()
            .ref("users/" + userId + "/locations/" + item.key)
            .set({
                location: location,
                startTime: startTime.getTime(),
                endTime: endTime.getTime(),
                weekdays: weekdays,
                isActive: isActive
            })
            .then(function() {
                console.log("Location item edited");
                navigate("DashboardScreen");
            })
            .catch(function(error) {
                console.log("Location item creation failed");
                navigate("DashboardScreen");
            });
    };

    const onTimePickerChange = (event, selectedDate) => {
        const currentDate = selectedDate || (choosingStartTime ? startTime : endTime);
        setShow(Platform.OS === "ios");
        choosingStartTime ? setStartTime(currentDate) : setEndTime(currentDate);
        setChoosingStartTime(false);
        setChoosingEndTime(false);
    };

    const showStartTimepicker = () => {
        setChoosingStartTime(true);
        setShow(true);
    };

    const showEndTimepicker = () => {
        setChoosingEndTime(true);
        setShow(true);
    };

    const hoursMinutes = date => {
        return `${("0" + date.getHours()).slice(-2)} : ${("0" + date.getMinutes()).slice(-2)} `;
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

    const WeekDayButton = props => {
        const { day } = props;
        const on = weekdays[day];
        return (
            <TouchableHighlight
                style={on ? styles.circleOn : styles.circleOff}
                underlayColor={"#ccc"}
                onPress={() => {
                    setWeekdays({ ...weekdays, [day]: !on });
                }}
            >
                <Text style={on ? styles.circleOnText : { color: "#aaaaaa", fontSize: 18 }}>
                    {day[0].toUpperCase()}
                </Text>
            </TouchableHighlight>
        );
    };

    const EditableTimes = () => {
        return (
            <View style={styles.times}>
                <TouchableOpacity onPress={showStartTimepicker}>
                    <HoursMinutes time={convertToHoursMinutes(startTime)} />
                </TouchableOpacity>
                <Text style={styles.text}>- </Text>
                <TouchableOpacity onPress={showEndTimepicker}>
                    <HoursMinutes time={convertToHoursMinutes(endTime)} />
                </TouchableOpacity>
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

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Title name={location.name} />
                <Weekdays />
                <View>
                    <EditableTimes />
                    <View>
                        <Button
                            onPress={() => (item ? editLocation() : storeLocation())}
                            title="Save"
                        />
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={choosingStartTime ? startTime : endTime}
                            mode={"time"}
                            is24Hour={true}
                            display="default"
                            onChange={onTimePickerChange}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const Title = props => {
    const { name } = props;
    return (
        <View style={styles.title}>
            <Text style={styles.text}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#222222",
        flexDirection: "column"
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

export default WeatherCardEdit;
