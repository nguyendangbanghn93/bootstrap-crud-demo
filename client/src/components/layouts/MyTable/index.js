import "./style.css"
import { Table, Button, ButtonGroup } from "react-bootstrap";

const MyTable = (props) => {
    const options = {
        configColumn: {
            "column_1": {
                name: "Column 1"
            },
            "column_2": {
                name: "Column 2"
            },
            "column_3": {
                name: "Column 3"
            },
            "action": {
                name: "Action",
                handler: (val,dataRow) => {
                    return (
                        <ButtonGroup>
                            <Button variant="outline-warning">Edit</Button>
                            <Button variant="outline-danger">Delete</Button>
                        </ButtonGroup>
                    )
                }
            },
            sortColumn: ["column_1", "column_2", "column_3", "action"]
        },
        serial: {
            name: "STT"
        },
        data: [
            { "column_1": "Value 1_1", "column_2": "Value 1_2", "column_3": "Value 1_3" },
            { "column_1": "Value 2_1", "column_2": "Value 2_2", "column_3": "Value 2_3" },
            { "column_1": "Value 3_1", "column_2": "Value 3_2", "column_3": "Value 3_3" },
        ]
        , ...props
    };
    const sortColumn = options.serial ? ["#", ...options.configColumn.sortColumn] : [...options.configColumn.sortColumn];
    
    const data = [...options.data];
    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>{sortColumn.map((key, index) => {
                    if (key === "#") {
                        return <th key={index}>{options.serial.name}</th>
                    }
                    return <th key={index}>{options.configColumn[key]&&options.configColumn[key].name}</th>
                })}</tr>
            </thead>
            <tbody>
                {data.map((dataRow, index) => {
                    return (
                        <tr key={index}>
                            {sortColumn.map((key) => {
                                const config = options.configColumn[key];
                                if (key === "#") {
                                    return <td key={key}>{index + 1}</td>
                                } else if (config && typeof config.handler === "function") {
                                    return <td key={key}>{config.handler(dataRow[key], dataRow)}</td>
                                }
                                return <td key={key}>{dataRow[key]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default MyTable