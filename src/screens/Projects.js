import { UPDATE_ON_ACCOUNT, endpoints } from "../Endpoints/endpoints";
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
import { Card, Text } from "react-native-paper";
import { useState, useEffect, useCallback } from "react";
import LoadingSpinner from "../GenericComponent/LoadingSpinneer";
import { useQueryClient } from "@tanstack/react-query";
import { CommonClass } from "../styles/Commonclass";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

export const Projects = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://43.205.14.45:3001/projects");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const items = await response.json();
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
      isLoading: false,
      error: undefined,
      isSuccess: false,
    });
    
    const successMessage = "Project deleted successfully";

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
          isLoading: true,
          error: undefined,
          isSuccess: false,
        });

        const response = await fetch(`http://43.205.14.45:3001/projects/${item._id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        setStatus({
          isLoading: false,
          error: undefined,
          isSuccess: true,
        });

        // Invalidate cache with the correct key
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey.includes(UPDATE_ON_ACCOUNT),
        });

        // Refresh the list after deletion
        await fetchData();
      } catch (e) {
        console.error("Error during delete operation:", e);
        setStatus({
          isLoading: false,
          error: e.message || "An unexpected error occurred",
          isSuccess: false,
        });
      }
    };

    return (
      <Card style={{ width: "100%", padding: 5 }}>
        <Card.Content>
          <Text style={{ fontSize: 18  }}>
            Title: {item.title || NODATA}
          </Text>
          <Text style={{ fontSize: 18  }}>
            ClientName: {item.clientName || NODATA}
          </Text>
        </Card.Content>

        {status.isLoading ? (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <LoadingSpinner />
          </View>
        ) : status.isSuccess ? (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, color: "green" }}>{successMessage}</Text>
          </View>
        ) : status.error ? (
          <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Text style={{ color: "red" }}>{status.error}</Text>
          </View>
        ) : (
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: 10 }}>
            <TouchableOpacity
              style={CommonClass.AddButton}
              onPress={() => navigation.navigate("Details", { id: item._id })}
            >
              <MaterialCommunityIcons name="account-details" size={24} color="black" />
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={CommonClass.AddButton}
              onPress={() => setModalVisible(true)}
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
