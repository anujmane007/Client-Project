// import { Button, SafeAreaView, ScrollView, View } from "react-native";
// import { CommonClass } from "../styles/Commonclass";
// import { dataview } from "../styles/Dataview";
// import { JPG_CONTENT_TYPE, PNG_CONTENT_TYPE } from "../helper/extrapropertise";
// import { Card, Text } from "react-native-paper";
// import { BodyList } from "./BodyList";
// import { FileCard } from "./FileCard";

// const ResponsiveCard = ({ item }) => {
//     return (
//         <View >
//             <FileCard
//                 item={item}
//             />
//         </View>
//     )
// }

// export const ShowTableFiles = ({ route, navigation }) => {
//     const { key, value } = route?.params;
//     if (value.length === 0) {
//         return <Text style={CommonClass.chooseFile}>No Files</Text>
//     }
//     return (
//         <BodyList
//             key={key}
//             body={
//                 <ScrollView>
//                     <View style={CommonClass.table}>
//                         {
//                             value.map((item, index) => <ResponsiveCard key={index} item={item} />)
//                         }
//                     </View>
//                 </ScrollView>
//             }
//             label={key}
//         />
//     )
// }