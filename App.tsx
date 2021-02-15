import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as Notifications from "expo-notifications";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Trigger Notification"
        onPress={() => {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "My first notification",
              body: "This is the first local notification we are sending"
            },
            trigger: {
              seconds: 10
            }
          });
        }}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
