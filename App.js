import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigator, TabNavigator } from "./src/navigation/StackNavigator";
import { Gesture, GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import MyStore from "./src/redux/store";

export default function App() {
  return (
    
    <GestureHandlerRootView>
      <Provider store={MyStore}>
        <TabNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
}
