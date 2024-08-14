import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { endpoints } from "../Endpoints/endpoints";
import { ProjectModal } from "../GenericComponent/ProjectModal";
import { SafeAreaView } from "react-native-web";
import { CommonClass } from "../styles/Commonclass";

const ProjectDetailsModal = ({ navigation, route }) => {
  const { data } = route?.params;
  const [modalVisible, setModalVisible] = useState(false);

  const Modal1Bkcall = async (state) => {
    let data = await endpoints.Account.create(state);
    return data;
  };
  console.log("homepage");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={{
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    }} source={require("../../assets/homepage.jpeg")} />
      <View>
        <TouchableOpacity
          style={CommonClass.AddButton}
          onPress={() => navigation.navigate("Architecture Project")}
        >
          <Text>Add Architecture Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CommonClass.AddButton}
          onPress={() => navigation.navigate("Interior Project")}
        >
          <Text>Add Interior Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CommonClass.AddButton}
          onPress={() => navigation.navigate("Employee Details")}
        >
          <Text>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CommonClass.AddButton}
          onPress={() => navigation.navigate("View Architecture Projects")}
        >
          <Text>View Architecture Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={CommonClass.AddButton}
          onPress={() => navigation.navigate("View Interior Projects")}
        >
          <Text>View Interior Projects</Text>
        </TouchableOpacity>
      </View>
      {modalVisible ? ( //checking if modalVisible is true and if yes then we load the projectModal component
        <ProjectModal
          init={{}}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSubmit={Modal1Bkcall}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default ProjectDetailsModal;