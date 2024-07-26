// ProductScreen.js
import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");

  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewellery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  const onGenderOpen = useCallback(() => {
    setOpen(true);
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const renderItem = ({ item, index }) => {
    console.log("ITEM:", item);
    return <ProductItem item={item} key={index} />;
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", paddingBottom: 120 }}>
      <Header />
      <StatusBar
        barStyle="light-content" // Use "dark-content" for dark text
        backgroundColor="#00CED1" // Set the background color of the status bar
      />
      <View
        style={{
          marginHorizontal: 10,
          width: "45%",
          marginLeft: 15,
          marginTop: 10,
          marginBottom: open ? 50 : 15,
        }}
      >
        <DropDownPicker
          style={{
            borderColor: "#B7B7B7",
            height: 30,

            marginBottom: open ? 120 : 15,
          }}
          open={open}
          value={category}
          items={items}
          setOpen={setOpen}
          setValue={setCategory}
          setItems={setItems}
          placeholder="choose category"
          placeholderStyle={{ backgroundColor: "red" }}
          onOpen={onGenderOpen}
          zIndex={3000}
          zIndexInverse={1000}
        ></DropDownPicker>
      </View>

      <FlatList
        style
        data={products?.filter((item) => item.category === category)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
});

export default ProductsScreen;
