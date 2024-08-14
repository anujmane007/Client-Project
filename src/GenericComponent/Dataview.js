import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinneer";
// import { TextInput, View, Text, Button } from "react-native-web";
import { Text, TextInput, View, Button } from "react-native";
import { ScrollView } from "react-native";
import { dataview } from "../styles/Dataview";

function DataView({
  queryFunction,
  queryKey,
  getSearchableValue,
  Card,
  DetailedElement,
  newDataButton,
  dataviewTitle,
  navigation,
}) {
  console.log(
    "Inside dataview ",
    queryFunction,
    "key ",
    queryKey,
    "searchable value ",
    getSearchableValue,
    " CArd ",
    Card,
    "DetailedElement",
    DetailedElement,
    " newDataButton",
    newDataButton,
    " navigation",
    navigation
  );
  console.log("The value of new data button is ", newDataButton);

  const [searchString, setSearchString] = useState("");
  const [selectedItem, setSelectedItem] = useState(undefined);

  var { data, isError, isLoading, error } = useQuery({
    queryKey: queryKey,
    queryFn: async () => await queryFunction(),
  });
  console.log("the value of query key is ", data, isError, isLoading);

  if (data && searchString !== "") {
    console.log("Inside data && searchString  ", searchString);
    data = data.filter((current) => {
      var valueToSearchIn = getSearchableValue(current).toLowerCase();
      console.log("getSearchableValue", getSearchableValue);
      console.log("valuleToSearch", valueToSearchIn);
      var valueToSearch = searchString.toLowerCase();
      console.log("Value to search ", valueToSearch);
      return valueToSearchIn.includes(valueToSearch);
    });
  }
  if (selectedItem && DetailedElement) {
    console.log(
      "Inside selectItem and Detailed element ",
      selectedItem,
      DetailedElement
    );
    return (
      <DetailedElement
        item={selectedItem}
        setSelectedItem={setSelectedItem}
        navigation={navigation}
      />
    );
  }

  if (isLoading) {
    console.log("Inside loading ");
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <LoadingSpinner />
      </View>
    );
  }

  if (isError) {
    console.log("Inside isError");
    return (
      <View>
        <View role="alert">
          <Text>Something Went Wrong</Text>
        </View>
      </View>
    );
  }

  if (data) {
    console.log("inside if data last ");
    return (
      <View style={{ padding: 10 }}>
        <View style={dataview.stickyInput}>
          <TextInput
            style={dataview.input}
            onChangeText={(e) => setSearchString(e)}
            placeholder="Search"
          />
          {newDataButton ? (
            <View style={dataview.textStyle}>
              <Text>{newDataButton}</Text>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <ScrollView>
          <View style={dataview.heightAndOverflow}>
            <View>
              {data && data.length === 0 ? (
                <View style={dataview.card}>
                  <Text style={dataview.textStyle}>No Data To Display</Text>
                </View>
              ) : (
                <View>
                  {data?.map((item, index) => (
                    <View style={dataview.cardContainer} key={index}>
                      <Card
                        item={item}
                        navigation={navigation}
                        setSelectedItem={setSelectedItem}
                      ></Card>
                    </View>
                  ))}
                  <Text>End</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DataView;
