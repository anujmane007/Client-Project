import * as React from 'react';
import { dataview } from '../styles/Dataview';
import { Image, View, Text } from 'react-native';
import { PDF_CONTENT_TYPE } from '../helper/extrapropertise';

const ModallImageView = ({ title, src, ContentType }) => {
    console.log("Inside modal image view ",title,src,ContentType);
    return (
        <View style={{ margin: "0 auto" }}>
            <Text numberOfLines={1}>{title}</Text>
            {
                src && ContentType === PDF_CONTENT_TYPE
                    ? <Text style={{ textAlign: 'center', backgroundColor: '#DDDDDD', padding: 5 }}>PDF Not Visible</Text>
                    : src ? <Image
                        style={dataview.img}
                        source={{
                            uri: 'data:image/png;base64,' + src,
                        }}
                    /> : <Text style={{ textAlign: 'center', backgroundColor: '#DDDDDD', padding: 5 }}>No Selected File</Text>}
        </View>
    )
}

export default ModallImageView;