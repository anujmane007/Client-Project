import {
  UPDATE_ON_ACCOUNT,
  endpoints,
  endpoints2,
} from "../Endpoints/endpoints";
import { NODATA } from "../helper/extrapropertise";
import DataView from "../GenericComponent/Dataview";
import {
  Button,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { ProjectDetailView } from "./ProjectDetailView";
import { Card, Text } from "react-native-paper";
import { ProjectModal } from "../GenericComponent/ProjectModal";
import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../GenericComponent/LoadingSpinneer";
import { useQueryClient } from "@tanstack/react-query";
import { CommonClass } from "../styles/Commonclass";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export const InteriorProjects = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log("projects=====>", projects);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://43.205.14.45:3001/interior");
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const items = await response.json();
      console.log(items);
      setProjects(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const ResponsiveCard = ({ item }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const queryClient = useQueryClient();
    const [status, setStatus] = useState({
      isloading: false,
      error: undefined,
      isSuccess: false,
    });

    const updateItem = async (state) => {
      try {
        await endpoints.Account.update(state, { _id: state._id });
        return state._id;
      } catch (e) {
        return Promise.reject(e.message);
      }
    };
    const deleteItem = async (item) => {
      console.log("Attempting to delete project with ID:", item._id);
      try {
        setStatus({
          isloading: true,
          error: undefined,
          isSuccess: false,
        });
    
        // Ensure the correct endpoint and method are used
        const response = await fetch(`http://43.205.14.45:3001/interior/${item._id}`, {
          method: 'DELETE',
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        setStatus({
          isloading: false,
          error: undefined,
          isSuccess: true,
        });
    
        // Invalidate cache with correct key
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(UPDATE_ON_ACCOUNT),
        });
    
        // Refresh the list after deletion
        await fetchData();
      } catch (e) {
        console.error("Error during delete operation:", e);
        setStatus({
          isloading: false,
          error: e.message || "An unexpected error occurred",
          isSuccess: false,
        });
      }
    };
    

    // const deleteItem = async (item) => {
    //   console.log("Attempting to delete project with ID:", item);
    //   try {
    //     setStatus({
    //       isloading: true,
    //       error: undefined,
    //       isSuccess: false,
    //     });

    //     // Assuming `projects.id` is a valid ID and no body is needed for DELETE
    //     await endpoints.Account.delete(null, item._id);

    //     setStatus({
    //       isloading: false,
    //       error: undefined,
    //       isSuccess: true,
    //     });

    //     // Invalidate cache with correct key
    //     queryClient.invalidateQueries({
    //       predicate: (query) => query.queryKey.includes(UPDATE_ON_ACCOUNT),
    //     });
    //   } catch (e) {
    //     console.error('Error during delete operation:', e);
    //     setStatus({
    //       isloading: false,
    //       error: e.message || 'An unexpected error occurred',
    //       isSuccess: false,
    //     });
    //   }
    // };

    return (
      <Card style={{ width: "100%", padding: 5 }}>
        <Card.Content>
          <Text style={{ fontSize: 18 }}>Title: {item.title || NODATA}</Text>
          <Text style={{ fontSize: 18 }}>
            ClientName: {item.clientName || NODATA}
          </Text>
          {/* {modalVisible ? (
          <ProjectModal
            init={item}
            onSubmit={updateItem}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        ) : (
          <Text>inside project tab why this project {modalVisible}</Text>
        )} */}
        </Card.Content>

        {status.isloading ? (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <LoadingSpinner />
          </View>
        ) : status.isSuccess ? (
          <View>
            <Text>Deleted Successfully !!</Text>
          </View>
        ) : (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={CommonClass.AddButton}
              onPress={() =>
                navigation.navigate("InteriorDetails", { id: item._id })
              }
            >
              <MaterialCommunityIcons
                name="account-details"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={CommonClass.AddButton}
              onPress={() => updateItem(item, { id: item._id })}
            >
              <AntDesign name="edit" size={24} color="black" />
            </TouchableOpacity> */}
            <TouchableOpacity
              style={CommonClass.AddButton}
              onPress={async () => await deleteItem(item)}
            >
              <AntDesign name="delete" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ResponsiveCard item={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </SafeAreaView>
  );
};
