import { UPDATE_ON_USER, endpoints } from "../Endpoints/endpoints"
import { users } from "../helper/extrapropertise"
import DataView from "../GenericComponent/Dataview"
// import { SafeAreaView, View, Text } from "react-native-web"
import { Text } from "react-native-paper"
import { Card } from "react-native-paper"

const ResponsiveCard = ({ item }) => {
    console.log("Inside responsive card");
    return (
        <Card style = {{width:"100%"}}>
            <Card.Content>
                <Text variant="bodyMedium"> Name of Employee         : {item.name}</Text>
                <Text variant="bodyMedium"> Email Id of Employee     : {item.email}</Text>
                <Text variant="bodyMedium"> Address of Employee      : {item.address}</Text>
                <Text variant="bodyMedium"> DOB of Employee      : {item.dob}</Text>
    
            </Card.Content>
        </Card>
    )
}

export const Users = ({ navigation }) => {
    console.log("Inside users function card");
    const queryKey = [UPDATE_ON_USER]
    //query key =UpdateOnUser

    console.log("printing queryKey",queryKey);

    //Not called until its invoked
    const queryFunction = async () => {
        var data = await endpoints.Users.getAll()
        //endpoints:object which contains three key value pair and has user which calls class called CRUDMethods   //Users  Users: new CRUDMethods(USER_ENDPOINT),  //getAll() This is inbuilt method in that class
        console.log("The value of data is ",data);
        return data
    }
    const getValueToSearch = (current) => {
        return (
            current.name || ""
        )
    }

    return (
            <DataView
                queryFunction={queryFunction}
                queryKey={queryKey}
                getSearchableValue={getValueToSearch}
                Card={ResponsiveCard}
                dataviewTitle={"Users"}
                navigation={navigation}
            />
    )

}