import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as Notification from "expo-notifications";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {
  useEffect(() => {
    const perm = async () => {
      await Notification.requestPermissionsAsync();
    };
    perm();
    const sub = Notification.addNotificationReceivedListener(notif =>
      console.log(notif)
    );
    return () => {
      sub.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Trigger Notification"
        onPress={() => {
          Notification.scheduleNotificationAsync({
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
