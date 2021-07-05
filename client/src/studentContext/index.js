import { createContext, useEffect, useReducer } from "react";
import { CREATE_STUDENT, UPDATE_STUDENT, DELETE_STUDENT, LIST_STUDENT, SHOW_FORM_STUDENT, API_URL } from "./constants";
import useHttp from "../hooks/useHttp";
const studentReducer = (state, action) => {
    const { type, payload: {
        isShowFormStudent,
        dataFormStudent,
        student,
        students
    } } = action;
    // console.log('action',dataFormStudent);
    switch (type) {
        case CREATE_STUDENT:
            return { ...state, isShowFormStudent, students: [...state.students, student] }
        case UPDATE_STUDENT:
        case DELETE_STUDENT:
            return { ...state, isShowFormStudent, students }
        case LIST_STUDENT:
            return { ...state, students }
        case SHOW_FORM_STUDENT:
            return { ...state, isShowFormStudent, dataFormStudent }
        default:
            return { ...state };
    }
}
export const StudentContext = createContext();

const initialState = {
    showFormStudent: false,
    dataFormStudent: null,
    students: [],
    isShowFormStudent: false
};
const StudentContextProvider = ({ children }) => {

    const [studentState, dispatch] = useReducer(studentReducer, initialState);
    const { sendRequest } = useHttp();
    const createStudent = (student) => {
        sendRequest({
            url: `${API_URL}/`,
            method: 'POST',
            body: student
        }, data => {
            dispatch({
                type: CREATE_STUDENT,
                payload: { isShowFormStudent: false, student: data.student }
            })
        })
    }
    const updateStudent = (student) => {
        sendRequest({
            url: `${API_URL}/${student._id}`,
            method: 'PUT',
            body: student
        }, data => {
            const newDataStudents = studentState.students.map((student) => {
                if (student._id === data.student._id) {
                    student = data.student;
                }
                return student;
            });
            dispatch({
                type: UPDATE_STUDENT,
                payload: { isShowFormStudent: false, students: newDataStudents }
            })
        })
    }
    const deleteStudent = (id) => {
        sendRequest({
            url: `${API_URL}/${id}`,
            method: 'DELETE',
        }, data => {
            const newDataStudents = studentState.students.filter((student) => {
                return student._id !== id
            });
            dispatch({
                type: DELETE_STUDENT,
                payload: { isShowFormStudent: false, students: newDataStudents }
            })
        })
    }
    const showFormStudent = data => {
        dispatch({
            type: SHOW_FORM_STUDENT,
            payload: { isShowFormStudent: true, dataFormStudent: data }
        })
    }
    const closeFormStudent = () => {
        dispatch({
            type: SHOW_FORM_STUDENT,
            payload: { isShowFormStudent: false }
        })
    }
    const loadStudent = () => {
        sendRequest({ url: `${API_URL}/` }, data => {
            data.students.map((student) => {
                return student;
            })
            dispatch({
                type: LIST_STUDENT,
                payload: { isShowFormStudent: false, students: data.students }
            })
        })
    }
    useEffect(() => {
        loadStudent();
    }, [])
    const studentContextData = { studentState, showFormStudent, closeFormStudent, createStudent, updateStudent, deleteStudent }
    return (
        <StudentContext.Provider value={studentContextData}>
            {children}
        </StudentContext.Provider>
    )
}
export default StudentContextProvider;
