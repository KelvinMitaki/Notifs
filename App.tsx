import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import * as Notification from "expo-notifications";
import axios from "axios";

Notification.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const perm = async () => {
      const res = await Notification.requestPermissionsAsync();

      if (res.granted) {
        const token = await Notification.getExpoPushTokenAsync();
        setToken(token.data);
      } else {
        Alert.alert(
          "Permission denied",
          "you need to allow permission for this to work"
        );
      }
    };
    perm();
    const backgroundSub = Notification.addNotificationResponseReceivedListener(
      notif => console.log(notif)
    );
    const foregroundSub = Notification.addNotificationReceivedListener(notif =>
      console.log(notif)
    );
    return () => {
      foregroundSub.remove();
      backgroundSub.remove();
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
      <Button
        title="From Expo Server"
        onPress={async () => {
          await axios.post(`https://exp.host/--/api/v2/push/send`, {
            to: token,
            data: {
              extraData: "Some Data"
            },
            title: "Sent via the app",
            body: "this is a push notification sent via the app"
          });
        }}
        buttonStyle={{ marginTop: 20 }}
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
