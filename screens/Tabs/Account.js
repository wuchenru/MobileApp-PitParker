import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../api";
import { BottomContainer, PitButton } from "../../components";
import { COLORS, TEXT_STYLES } from "../../common";
import { getAuth } from "firebase/auth";

export default function ProfileSettings({ navigation }) {
  const auth = getAuth();
  const user = auth.currentUser;
  const email = user.email;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Account</Text>
      <View style={styles.contentContainer}>
        <View style={{ paddingHorizontal: 24 }}>
          <View style={styles.tabContainer}>
            <Text style={styles.title}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
            ></TextInput>
          </View>
          <View>
            <View style={styles.tabContainer}>
              <Text style={styles.title}>Current Password</Text>
              <TextInput
                style={styles.input}
                placeholder={"abc@aaa.com"}
              ></TextInput>
            </View>
          </View>
          <View>
            <View style={styles.tabContainer}>
              <Text style={styles.title}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder={"abc@aaa.com"}
              ></TextInput>
            </View>
            <View style={styles.tabContainer}>
              <Text style={styles.title}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder={"abc@aaa.com"}
              ></TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <PitButton
                text="Change my password"
                type="primary"
                style={styles.pitButton}
                textStyle={styles.saveButton}
              />
            </View>
          </View>
        </View>
      </View>
      <BottomContainer style={styles.bottom}>
        <PitButton text="Sign Out" onPress={() => signOut(auth)} />
      </BottomContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BASE[0],
  },
  header: {
    ...TEXT_STYLES.heading.h2,
    marginLeft: "4%",
    marginBottom: "3%",
  },
  input: {
    height: 40,
    padding: 10,
    backgroundColor: COLORS.BASE[20],
    borderRadius: 4,
  },
  tabContainer: {
    paddingBottom: 30,
  },
  title: {
    ...TEXT_STYLES.title[500],
    paddingBottom: 2,
  },

  tabs: {
    borderColor: COLORS.BASE[40],
    borderWidth: 1,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    height: 70,
    lineHeight: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    marginTop: 20,
  },
  saveButton: {
    fontSize: 11,
  },
  pitButton: {
    width: 150,
    height: 40,
  },
  buttonContainer: {
    marginLeft: -10,
    marginTop: -20,
  },
  bottom: {
    borderTopColor: COLORS.BASE[40],
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    width: "100%",
    bottom: 30,
  },
});
