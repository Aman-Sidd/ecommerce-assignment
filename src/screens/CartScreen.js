import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);
  console.log("CART:", cart);
  const total = cart
    ?.map((item) => item.price * item.quantity)
    .reduce((acc, curr) => acc + curr, 0)
    .toFixed(2);

  const dispatch = useDispatch();

  const incrementQuant = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decrementQuant = (item) => {
    dispatch(decrementQuantity(item));
  };
  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const renderItem = ({ item, index }) => {
    console.log("ITEM:", item);
    return (
      <View
        style={{
          backgroundColor: "white",
          marginVertical: 10,
          borderBottomColor: "#F0F0F0",
          borderWidth: 2,
          borderLeftWidth: 0,
          borderTopWidth: 0,
          borderRightWidth: 0,
        }}
        key={index}
      >
        <Pressable
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              style={{ width: 140, height: 140, resizeMode: "contain" }}
              source={{ uri: item?.image }}
            />
          </View>
          <View>
            <Text numberOfLines={2} style={{ width: 150, marginTop: 10 }}>
              {item?.title}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}>
              {item?.price}
            </Text>
            <Image
              style={{ width: 30, height: 30, resizeMode: "contain" }}
              source={{
                uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc7000ae7065.png",
              }}
            />
            <Text style={{ color: "green" }}>In Stock</Text>
            {/* <Text style={{ fontWeight: "500", marginTop: 6 }}>
                  {item?.rating?.rate} ratings
                </Text> */}
          </View>
          <View></View>
        </Pressable>

        <Pressable
          style={{
            marginTop: 15,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 7,
            }}
          >
            {item?.quantity > 1 ? (
              <Pressable
                onPress={() => decrementQuant(item)}
                style={{
                  backgroundColor: "#D8D8D8",
                  padding: 7,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                }}
              >
                <AntDesign name="minus" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => decrementQuant(item)}
                style={{
                  backgroundColor: "#D8D8D8",
                  padding: 7,
                  borderTopLeftRadius: 6,
                  borderBottomLeftRadius: 6,
                }}
              >
                <AntDesign name="delete" size={24} color="black" />
              </Pressable>
            )}
            <Pressable
              style={{
                backgroundColor: "white",
                paddingHorizontal: 18,
                paddingVertical: 6,
              }}
            >
              <Text>{item?.quantity}</Text>
            </Pressable>
            <Pressable
              onPress={() => incrementQuant(item)}
              style={{
                backgroundColor: "#D8D8D8",
                padding: 7,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
              }}
            >
              <Feather name="plus" size={24} color="black" />
            </Pressable>
          </View>
          <Pressable
            onPress={() => removeItem(item)}
            style={{
              backgroundColor: "white",
              paddingHorizontal: 8,
              paddingVertical: 10,
              borderRadius: 5,
              borderColor: "#C0C0C0",
              borderWidth: 0.6,
            }}
          >
            <Text>Delete</Text>
          </Pressable>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            marginBottom: 15,
            alignItems: "center",
            gap: 10,
          }}
        ></Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 150 }}>
      <StatusBar
        barStyle="light-content" // Use "dark-content" for dark text
        backgroundColor="#00CED1" // Set the background color of the status bar
      />
      <Header />

      <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal : </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{total}</Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Confirm")}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Proceed to Buy ({cart.length}) items</Text>
      </Pressable>
      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />
      <FlatList
        data={cart}
        keyExtractor={(item) => {
          console.log("Item in keyExtractor:", item);
          return item.id.toString();
        }}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
