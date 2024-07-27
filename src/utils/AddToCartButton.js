import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import LottieView from "lottie-react-native";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <Pressable
      onPress={() => addItemToCart(item)}
      style={styles.lottieViewContainer}
    >
      {addedToCart ? (
        <LottieView
          source={require("../../assets/added_to_cart.json")}
          style={styles.lottieViewStyle}
          autoPlay
          loop={false}
          speed={0.7}
        />
      ) : (
        <Text>Add to Cart </Text>
      )}
    </Pressable>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({
  lottieViewContainer: {
    backgroundColor: "#FFC72C",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  lottieViewStyle: {
    height: 35,
    width: 35,
    alignSelf: "center",
    justifyContent: "center",
  },
});
