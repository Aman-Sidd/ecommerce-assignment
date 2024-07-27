import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { useDispatch } from "react-redux";
import { cleanCart } from "../redux/CartReducer";

const OrderPlacedScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      dispatch(cleanCart());
      navigation.replace("Products");
    }, 1800);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <LottieView
        source={require("../../assets/thumbs.json")}
        style={styles.thumbsAnimation}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text style={styles.textStyle}>Your Order Has Been Received</Text>
      <LottieView source={require("../../assets/sparkle.json")} />
    </SafeAreaView>
  );
};

export default OrderPlacedScreen;

const styles = StyleSheet.create({
  thumbsAnimation: {
    height: 260,
    width: 300,
    alignSelf: "center",
    marginTop: 40,
    justifyContent: "center",
  },
  textStyle: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    textAlign: "center",
  },
});
