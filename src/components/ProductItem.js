import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/CartReducer";
import AddToCartButton from "../utils/AddToCartButton";

const ProductItem = ({ item, onPress = null }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  return (
    <Pressable
      onPress={() => {
        if (onPress) onPress(true);
      }}
      style={{ marginVertical: 25, marginHorizontal: 20 }}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: "contain" }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {item.title}{" "}
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          Rs. {item?.price}{" "}
        </Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings{" "}
        </Text>
      </View>

      <AddToCartButton item={item} />
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
