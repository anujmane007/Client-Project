// import { Button, Card, Text } from "react-native-paper";
// import { Image, TouchableOpacity, View } from "react-native"
// import { dataview } from "../styles/Dataview";
// import { AntDesign } from '@expo/vector-icons';
// import { CommonClass } from "../styles/Commonclass";
// import { createAssetAsync, createAlbumAsync } from ' ';
// import { writeAsStringAsync, documentDirectory, EncodingType } from 'expo-file-system';
// import { useState } from "react";
// import LoadingSpinner from "./LoadingSpinneer";

// export const FileCard = ({ item }) => {
//     const [done, setDone] = useState({
//         isloading: false,
//         done: false,
//         error: false
//     });
//     const DowloadFile = async () => {
//         try {
//             setDone({
//                 isloading: true,
//                 done: false,
//                 error: false
//             })
//             let fileUri = documentDirectory + item.fileName;
//             console.log(fileUri);
//             await writeAsStringAsync(fileUri, item?.value, { encoding: EncodingType.Base64 });
//             const asset = await createAssetAsync(fileUri)
//             await createAlbumAsync("Download", asset, false)
//             setDone({
//                 isloading: false,
//                 done: true,
//                 error: false
//             })
//         } catch (e) {
//             console.log(e);
//             setDone({
//                 isloading: false,
//                 done: false,
//                 error: true
//             })
//         }
//     }
//     return (
//         <Card>
//             <Card.Content>
//                 <Text variant="bodyMedium" style={CommonClass.TextWrap}>{item.fileName || "Show File"}</Text>
//                 {

//                     <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
//                         <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
//                             <Image
//                                 style={dataview.img}
//                                 source={{
//                                     uri: 'data:image/png;base64,' + item?.value,
//                                 }}
//                             />
//                             {
//                                 done.isloading
//                                     ?
//                                     <View>
//                                         <LoadingSpinner size='large' />
//                                     </View > :
//                                     <TouchableOpacity style={CommonClass.Downloadbutton} onPress={async () => await DowloadFile()}>
//                                         <AntDesign name="download" size={24} color="black" />
//                                     </TouchableOpacity>
//                             }

//                         </View>
//                         {
//                             done.error && (<View style={CommonClass.chooseFile}>
//                                 <Text>Something Went Wrong</Text>
//                             </View>)

//                         }
//                         {
//                             done.done
//                             &&
//                             (<View style={CommonClass.chooseFile}>
//                                 <Text>Downloaded Successfully !!</Text>
//                             </View>)
//                         }

//                     </View>
//                 }
//             </Card.Content>
//         </Card >
//     )
// }