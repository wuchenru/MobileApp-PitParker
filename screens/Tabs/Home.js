import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Map, PitButton } from "../../components";
import * as Location from "expo-location";
import { COLORS, DEFAULT_VARS } from "../../common";
import { mapAPI, pitAPI } from "../../api";

export default function Home() {
  const [activeTab, setActiveTab] = useState("nearby");
  const [pits, setPits] = useState([]);
  const [userLocation, setUserLocation] = useState(DEFAULT_VARS.coords);

  const locateUser = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
      enableHighAccuracy: true,
    });
    const { longitude, latitude } = location.coords;
    setUserLocation({ longitude, latitude });
  };

  const TabSet = () => (
    <View style={styles.buttons}>
      <PitButton
        style={[styles.button, styles.leftButton]}
        onPress={() => setActiveTab("nearby")}
        text="Nearby Pits"
        type={activeTab == "nearby" ? "primary" : "normal"}
      />
      <PitButton
        style={[styles.button, styles.rightButton]}
        onPress={() => setActiveTab("my")}
        text="My Pits"
        type={activeTab == "my" ? "primary" : "normal"}
      />
    </View>
  );

  const mapPits = (pit) => {
    const { place_id, name, geometry, vicinity } = pit;
    const latitude = geometry.location.lat;
    const longitude = geometry.location.lng;
    const compound_code = pit?.plus_code?.compound_code || "";
    return { place_id, name, latitude, longitude, vicinity, compound_code };
  };

  const setupNearbyPits = async () => {
    const parking = await mapAPI.getNearbyParking(userLocation);
    const pitsMapped = parking.results.map(mapPits);
    setPits(pitsMapped);
    pitAPI.batchAddPits(pitsMapped);
  };

  useEffect(() => {
    locateUser();
  }, []);

  useEffect(() => {
    setupNearbyPits();
  }, [userLocation]);

  useEffect(() => {
    if (activeTab == "nearby") {
      setupNearbyPits();
    } else {
      setPits([]);
    }
    return () => setPits([]);
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <TabSet />
      <Map userLocation={userLocation} pits={pits} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    position: "absolute",
    zIndex: 2000,
    top: 60,
    flexDirection: "row",
    backgroundColor: COLORS.BASE[0],
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: COLORS.TINT[100],
    color: COLORS.BASE[0],
  },
  leftButton: {
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    marginRight: -0.5,
  },
  rightButton: {
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    marginLeft: -0.5,
  },
  button: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    width: 150,
  },
});
