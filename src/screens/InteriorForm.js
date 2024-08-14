import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import {
  ActivityIndicator,
  MD2Colors,
  TextInput as MaterialTextInput,
} from "react-native-paper";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";

const InteriorForm = ({ route, navigation }) => {
  const { item, isEdit } = route.params || {};
  const [loder, setloder] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState({
    title: "",
    clientName: "",
    projectType: "",
    siteAddress: "",
    gstNo: "",
    projectHead: "",
    Pan: "",
    Aadhar: "",
    Pin: "",
    email: "",
    Floor_Plan_1: "",
    Floor_Plan_2: "",
    Floor_Plan_3: "",
    Floor_Plan_4: "",
    Sections_1: "",
    Sections_2: "",
    Sections_3: "",
    Sections_4: "",
    All_Section: "",
    Elevation_1: "",
    Elevation_2: "",
    Elevation_3: "",
    Elevation_4: "",
    All_Elevation: "",
    ThreeD_Model1: "",
    ThreeD_Model2: "",
    ThreeD_Model3: "",
    ThreeD_Model4: "",
    Electric_Layout_1: "",
    Electric_Layout_2: "",
    Electric_Layout_3: "",
    Celling_Layout_1: "",
    Celling_Layout_2: "",
    Celling_Layout_3: "",
    Celling_Layout_4: "",
    PlumbingDetails_1: "",
    PlumbingDetails_2: "",
    FlooringDetails_1: "",
    FlooringDetails_2: "",
    Furniture_Details_1: "",
    Furniture_Details_2: "",
    Furniture_Details_3: "",
    Furniture_Details_4: "",
    Furniture_Details_5: "",
    Laminator_Venner_1: "",
    Laminator_Venner_2: "",
    Handles_Hardware_1: "",
    Handles_Hardware_2: "",
    Curtains_1: "",
    Curtains_2: "",
    Plumbing_Details_1: "",
    Plumbing_Details_2: "",
    Plumbing_Details_3: "",
  });

  // useEffect(() => {
  //   if (item) {
  //     setText((prevText) => ({
  //       ...prevText,
  //       ...item,
  //     }));
  //   }
  // }, [item]);
  useEffect(() => {
    console.log("Item:", item); // Log item to check its value
    if (item) {
      setText((prevText) => ({
        ...prevText,
        ...item,
      }));
    }
  }, [item]);
  const handleInputChange = (field, value) => {
    setText((prevText) => ({
      ...prevText,
      [field]: value,
    }));
  };

  const alertfun = () => {
    if (isEdit) {
      Alert.alert("Success", "Your Project Is Updated Successfully");
    } else {
      Alert.alert("Success", "Your Project Is Created Successfully");
    }
  };

  // const SendDataToBackendInteriorSchema = async () => {
  //   try {
  //     console.log(item._id);
  //     if (isEdit) {
  //       await axios.put(`http://43.205.14.45:3001/interior/${item._id}`, text);
  //       navigation.goBack();
  //     } else {
  //       await axios.post("http://43.205.14.45:3001/interior", text);
  //       navigation.goBack();
  //     }
  //     alertfun(); // Show success alert
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const SendDataToBackendInteriorSchema = async () => {
    try {
      if (isEdit) {
        if (!item || !item._id) {
          return;
        }
        await axios.put(`http://43.205.14.45:3001/interior/${item._id}`, text);
        navigation.goBack();
      } else {
        await axios.post("http://43.205.14.45:3001/interior", text);
        alertfun(); // Show success alert
        navigation.goBack();
      }
    } catch (error) {
      console.error("Error sending data:", error);
      Alert.alert("Error", "An error occurred while sending data");
    }
  };
  

  const pickSomethingInterior = async (value) => {
    setModalVisible(true); // Assuming this sets a modal to visible
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      console.log(result);

      if (!result.canceled) {
        const formData = new FormData();
        formData.append("file", {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          type: result.assets[0].mimeType,
        });

        const response = await axios.post(
          "http://43.205.14.45:3001/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("rahul", response?.data?.url);

        if (response?.data?.url) {
          handleInputChange(value, response?.data?.url);
          setModalVisible(false); // Hide the modal after successful upload
        } else {
          throw new Error("Failed to upload file"); // Handle unexpected response
        }
      } else {
        throw new Error("File selection was cancelled"); // Handle cancellation
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setModalVisible(false); // Hide the modal on error
      alert("Network error, please upload again!");
    }
  };

  return (
    <ScrollView>
      <Image
        style={{
          position: "absolute",
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
        source={require("../../assets/details.jpeg")}
      />
      {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <ActivityIndicator
              animating={true}
              size="large"
              color={MD2Colors.red800}
            />
          </View>
        </Modal>
      )}
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Client details.
        </Text>
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("title", value)}
          value={text.title}
          placeholder="Title"
          mode="outlined"
          label="Title"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("clientName", value)}
          value={text.clientName}
          placeholder="Client Name"
          mode="outlined"
          label="Client Name"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("projectType", value)}
          value={text.projectType}
          placeholder="Project Type"
          mode="outlined"
          label="Project Type"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("siteAddress", value)}
          value={text.siteAddress}
          placeholder="Site Address"
          mode="outlined"
          label="Site Address"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("gstNo", value)}
          value={text.gstNo}
          placeholder="GST Number"
          mode="outlined"
          label="GST Number"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("projectHead", value)}
          value={text.projectHead}
          placeholder="Project Head"
          mode="outlined"
          label="Project Head"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("Pan", value)}
          value={text.Pan}
          placeholder="PAN Number"
          mode="outlined"
          label="PAN Number"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("Aadhar", value)}
          value={text.Aadhar}
          placeholder="Aadhar Number"
          mode="outlined"
          label="Aadhar Number"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("Pin", value)}
          value={text.Pin}
          placeholder="PIN Code"
          mode="outlined"
          label="PIN Code"
        />
        <MaterialTextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("email", value)}
          value={text.email}
          placeholder="Email"
          mode="outlined"
          label="Email"
        />
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Presentation Drawing
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Floor_Plan_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Floor_Plan_1 == "" ? "Floor_Plan_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Floor_Plan_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Floor_Plan_2 == "" ? "Floor_Plan_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Floor_Plan_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Floor_Plan_3 == "" ? "Floor_Plan_3" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Floor_Plan_4")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Floor_Plan_4 == "" ? "Floor_Plan_4" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Sections
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Sections_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Sections_1 == "" ? "Sections_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Sections_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Sections_2 == "" ? "Sections_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Sections_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Sections_3 == "" ? "Sections_3" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Sections_4")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Sections_4 == "" ? "Sections_4" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("All_Section")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.All_Section == "" ? "All_Section" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Elevations
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Elevation_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Elevation_1 == "" ? "Elevation_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Elevation_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Elevation_2 == "" ? "Elevation_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Elevation_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Elevation_3 == "" ? "Elevation_3" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Elevation_4")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Elevation_4 == "" ? "Elevation_4" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("All_Elevation")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.All_Elevation == "" ? "All_Elevation" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          3D Model
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("ThreeD_Model1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.ThreeD_Model1 == "" ? "3D_Model1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("ThreeD_Model2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.ThreeD_Model2 == "" ? "3D_Model2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("ThreeD_Model3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.ThreeD_Model3 == "" ? "3D_Model3" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("ThreeD_Model4")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.ThreeD_Model4 == "" ? "3D_Model4" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Detail working drawings
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Electric_Layout_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Electric_Layout_1 == "" ? "Electric_Layout_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Electric_Layout_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Electric_Layout_2 == "" ? "Electric_Layout_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Electric_Layout_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Electric_Layout_3 == "" ? "Electric_Layout_3" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Celling_Layout_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Celling_Layout_1 == "" ? "Celling_Layout_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Celling_Layout_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Celling_Layout_2 == "" ? "Celling_Layout_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Celling_Layout_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Celling_Layout_3 == "" ? "Celling_Layout_3" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Celling_Layout_4")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Celling_Layout_4 == "" ? "Celling_Layout_4" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("PlumbingDetails_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.PlumbingDetails_1 == "" ? "PlumbingDetails_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("PlumbingDetails_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.PlumbingDetails_2 == "" ? "PlumbingDetails_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Furniture details.
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("FlooringDetails_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.FlooringDetails_1 == "" ? "FlooringDetails_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("FlooringDetails_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.FlooringDetails_2 == "" ? "FlooringDetails_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Furniture_Details_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Furniture_Details_1 == ""
              ? "Furniture_Details_1"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Furniture_Details_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Furniture_Details_2 == ""
              ? "Furniture_Details_2"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Furniture_Details_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Furniture_Details_3 == ""
              ? "Furniture_Details_3"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Furniture_Details_4")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Furniture_Details_4 == ""
              ? "Furniture_Details_4"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Furniture_Details_5")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Furniture_Details_5 == ""
              ? "Furniture_Details_5"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}>
          Selection details
        </Text>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Laminator_Venner_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Laminator_Venner_1 == ""
              ? "Laminator_Venner_1"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Laminator_Venner_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Laminator_Venner_2 == ""
              ? "Laminator_Venner_2"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Handles_Hardware_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Handles_Hardware_1 == ""
              ? "Handles_Hardware_1"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Handles_Hardware_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Handles_Hardware_2 == ""
              ? "Handles_Hardware_2"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Curtains_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Curtains_1 == "" ? "Curtains_1" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Curtains_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Curtains_2 == "" ? "Curtains_2" : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Flooring_Details_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Flooring_Details_1 == ""
              ? "Flooring_Details_1"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Flooring_Details_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Flooring_Details_2 == ""
              ? "Flooring_Details_2"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Plumbing_Details_1")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Plumbing_Details_1 == ""
              ? "Plumbing_Details_1"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Plumbing_Details_2")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Plumbing_Details_2 == ""
              ? "Plumbing_Details_2"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "90%",
            borderWidth: 1,
            paddingVertical: 13,
            borderRadius: 5,
            backgroundColor: "#fff",
            marginVertical: 3,
          }}
          onPress={() => pickSomethingInterior("Plumbing_Details_3")}
        >
          <Text style={{ fontSize: 15, paddingLeft: 15 }}>
            {text?.Plumbing_Details_3 == ""
              ? "Plumbing_Details_3"
              : "Uploaded!"}
          </Text>
        </TouchableOpacity>
        <View style={{ margin: 15 }}>
          <Button
            title={isEdit ? "Update" : "create a new project"}
            onPress={SendDataToBackendInteriorSchema}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default InteriorForm;
