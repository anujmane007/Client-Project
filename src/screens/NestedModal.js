import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image
} from "react-native";
import Modal from "react-native-modal";
import { ActivityIndicator, MD2Colors, TextInput as MaterialTextInput } from "react-native-paper";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_REGION",
  signatureVersion: "v4",
});

const uploadFileToS3 = async (bucketName, fileName, fileData, type) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: fileData,
    ACL: 'bucket-owner-full-control',
    ContentType: type,
  };
  try {
    const data = await s3.upload(params).promise();
    console.log("File uploaded successfully:", data);
  } catch (err) {
    console.error("Error uploading file to S3:", err);
  }
};

export const NestedModal = ({ route, navigation }) => {
  const { item, isEdit } = route.params || {};
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUploading, setUploading] = useState(false);
  const [text, onChangeText] = useState({
    title: "",
    clientName: "",
    projectType: "",
    siteAddress: "",
    gstNo: "",
    mahareraNo: "",
    projectHead: "",
    rccDesignerName: "",
    Pan: "",
    Aadhar: "",
    Pin: "",
    email: "",
    Presentation_Drawing_1: "",
    Presentation_Drawing_2: "",
    Presentation_Drawing_3: "",
    File_Model_3D_1: "",
    File_Model_3D_2: "",
    File_Model_3D_3: "",
    Submission_Drawing: "",
    All_Floor_Plan: "",
    All_Section: "",
    All_Elevation: "",
    toilet: "",
    All_Electric_Drawing: "",
    tile_Layout: "",
    All_Grills_And_Railing: "",
    Column_Footing: "",
    Pleanth_Beam: "",
    Stair_Case_Drawing: "",
    Slab_1: "",
    Slab_2: "",
    Slab_3: "",
    Slab_4: "",
    Slab_5: "",
    BuildingApprovalDate: "",
    buildingCompletionDate: "",
    Property_Card: "",
    Property_Map: "",
    Completion_Drawing: "",
    SanctionDrawing: "",
    Revise_Sanction: "",
    Completion_Letter: "",
    tile_Layout: "",
  });

  useEffect(() => {
    console.log("Item:", item); // Log item to check its value
    if (item) {
      onChangeText((prevText) => ({
        ...prevText,
        ...item,
      }));
    }
  }, [item]);
  const handleInputChange = (field, value) => {
    onChangeText((prevText) => ({
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

  const SendDataToBackend = async () => {
    try {
      if (isEdit) {
        if (!item || !item._id) {
          return;
        }
        await axios.put(
          `http://43.205.14.45:3001/projects/${item._id}`,
          text
        );
      } else {
        await axios.post("http://43.205.14.45:3001/projects", text);
      }
      alertfun(); // Show success alert
      navigation.goBack();
    } catch (error) {
      console.error("Error sending data:", error);
      Alert.alert("Error", "An error occurred while sending data");
    }
  };
  
  

  const fetchCall = async () => {
    try {
      const response = await fetch("https://s32-1zb8.vercel.app/list");
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const pickSomething = async (value) => {
    toggleModal();
  setUploading(true);
    // console.log("value=-=-===>", value);
    try {
      let result = await DocumentPicker.getDocumentAsync({});
      // console.log("result", result);

      const assetsArray1 = result.assets[0];

      // console.log("assetsArray1:::::::::::", assetsArray1);

      // fieldname: 'file',
      // originalname:assetsArray1.name,
      // encoding: '7bit',
      // mimetype:assetsArray1.mimeType,
      const file = {
        uri: assetsArray1.uri,
        name: assetsArray1.name,
        type: assetsArray1.mimeType,
      };

      const formData = new FormData();

      formData.append("file", file);

      // console.log("file=========>", file);
      const response = await axios.post(
        "http://43.205.14.45:3001/file/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            'maxBodyLength': 'Infinity',
          },
        }
      );
      console.log("Response from backend:", response?.data);
      if (response?.data != null) {
        handleInputChange(value, response?.data?.url);
        setModalVisible(false);
      }
      setUploading(false);
    } catch (e) {
      toggleModal();
      setUploading(false);
      alert("Network error please upload again!");
    }
  };

  // const pickSomething = async (value) => {
  //   setModalVisible(true);
  //   try {
  //     let result = await DocumentPicker.getDocumentAsync({
  //       copyToCacheDirectory: true,
  //       multiple: false,
  //     });

  //     if (result.type === "cancel") {
  //       setModalVisible(false);
  //       return;
  //     }

  //     const fileUri = result.uri;
  //     const fileName = result.name;
  //     const fileType = result.mimeType;
  //     const fileData = await FileSystem.readAsStringAsync(fileUri, { encoding: FileSystem.EncodingType.Base64 });

  //     const bucketName = "mayoorgandhidata2";
  //     await uploadFileToS3(bucketName, fileName, fileData, fileType);
  //     setModalVisible(false);
  //   } catch (error) {
  //     console.error("Error picking or uploading file:", error);
  //     setModalVisible(false);
  //     Alert.alert("Error", "Network error please upload again!");
  //   }
  // };

    // console.log("assetsArray1:::::::::::", assetsArray1);

    // filename: 'file',
    // originalname:assetsArray1.name,
    // encoding: '7bit',
    // mimetype:assetsArray1.mimeType,
    //   const file = {
    //     uri: assetsArray1.uri,
    //     name: assetsArray1.name,
    //     type: assetsArray1.mimeType,
    //   };

    //   const formData = new FormData();

    //   formData.append("file", file);

    //   // console.log("file=========>", file);
    //   const response = await axios.post(
    //     "http://13.201.190.111:8000/upload",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("Response from backend:", response?.data);
    //   if (response?.data != null) {
    //     handleInputChange(value, response?.data?.url);
    //     setModalVisible(false);
    //   }
    // } catch (e) {
    //   console.log("errror------->", e);
    //   setModalVisible(false);
    //   alert("Network error please upload again!");
    // }
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }} source={require("../../assets/details.jpeg")} />
     {isModalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setUploading(!isModalVisible);
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
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center" }}>
          {/* <Button title="Pick Document" onPress={pickSomething} /> */}
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Information</Text>

          <View
            style={{
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <MaterialTextInput
              required
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("title", value)}
              value={text.title}
              placeholder="Title"
              mode="outlined"
              label="Title"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("clientName", value)}
              value={text.clientName}
              placeholder="ClientName "
              mode="outlined"
              label="ClientName"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("projectType", value)}
              value={text.projectType}
              placeholder="ProjectType "
              mode="outlined"
              label="ProjectType"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("siteAddress", value)}
              value={text.siteAddress}
              placeholder="SiteAddress"
              mode="outlined"
              label="SiteAddress"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("gstNo", value)}
              value={text.gstNo}
              placeholder="GST No"
              mode="outlined"
              label="GST No"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("mahareraNo", value)}
              value={text.mahareraNo}
              placeholder="Maharera No "
              mode="outlined"
              label="Maharera No"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("projectHead", value)}
              value={text.projectHead}
              placeholder="ProjectHead"
              mode="outlined"
              label="ProjectHead"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("rccDesignerName", value)
              }
              value={text.rccDesignerName}
              placeholder="RccDesigner Name"
              mode="outlined"
              label="RccDesigner Name"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Pan", value)}
              value={text.Pan}
              placeholder="Pan "
              mode="outlined"
              label="Pan"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Aadhar", value)}
              value={text.Aadhar}
              placeholder="Aadhar "
              mode="outlined"
              label="Aadhar"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Pin", value)}
              value={text.Pin}
              placeholder="Pin "
              mode="outlined"
              label="Pin"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("email", value)}
              value={text.email}
              placeholder="Email "
              mode="outlined"
              label="Email"
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Presentation</Text>
            {/* <Button title="Pick something" onPress={pickSomething} /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Presentation_Drawing_1")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Presentation_Drawing_1 == ""
                  ? "Presentation Drawing 1"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Presentation_Drawing_1", value)
              }
              value={text.Presentation_Drawing_1}
              placeholder="Presentation_Drawing_1 "
              mode="outlined"
              label="Presentation_Drawing_1"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Presentation_Drawing_2")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Presentation_Drawing_2 == ""
                  ? "Presentation Drawing 2"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Presentation_Drawing_2", value)
              }
              value={text.Presentation_Drawing_2}
              placeholder="Presentation_Drawing_2 "
              mode="outlined"
              label="Presentation_Drawing_2"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Presentation_Drawing_3")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Presentation_Drawing_3 == ""
                  ? "Presentation Drawing 3"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Presentation_Drawing_3", value)
              }
              value={text.Presentation_Drawing_3}
              placeholder="Presentation_Drawing_3 "
              mode="outlined"
              label="Presentation_Drawing_3"
            /> */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>3D Modal</Text>
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("File_Model_3D_1")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.File_Model_3D_1 == "" ? "File Model 3D 1" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("File_Model_3D_1", value)
              }
              value={text.File_Model_3D_1}
              placeholder="File_Model_3D_1 "
              mode="outlined"
              label="File_Model_3D_1"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("File_Model 3D 2")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.File_Model_3D_2 == "" ? "File Model 3D 2" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("File_Model_3D_2", value)
              }
              value={text.File_Model_3D_2}
              placeholder="File_Model_3D_2 "
              mode="outlined"
              label="File_Model_3D_2"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("File_Model_3D_3")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.File_Model_3D_3 == "" ? "File Model 3D 3" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("File_Model_3D_3", value)
              }
              value={text.File_Model_3D_3}
              placeholder="File_Model_3D_3 "
              mode="outlined"
              label="File_Model_3D_3"
            /> */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Working Drawing</Text>
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Submission_Drawing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Submission_Drawing == ""
                  ? "Submission Drawing"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              required
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Submission_Drawing", value)
              }
              value={text.Submission_Drawing}
              placeholder="Submission_Drawing"
              mode="outlined"
              label="Submission_Drawing"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("All_Floor_Plan")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.All_Floor_Plan == "" ? "All Floor Plan" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("All_Floor_Plan", value)
              }
              value={text.All_Floor_Plan}
              placeholder="All_Floor_Plan "
              mode="outlined"
              label="All_Floor_Plan"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("All_Section")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.All_Section == "" ? "All Section" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("All_Section", value)}
              value={text.All_Section}
              placeholder="All_Section "
              mode="outlined"
              label="All_Section"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("All_Elevation")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.All_Elevation == "" ? "All Elevation" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("All_Elevation", value)
              }
              value={text.All_Elevation}
              placeholder="All_Elevation"
              mode="outlined"
              label="All_Elevation"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("toilet")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.toilet == "" ? "Toilet" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("toilet", value)}
              value={text.toilet}
              placeholder="toilet "
              mode="outlined"
              label="toilet"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("All_Electric_Drawing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.All_Electric_Drawing == ""
                  ? "All Electric Drawing"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("All_Electric_Drawing", value)
              }
              value={text.All_Electric_Drawing}
              placeholder="All_Electric_Drawing"
              mode="outlined"
              label="All_Electric_Drawing"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("tile_Layout")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.tile_Layout == "" ? "Tile Layout" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("All_Grills_And_Railing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.All_Grills_And_Railing == ""
                  ? "All Grills And Railing"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("tile_Layout", value)}
              value={text.tile_Layout}
              placeholder="tile_Layout"
              mode="outlined"
              label="tile_Layout"
            /> */}
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("All_Grills_And_Railing", value)
              }
              value={text.All_Grills_And_Railing}
              placeholder="All_Grills_And_Railing"
              mode="outlined"
              label="All_Grills_And_Railing"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Column_Footing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Column_Footing == "" ? "Column Footing" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Column_Footing", value)
              }
              value={text.Column_Footing}
              placeholder="Column_Footing "
              mode="outlined"
              label="Column_Footing"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Pleanth_Beam")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Pleanth_Beam == "" ? "Pleanth Beam" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Pleanth_Beam", value)}
              value={text.Pleanth_Beam}
              placeholder="Pleanth_Beam "
              mode="outlined"
              label="Pleanth_Beam"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Stair_Case_Drawing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Stair_Case_Drawing == ""
                  ? "Stair Case Drawing"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Stair_Case_Drawing", value)
              }
              value={text.Stair_Case_Drawing}
              placeholder="Stair_Case_Drawing "
              mode="outlined"
              label="Stair_Case_Drawing"
            /> */}
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Structural Drawing</Text>
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Slab_1")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Slab_1 == "" ? "Slab 1" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Slab_1", value)}
              value={text.Slab_1}
              placeholder="Slab_1"
              mode="outlined"
              label="Slab_1"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Slab_2")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Slab_2 == "" ? "Slab 2" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Slab_2", value)}
              value={text.Slab_2}
              placeholder="Slab_2 "
              mode="outlined"
              label="Slab_2"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Slab_3")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Slab_3 == "" ? "Slab 3" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Slab_3", value)}
              value={text.Slab_3}
              placeholder="Slab_3 "
              mode="outlined"
              label="Slab_3"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Slab_4")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Slab_4 == "" ? "Slab 4" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Slab_5")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Slab_5 == "" ? "Slab 5" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Slab_4", value)}
              value={text.Slab_4}
              placeholder="Slab_4 "
              mode="outlined"
              label="Slab_4"
            />

            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Slab_5", value)}
              value={text.Slab_5}
              placeholder="Slab_5 "
              mode="outlined"
              label="Slab_5"
            /> */}

            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("BuildingApprovalDate", value)
              }
              value={text.BuildingApprovalDate}
              placeholder="BuildingApprovalDate"
              mode="outlined"
              label="BuildingApprovalDate"
            />
            <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("buildingCompletionDate", value)
              }
              value={text.buildingCompletionDate}
              placeholder="BuildingCompletionDate "
              mode="outlined"
              label="BuildingCompletionDate"
            />
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Property_Card")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Property_Card == "" ? "Propertym Card" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Property_Card", value)
              }
              value={text.Property_Card}
              placeholder="Property_Card"
              mode="outlined"
              label="Property_Card"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Property_Map")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Property_Map == "" ? "Property Map" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) => handleInputChange("Property_Map", value)}
              value={text.Property_Map}
              placeholder="Property_Map"
              mode="outlined"
              label="Property_Map"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Completion_Drawing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Completion_Drawing == ""
                  ? "Completion Drawing"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Completion_Drawing", value)
              }
              value={text.Completion_Drawing}
              placeholder="Completion_Drawing "
              mode="outlined"
              label="Completion_Drawing"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("SanctionDrawing")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.SanctionDrawing == "" ? "SanctionDrawing" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("SanctionDrawing", value)
              }
              value={text.SanctionDrawing}
              placeholder="SanctionDrawing "
              mode="outlined"
              label="SanctionDrawing"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Revise_Sanction")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Revise_Sanction == "" ? "Revise Sanction" : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Revise_Sanction", value)
              }
              value={text.Revise_Sanction}
              placeholder="Revise_Sanction "
              mode="outlined"
              label="Revise_Sanction"
            /> */}
            <TouchableOpacity
              style={{
                width: "80%",
                borderWidth: 1,
                paddingVertical: 13,
                borderRadius: 5,
                backgroundColor: "#fff",
                marginVertical: 3,
              }}
              onPress={() => pickSomething("Completion_Letter")}
            >
              <Text style={{ fontSize: 15, paddingLeft: 15 }}>
                {text?.Completion_Letter == ""
                  ? "Completion Letter"
                  : "Uploaded!"}
              </Text>
            </TouchableOpacity>
            {/* <MaterialTextInput
              style={{ width: "80%" }}
              onChangeText={(value) =>
                handleInputChange("Completion_Letter", value)
              }
              value={text.Completion_Letter}
              placeholder="Completion_Letter "
              mode="outlined"
              label="Completion_Letter"
            /> */}
          </View>
          <View style={{ margin: 15 }}>
            <Button title={isEdit ? "Update" : "create a new project"} onPress={SendDataToBackend} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  container: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Distribute space evenly between inputs
    padding: 10,
  },
});

export default NestedModal;