import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  Image,
  Alert,
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
import LottieView from "lottie-react-native";
import { getProducts } from "../api/getProducts";

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("electronics");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [items, setItems] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "Jewellery", value: "jewelery" },
    { label: "Electronics", value: "electronics" },
    { label: "Women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        setProducts(response);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
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
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor="#00CED1" />
      <Header />
      {loading ? (
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("../../assets/loading_spinner.json")}
            style={styles.loadingStyle}
            autoPlay
            loop={true}
            speed={0.7}
          />
        </View>
      ) : (
        <View>
          <View style={styles.dropdownContainer}>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Select Category:{" "}
            </Text>
            <DropDownPicker
              style={styles.dropdownStyle}
              open={open}
              value={category}
              items={items}
              setOpen={setOpen}
              setValue={setCategory}
              setItems={setItems}
              placeholder="choose category"
              placeholderStyle={{ backgroundColor: "red" }}
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
                  <View contentContainerStyle={styles.modalViewContainer}>
                    <Pressable
                      onPress={() => setModalVisible(!modalVisible)}
                      style={styles.crossButton}
                    >
                      <AntDesign name="closecircleo" size={28} color="black" />
                    </Pressable>
                    <Text style={[styles.modalText, { fontWeight: "bold" }]}>
                      {selectedProduct.title}
                    </Text>
                    <Image
                      source={{ uri: selectedProduct.image }}
                      style={styles.modalImage}
                    />
                    <Text style={styles.modalText} numberOfLines={10}>
                      {selectedProduct.description}
                    </Text>
                    <Text style={styles.modalText}>
                      <Text style={{ fontWeight: "bold" }}>Price:</Text> Rs.{" "}
                      {selectedProduct.price}
                    </Text>
                    <Text style={styles.modalText}>
                      <Text style={{ fontWeight: "bold" }}>Rating:</Text>{" "}
                      {selectedProduct.rating.rate} (
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
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={styles.flatlistContainer}
          />
          {modalVisible && <BlurView intensity={50} style={styles.absolute} />}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    backgroundColor: "white",
    flex: 1,
  },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
  loadingStyle: {
    height: 50,
    width: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  dropdownContainer: {
    marginHorizontal: 10,
    marginLeft: 15,
    marginVertical: 20,
    zIndex: 1,
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
  },
  dropdownStyle: {
    borderColor: "#B7B7B7",
    height: 30,
    // width: "45%",
  },
  modalViewContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  crossButton: {
    alignSelf: "flex-end",
    marginBottom: 5,
    paddingLeft: 10,
    paddingUp: 4,
    paddingBottom: 10,
  },
  flatlistContainer: {
    paddingBottom: 120,
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
