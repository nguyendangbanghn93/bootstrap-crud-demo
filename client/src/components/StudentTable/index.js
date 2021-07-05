import { ButtonGroup, Button } from "react-bootstrap"
import MyTable from "../layouts/MyTable"
import { useContext } from "react"
import { StudentContext } from "../../studentContext"
import { formatDate } from "../../util/util"
const StudentTable = (props) => {
  const { showFormStudent, deleteStudent, studentState: { students } } = useContext(StudentContext)
  return (
    <MyTable
      configColumn={{
        fullname: {
          name: "Fullname"
        },
        birthday: {
          name: "Birthday",
          handler: val => formatDate(val, "{j}/{n}/{f}")
        },
        email: {
          name: "Email"
        },
        phoneNumber: {
          name: "Phone number"
        },
        action: {
          name: "Action",
          handler: (val, dataRow) => {
            return (
              <ButtonGroup>
                <Button variant="outline-warning" onClick={showFormStudent.bind(this, dataRow)}>Edit</Button>
                <Button variant="outline-danger" onClick={deleteStudent.bind(this, dataRow.id)}>Delete</Button>
              </ButtonGroup>
            )
          }
        },
        sortColumn: ["fullname", "birthday", "email", "phoneNumber", "action"]
      }}
      data={students}
    />
  )
}

export default StudentTable