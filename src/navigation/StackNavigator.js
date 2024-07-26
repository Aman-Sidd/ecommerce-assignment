import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsScreen from "../screens/ProductsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/CartScreen";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Products"
          component={ProductsScreen}
          options={{
            tabBarLabel: "Home",
            tabBarLevelStyle: { color: "#008E97" },
            // headerTitleAlign: "center",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="black" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarLabel: "Cart",
            tabBarLevelStyle: { color: "#008E97" },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="shopping-cart" size={24} color="#008E97" />
              ) : (
                <Feather name="shopping-cart" size={24} color="black" />
              ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
