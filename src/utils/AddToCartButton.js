import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const AddToCartButton = ({ item }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  console.log("ITEM in AddToCartButton:", item);
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };
  return (
    <Pressable
      onPress={() => addItemToCart(item)}
      style={{
        backgroundColor: "#FFC72C",
        padding: 10,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
        marginTop: 10,
      }}
    >
      {addedToCart ? <Text>Added to Cart</Text> : <Text>Add to Cart</Text>}
    </Pressable>
  );
};

export default AddToCartButton;

const styles = StyleSheet.create({});
