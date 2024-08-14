import { dataview } from "../styles/Dataview";
import { View, Text, Button, Dimensions, SafeAreaView, ScrollView } from "react-native";
import { TableList } from "../GenericComponent/CardList";
import { CommonClass } from "../styles/Commonclass";
import { BodyList } from "../GenericComponent/BodyList";
import { NODATA } from "../helper/extrapropertise";

export const ProjectDetailView = ({ item, navigation }) => {
    const screenHeight = Dimensions.get('window').height
    return (
        <SafeAreaView>
            <BodyList
                body={
                    <View style={{ height: screenHeight }}>
                        <ScrollView >
                            <View style={CommonClass.View}>
                                {
                                    Object.entries(item).map(([key, value]) => {
                                        if (!(key == "_id" || key == "__v" || value instanceof Array || value instanceof Object)) {
                                            return (
                                                <TableList name={key} key={key} value={value || NODATA} />
                                            )
                                        } else if (value instanceof Array
                                        ) {
                                            return (
                                                <TableList
                                                    name={key}
                                                    value={
                                                        <Button title="showFiles" onPress={() =>
                                                            navigation.navigate('showFilesTable', {
                                                                key: key,
                                                                value: value
                                                            })
                                                        } />
                                                    }
                                                />
                                            )
                                        } else if (value instanceof Object) {
                                            return (
                                                <TableList
                                                    name={key}
                                                    value={
                                                        <Button title="showFiles" onPress={() =>
                                                            navigation.navigate('showFilesTable', {
                                                                key: key,
                                                                value: [value]
                                                            })
                                                        } />
                                                    }
                                                />
                                            )
                                        }
                                    })
                                }
                            </View>
                        </ScrollView>
                    </View>
                }
                label={"Detail"}
            />
        </SafeAreaView>
    )
}