import React, { Component } from "react";
import { View, Text, StyleSheet, Switch, Button, TouchableHighlight } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

const WeatherCardEdit = props => {
    return (
        <View style={styles.container}>
            <Title />
            <Weekdays />
            <TimePicker />
        </View>
    );
};

const Title = props => {
    return (
        <View style={styles.title}>
            <Text>Helsinki</Text>
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

interface MyProps {}
interface MyState {
    isDateTimePickerVisible: boolean;
}

export class TimePicker extends Component<MyProps, MyState> {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
        };
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    render() {
        return (
            <>
                <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    mode={"time"}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#bbbbbb",
        flexDirection: "column"
    },
    title: {
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
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
    }
});

export default WeatherCardEdit;

const mockData = {
    123: {
        weathercards: [
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
                    saturday: true,
                    sunday: true
                },
                startTime: "06:00",
                endtime: "19:00",
                trackers: {
                    rain: true
                }
            }
        ]
    }
};
