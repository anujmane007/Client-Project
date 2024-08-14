import { View, Text } from "react-native-web"
import { dataview } from "../styles/Dataview"
import { CommonClass } from "../styles/Commonclass"
import { INVALID_DATE, NODATA } from "../helper/extrapropertise"
import { DataTable } from 'react-native-paper';
import { getDateString } from "../helper/helper";


export const TableList = ({ name, value }) => {
    let out = getDateString(parseInt(value));
    let cellValue = out === INVALID_DATE ? value : out
    return (
        <DataTable.Row>
            <DataTable.Cell >{name}</DataTable.Cell>
            <DataTable.Cell > {cellValue || NODATA}</DataTable.Cell>
        </DataTable.Row>
    )
}