
import { useContext } from 'react';
import { Button, Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import { StudentContext } from './studentContext';
function App() {
  const {
    studentState: { isShowFormStudent, students },
    showFormStudent
  } = useContext(StudentContext)
  return (
    <>
      {isShowFormStudent && <StudentForm />}
      <Navbar bg="primary" variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="/">Student manager</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link onClick={showFormStudent.bind(this, null)}>Create</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Container>
      </Navbar>
      <Container>
        <StudentTable data={students} />
      </Container>
    </>
  );
}

export default App;
