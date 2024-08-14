import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import axios from "axios";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const Details = ({ route, navigation }) => {
  const { id } = route.params;
  console.log("id-=-=-=-=", id);
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fieldOrder = [
    "Presentation_Drawing_1",
    "Presentation_Drawing_2",
    "Presentation_Drawing_3",
    "File_Model_3D_1",
    "File_Model_3D_2",
    "File_Model_3D_3",
    "Submission_Drawing",
    "All_Floor_Plan",
    "All_Section",
    "All_Elevation",
    "toilet",
    "All_Electric_Drawing",
    "tile_Layout",
    "All_Grills_And_Railing",
    "Column_Footing",
    "Pleanth_Beam",
    "Stair_Case_Drawing",
    "Slab_1",
    "Slab_2",
    "Slab_3",
    "Slab_4",
    "Slab_5",
    "BuildingApprovalDate",
    "buildingCompletionDate",
    "Property_Card",
    "Property_Map",
    "Completion_Drawing",
    "SanctionDrawing",
    "Revise_Sanction",
    "Completion_Letter",
    "tile_Layout",
  ];

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`http://43.205.14.45:3001/projects/${id}`)
        .then((response) => {
          console.log("response?.data======>", response?.data);
          setData(response?.data);
        })
        .catch((error) => console.error(error));
    }, [id])
  );

  // Function to handle opening the modal and setting the selected image
  const handleOpenModal = (imageUri) => {
    setSelectedImage(imageUri);
    setModalVisible(true);
  };
  const s3 = new AWS.S3({
    accessKeyId: "Replace Your Key",
    secretAccessKey: "Replace Your Key",
    region: "eu-north-1",
    signatureVersion: "v4",
  });
  const generateSignedUrl = async (bucketName, imageUri) => {
    const params = {
      Bucket: bucketName,
      Key: imageUri,
      // imageUri: imageUri
      // Expires: 60, // URL expiration time in seconds
    };

    return s3.getSignedUrlPromise("getObject", params);
  };
  const handleShare = async (imageUri) => {
    const bucketName = "mayoorgandhidata2";

    if (typeof imageUri !== "string") {
      console.error("Invalid imageUri provided");
      return;
    }

    const fileName = imageUri.split("/").pop();

    try {
      const localUri = `${FileSystem.cacheDirectory}${fileName}`;
      const downloadObject = FileSystem.createDownloadResumable(
        imageUri,
        localUri
      );

      const { uri } = await downloadObject.downloadAsync();

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        console.error("Sharing is not available on this device");
        return;
      }

      await Sharing.shareAsync(uri, {
        dialogTitle: "Share this via",
      });
    } catch (error) {
      console.error("Error sharing:", error.message);
      Alert.alert("Error", "Failed to share the file.");
    }
  };
  const handleEdit = () => {
    navigation.navigate("Architecture Project", { item: data, isEdit: true });
  };

  // const handleDeleteDetail = async (key) => {
  //   console.log("handleDeleteDetail called with key:", key);
  //   try {
  //     await axios.delete(`http://43.205.14.45:3001/projects/${id}/image`, { data: { key } });
  //     console.log("Successfully deleted key:", key);
  //     setData(prevData => {
  //       const newData = { ...prevData };
  //       delete newData[key];
  //       return newData;
  //     });
  //   } catch (error) {
  //     console.error("Error deleting image:", error);
  //     Alert.alert("Error", "Failed to delete the image.");
  //   }
  // };
  const handleDeleteDetail = async (key) => {
    console.log("handleDeleteDetail called with key:", key);
    try {
      await axios.delete(`http://43.205.14.45:3001/projects/${id}/image`, {
        data: { key },
      });
      console.log("Successfully deleted key:", key);

      setData((prevData) => {
        const newData = { ...prevData };
        newData[key] = ""; // Or set it to null if you prefer: newData[key] = null;
        return newData;
      });
    } catch (error) {
      console.error("Error deleting image:", error);
      Alert.alert("Error", "Failed to delete the image.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.infoSection}>
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.clientName}>{data?.title}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Client Name:</Text>
            <Text style={styles.clientName}>{data?.clientName}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Project Type:</Text>
            <Text style={styles.value}>{data?.projectType}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Site Address:</Text>
            <Text style={styles.value}>{data?.siteAddress}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>GST No:</Text>
            <Text style={styles.value}>{data?.gstNo}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Maharera No:</Text>
            <Text style={styles.value}>{data?.mahareraNo}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Project Head:</Text>
            <Text style={styles.value}>{data?.projectHead}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>RCC Designer Name:</Text>
            <Text style={styles.value}>{data?.rccDesignerName}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Pan:</Text>
            <Text style={styles.value}>{data?.Pan}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Aadhar:</Text>
            <Text style={styles.value}>{data?.Aadhar}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Pin:</Text>
            <Text style={styles.value}>{data?.Pin}</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{data?.email}</Text>
          </View>
        </View>
      </View>

      {/* <View style={styles.imageSection}>
        {Object.keys(data).map((key) => {
          console.log("key========>", key);
          if (
            key.includes("Presentation_Drawing") ||
            key.includes("File_Model_3D") ||
            key.includes("Submission_Drawing") ||
            key.includes("All_Floor_Plan") ||
            key.includes("All_Section") ||
            key.includes("All_Elevation") ||
            key.includes("toilet") ||
            key.includes("All_Electric_Drawing") ||
            key.includes("tile_Layout") ||
            key.includes("All_Grills_And_Railing") ||
            key.includes("Column_Footing") ||
            key.includes("Pleanth_Beam") ||
            key.includes("Stair_Case_Drawing") ||
            key.includes("Slab_1") ||
            key.includes("Slab_2") ||
            key.includes("Slab_3") ||
            key.includes("Slab_4") ||
            key.includes("Slab_5") ||
            key.includes("BuildingApprovalDate") ||
            key.includes("buildingCompletionDate") ||
            key.includes("Property_Card") ||
            key.includes("Property_Map") ||
            key.includes("Completion_Drawing") ||
            key.includes("SanctionDrawing") ||
            key.includes("Revise_Sanction") ||
            key.includes("Completion_Letter")
          ) {
            const uri = data[key];
            return (
              <View key={key} style={styles.imageContainer}>
                <Text style={styles.imageTitle}>{key}</Text>
                {uri ? (
                  <Image
                    style={styles.image}
                    source={{ uri }}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={[styles.image,{textAlign:"center", top : "20%"}]}>Image not added</Text>
                )}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOpenModal(data[key])}
                  >
                    <Image
                      style={styles.buttonIcon}
                      source={require("../../assets/view.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button}  onPress={() => handleDeleteDetail(key)}>
                    <Image
                      style={styles.buttonIcon}
                      source={require("../../assets/delete.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.button} onPress={() =>handleEdit(data[key])}>
                    <Image
                      style={styles.buttonIcon}
                      source={require("../../assets/save2.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleShare(uri)}
                  >
                    <Image
                      style={styles.buttonIcon}
                      source={require("../../assets/share.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }
        })}
      </View> */}
      <View style={styles.imageSection}>
        {fieldOrder.map((key) => {
          const uri = data[key];
          return (
            <View key={key} style={styles.imageContainer}>
              <Text style={styles.imageTitle}>{key}</Text>
              {uri ? (
                <Image
                  style={styles.image}
                  source={{ uri }}
                  resizeMode="cover"
                />
              ) : (
                <Text
                  style={[styles.image, { textAlign: "center", top: "20%" }]}
                >
                  Image not added
                </Text>
              )}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleOpenModal(data[key])}
                >
                  <Image
                    style={styles.buttonIcon}
                    source={require("../../assets/view.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleDeleteDetail(key)}
                >
                  <Image
                    style={styles.buttonIcon}
                    source={require("../../assets/delete.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleEdit(data[key])}
                >
                  <Image
                    style={styles.buttonIcon}
                    source={require("../../assets/save2.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleShare(uri)}
                >
                  <Image
                    style={styles.buttonIcon}
                    source={require("../../assets/share.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Image
              style={{ height: 15, width: 15, resizeMode: "contain" }}
              source={require("../../assets/close.png")}
            ></Image>
          </TouchableOpacity>
          <Image
            style={styles.modalImage}
            source={{ uri: selectedImage }}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  infoSection: {
    marginBottom: 20,
    backgroundColor: "#D8D8D8",
    padding: 15,
    borderRadius: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
  },
  imageSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    marginBottom: 20,
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    padding: 5,
  },
  imageTitle: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: "bold",
    paddingVertical: 5,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 5,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: "black",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalImage: {
    width: "90%",
    height: "90%",
    borderRadius: 10,
  },
  closeButton: {
    top: 0,
    left: "45%",
    padding: 5,
    borderRadius: 15,
    zIndex: 1,
    backgroundColor: "#fff",
  },
  closeButtonText: {
    fontSize: 16,
  },
  infoSection: {
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    marginVertical: 10,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#333",
  },
  clientName: {
    color: "#555",
  },
  value: {
    color: "#555",
  },
});

export default Details;
