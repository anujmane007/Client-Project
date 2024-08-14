import React, { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
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
import * as FileSystem from 'expo-file-system';

const InteriorDetails = ({ route, navigation }) => {
  const { id } = route.params;
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fieldOrder = [
    "Floor_Plan_1",
    "Floor_Plan_2",
    "Floor_Plan_3",
    "Floor_Plan_4",
    "Sections_1",
    "Sections_2",
    "Sections_3",
    "Sections_4",
    "All_Section",
    "Elevation_1",
    "Elevation_2",
    "Elevation_3",
    "Elevation_4",
    "All_Elevation",
    "ThreeD_Model1",
    "ThreeD_Model2",
    "ThreeD_Model3",
    "ThreeD_Model4",
    "Electric_Layout_1",
    "Electric_Layout_2",
    "Electric_Layout_3",
    "Celling_Layout_1",
    "Celling_Layout_2",
    "Celling_Layout_3",
    "Celling_Layout_4",
    "PlumbingDetails_1",
    "PlumbingDetails_2",
   "FlooringDetails_1",
   "FlooringDetails_2",
    "Furniture_Details_1",
    "Furniture_Details_2",
    "Furniture_Details_3",
    "Furniture_Details_4",
    "Furniture_Details_5",
    "Laminator_Venner_1",
    "Laminator_Venner_2",
    "Handles_Hardware_1",
    "Handles_Hardware_2",
    "Curtains_1",
    "Curtains_2",
    "Plumbing_Details_1",
    "Plumbing_Details_2",
    "Plumbing_Details_3",
  ]


  useFocusEffect(
    useCallback(() => {
      axios
        .get(`http://43.205.14.45:3001/interior/${id}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Error", "Failed to fetch data");
        });
    }, [id])
  );

  // Function to handle opening the modal and setting the selected image
  const handleOpenModal = (imageUri) => {
    console.log(imageUri);
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
      const downloadObject = FileSystem.createDownloadResumable(imageUri, localUri);
  
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
    navigation.navigate('Interior Project', { item: data, isEdit: true });
  };
  
  const handleDeleteDetail = async (key) => {
    console.log("handleDeleteDetail called with key:", key);
    try {
      await axios.delete(`http://43.205.14.45:3001/interior/${id}/image`, { data: { key } });
      console.log("Successfully deleted key:", key);
      // setData(prevData => {
      //   const newData = { ...prevData };
      //   delete newData[key];
      //   return newData;
      // });
      setData(prevData => {
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
            <Text style={styles.label}>Project Head:</Text>
            <Text style={styles.value}>{data?.projectHead}</Text>
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

      <View style={styles.imageSection}>
        {/* Mapping through data keys to display images */}
        {/* {Object.keys(data).map((key) => {
          if (
            key.includes("Floor_Plan_1") ||
            key.includes("Floor_Plan_2") ||
            key.includes("Floor_Plan_3") ||
            key.includes("Floor_Plan_4") ||
            key.includes("Sections_1") ||
            key.includes("Sections_2") ||
            key.includes("Sections_3") ||
            key.includes("Sections_4") ||
            key.includes("All_Section") ||
            key.includes("Elevation_1") ||
            key.includes("Elevation_2") ||
            key.includes("Elevation_3") ||
            key.includes("Elevation_4") ||
            key.includes("All_Elevation") ||
            key.includes("ThreeD_Model1") ||
            key.includes("ThreeD_Model2") ||
            key.includes("ThreeD_Model3") ||
            key.includes("ThreeD_Model4") ||
            key.includes("Electric_Layout_1") ||
            key.includes("Electric_Layout_2") ||
            key.includes("Electric_Layout_3") ||
            key.includes("Celling_Layout_1") ||
            key.includes("Celling_Layout_2") ||
            key.includes("Celling_Layout_3") ||
            key.includes("Celling_Layout_4") ||
            key.includes("PlumbingDetails_1") ||
            key.includes("PlumbingDetails_2") ||
            key.includes("FlooringDetails_1") ||
            key.includes("FlooringDetails_2") ||
            key.includes("Furniture_Details_1") ||
            key.includes("Furniture_Details_2") ||
            key.includes("Furniture_Details_3") ||
            key.includes("Furniture_Details_4") ||
            key.includes("Furniture_Details_5") ||
            key.includes("Laminator_Venner_1") ||
            key.includes("Laminator_Venner_2") ||
            key.includes("Handles_Hardware_1") ||
            key.includes("Handles_Hardware_2") ||
            key.includes("Curtains_1") ||
            key.includes("Curtains_2") ||
            key.includes("Flooring_Details_1") ||
            key.includes("Flooring_Details_2") ||
            key.includes("Plumbing_Details_1") ||
            key.includes("Plumbing_Details_2") ||
            key.includes("Plumbing_Details_3")
          ) { */}
          {fieldOrder.map((key) => {
            const uri = data[key];
            console.log("dada",uri)
            return (
              <View key={key} style={styles.imageContainer}>
                <Text style={styles.imageTitle}>{key}</Text>
                {uri ? (
                  <Image
                    style={styles.image}
                    source={{ uri }}
                    // resizeMode="cover"
                  />
                ) : (
                  <Text
                    style={[styles.image, { textAlign: "center", top: "20%" }]}
                  >
                    Image not added
                  </Text>
                )}
                <View style={styles.buttonContainer}>
                  {/* View Button */}
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleOpenModal(data[key])}
                  >
                    <Image
                      style={styles.buttonIcon}
                      source={require("../../assets/view.png")}
                    />
                  </TouchableOpacity>
                  {/* Delete Button */}
                  <TouchableOpacity style={styles.button} onPress={() => handleDeleteDetail(key)}>
                    <Image
                      style={styles.buttonIcon}
                      source={require("../../assets/delete.png")}
                    />
                  </TouchableOpacity>

                  {/* edit Button */}
                  <TouchableOpacity style={styles.button}
                  onPress={() =>handleEdit(data[key])}
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
              style={{ height: 25, width: 25, resizeMode: "contain" }}
              source={require("../../assets/close.png")}
            />
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

export default InteriorDetails;
