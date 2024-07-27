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
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";

const CartScreen = ({ navigation }) => {
  const cart = useSelector((state) => state.cart.cart);

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
    return (
      <View style={styles.itemContainer} key={index}>
        <Pressable style={styles.itemPressable}>
          <View>
            <Image style={styles.itemImage} source={{ uri: item?.image }} />
          </View>
          <View>
            <Text numberOfLines={2} style={styles.itemTitle}>
              {item?.title}{" "}
            </Text>
            <Text style={styles.itemPrice}>Rs. {item?.price} </Text>
            <Image
              style={styles.itemStockImage}
              source={{
                uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc7000ae7065.png",
              }}
            />
            <Text style={styles.itemStockText}>In Stock </Text>
          </View>
          <View></View>
        </Pressable>

        <Pressable style={styles.quantityContainer}>
          <View style={styles.quantityControls}>
            {item?.quantity > 1 ? (
              <Pressable
                onPress={() => decrementQuant(item)}
                style={styles.decrementButton}
              >
                <AntDesign name="minus" size={24} color="black" />
              </Pressable>
            ) : (
              <Pressable
                onPress={() => decrementQuant(item)}
                style={styles.decrementButton}
              >
                <AntDesign name="delete" size={24} color="black" />
              </Pressable>
            )}
            <Pressable style={styles.quantityTextContainer}>
              <Text>{item?.quantity} </Text>
            </Pressable>
            <Pressable
              onPress={() => incrementQuant(item)}
              style={styles.incrementButton}
            >
              <Feather name="plus" size={24} color="black" />
            </Pressable>
          </View>
          <Pressable
            onPress={() => removeItem(item)}
            style={styles.deleteButton}
          >
            <Text>Delete </Text>
          </Pressable>
        </Pressable>
        <Pressable style={styles.emptyContainer}></Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content" // Use "dark-content" for dark text
        backgroundColor="#00CED1" // Set the background color of the status bar
      />
      <Header />
      {cart.length == 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No Items in the Cart. </Text>
        </View>
      ) : (
        <View>
          <View style={styles.subtotalContainer}>
            <Text style={styles.subtotalText}>Subtotal : </Text>
            <Text style={styles.subtotalAmount}>{total} </Text>
          </View>

          <Pressable
            onPress={() => navigation.navigate("OrderPlaced")}
            style={styles.proceedButton}
          >
            <Text>Proceed to Buy ({cart.length}) items </Text>
          </Pressable>
          <Text style={styles.divider} />
          <FlatList
            data={cart}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            renderItem={renderItem}
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  itemContainer: {
    backgroundColor: "white",
    marginVertical: 10,
    borderBottomColor: "#F0F0F0",
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  itemPressable: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemImage: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  itemTitle: {
    width: 150,
    marginTop: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
  },
  itemStockImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  itemStockText: {
    color: "green",
  },
  quantityContainer: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
  },
  decrementButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  quantityTextContainer: {
    backgroundColor: "white",
    paddingHorizontal: 18,
    paddingVertical: 6,
  },
  incrementButton: {
    backgroundColor: "#D8D8D8",
    padding: 7,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  deleteButton: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 5,
    borderColor: "#C0C0C0",
    borderWidth: 0.6,
  },
  emptyContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    gap: 10,
  },
  emptyCartContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCartText: {
    fontSize: 25,
  },
  subtotalContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: "400",
  },
  subtotalAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  divider: {
    height: 1,
    borderColor: "#D0D0D0",
    borderWidth: 1,
    marginTop: 16,
  },
  flatListContent: {
    paddingBottom: 150,
  },
});
