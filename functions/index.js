"use strict";

const functions = require("firebase-functions");
const fetch = require("node-fetch");

const admin = require("firebase-admin");
admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.region("europe-west1").https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const darkSkyApiKey = "";
    const userId = "";

    return admin
        .database()
        .ref("/users/" + userId + "/locations/")
        .once("value")
        .then(snap => {
            let locations = [];
            snap.forEach(child_snap => {
                const item = child_snap.val();
                item.isActive && locations.push(item); // build locations
            });
            return locations;
        })
        .then(locations => {
            let string = "";
            locations.forEach(child => {
                const lat = child.location.geometry.location.lat;
                const lng = child.location.geometry.location.lng;
                const startTime = new Date(child.startTime);
                const endTime = new Date(child.endTime);

                const start = new Date();
                const end = new Date();
                start.setMinutes(startTime.getMinutes());
                start.setHours(startTime.getHours());
                end.setMinutes(endTime.getMinutes());
                end.setHours(endTime.getHours());

                console.log("start: ", start);
                console.log("end: ", end);

                const darkSkyResponse = fetch(
                    "https://api.darksky.net/forecast/" + darkSkyApiKey + "/" + lat + "," + lng
                )
                    .then(res => res.json())
                    .then(json => {
                        let rainyHours = [];
                        json.hourly.data.forEach(hour => {
                            const ms = hour.time * 1000;
                            const time = new Date(ms);
                            const timeBetweenStartAndEnd = true; //start <= time && time <= end;
                            if (timeBetweenStartAndEnd && hour.icon === "rain") {
                                rainyHours.push(hour);
                            }
                        });
                        //rainyHours now contains all the hours that have rain inside the chosen time interval in the location
                        let rainIntervals = [];
                        let counting = false;
                        rainyHours.forEach(hour => {
                            if !counting {
                            }
                        });
                    });
            });
            response.send(string);
        })
        .catch(console.log);
});
