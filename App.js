import { TabNavigator } from "./src/navigation/Navigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
