import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  Image,
} from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from "@expo/vector-icons";
import AddToCartButton from "../utils/AddToCartButton";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    return (
      <ProductItem
        item={item}
        key={index}
        onPress={() => {
          setSelectedProduct(item);
          setModalVisible(true);
        }}
      />
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#00CED1" />
      <Header />
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
          zIndex={0}
          zIndexInverse={0}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedProduct && (
              <View
                contentContainerStyle={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Pressable
                  onPress={() => setModalVisible(!modalVisible)}
                  style={{
                    alignSelf: "flex-end",
                    marginBottom: 5,
                    paddingLeft: 10,
                    paddingUp: 4,
                    paddingBottom: 10,
                  }}
                >
                  <AntDesign name="closecircleo" size={28} color="black" />
                </Pressable>
                <Text style={styles.modalText}>{selectedProduct.title}</Text>
                <Image
                  source={{ uri: selectedProduct.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalText} numberOfLines={10}>
                  {selectedProduct.description}
                </Text>
                <Text style={styles.modalText}>
                  Price: Rs. {selectedProduct.price}
                </Text>
                <Text style={styles.modalText}>
                  Rating: {selectedProduct.rating.rate} (
                  {selectedProduct.rating.count} reviews)
                </Text>
                <AddToCartButton item={selectedProduct} />
              </View>
            )}
          </View>
        </View>
      </Modal>
      <FlatList
        data={products?.filter((item) => item.category === category)}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      />
      {modalVisible && <BlurView intensity={50} style={styles.absolute} />}
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    alignSelf: "center",
    resizeMode: "contain",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});

export default ProductsScreen;
