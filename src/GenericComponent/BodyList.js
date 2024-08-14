import { SafeAreaView, View } from "react-native"
import { Text } from 'react-native-paper';
import { dataview } from "../styles/Dataview";

export const BodyList = ({ label, body }) => {
    return (
            <View>
                <Text style={dataview.textStyle} variant="bodyMedium">{label}</Text>
                <View>
                    {body}
                </View>
            </View>
    )
}