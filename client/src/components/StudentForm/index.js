import "./style.css";
import { Form, Button } from "react-bootstrap";
import Modal from "../layouts/Modal";
import { useContext, useEffect, useMemo } from "react";
import { StudentContext } from "../../studentContext";
import useInput from "../../hooks/useInput";
const StudentForm = (props) => {
    const isNotNull = (value) => (value || "").trim() !== "";
    const isEmail = (value) => {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(value).toLowerCase());
    };
    const isPhoneNumber = (value) => {
        const re =
            /^((09[0-9]{8})|(08([1-9])[0-9]{7})|(01(2|6|8|9)[0-9]{8})|(069[2-9][0-9]{4,5})|(080(4|31|511|8)[0-9]{4})|(0([2-8])[0-9]{1,2}[0-9]{1,3}[0-9]{5}))$/;
        return re.test(String(value).toLowerCase());
    };

    const {
        value: enteredFullname,
        isValid: fullnameIsValid,
        hasError: fullnameHasError,
        valueChangeHandler: fullnameChangeHandler,
        inputBlurHandler: fullnameBlurHandler,
        setDefaultValue: setFullname,
    } = useInput(isNotNull);
    const {
        value: enteredBirthday,
        isValid: birthdayIsValid,
        hasError: birthdayHasError,
        valueChangeHandler: birthdayChangeHandler,
        inputBlurHandler: birthdayBlurHandler,
        setDefaultValue: setBirthday,
    } = useInput(isNotNull);
    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
        setDefaultValue: setEmail,
    } = useInput(isEmail);
    const {
        value: enteredPhoneNumber,
        isValid: phoneNumberIsValid,
        hasError: phoneNumberHasError,
        valueChangeHandler: phoneNumberChangeHandler,
        inputBlurHandler: phoneNumberBlurHandler,
        setDefaultValue: setPhoneNumber,
    } = useInput(isPhoneNumber);

    let buttonName = "Add",
        title = "Create student",
        isEdit = false;

    const {
        closeFormStudent,
        createStudent,
        updateStudent,
        studentState: { dataFormStudent },
    } = useContext(StudentContext);
    if (dataFormStudent) {
        buttonName = "Update";
        title = "Update student";
        isEdit = true;
    }
    useEffect(() => {
        if (dataFormStudent) {
            let data = { ...dataFormStudent };
            if (data.birthday) {
                data.birthday = data.birthday.split("/").reverse().join("-");
            }
            setEmail(data.email);
            setFullname(data.fullname);
            setBirthday(data.birthday);
            setPhoneNumber(data.phoneNumber);
        }
    }, [dataFormStudent, setEmail, setFullname, setBirthday, setPhoneNumber]);
    const submitIsValid = useMemo(
        () =>
            fullnameIsValid && birthdayIsValid && emailIsValid && phoneNumberIsValid,
        [fullnameIsValid, birthdayIsValid, emailIsValid, phoneNumberIsValid]
    );
    const submitHandler = () => {
        if (!submitIsValid) return;
        const student = {...dataFormStudent, fullname: enteredFullname, birthday: enteredBirthday, email: enteredEmail, phoneNumber: enteredPhoneNumber }
        if (isEdit) {
            updateStudent(student)
        } else {
            createStudent(student)
        }
    };

    return (
        <Modal clickOverlayHandler={closeFormStudent} title={title}>
            <Form style={{ minWidth: "350px" }} onSubmit={submitHandler}>

                <Form.Group className="mb-3">
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control
                        type="fullname"
                        placeholder="Enter fullname"
                        onChange={fullnameChangeHandler}
                        onBlur={fullnameBlurHandler}
                        value={enteredFullname}
                    />
                    {fullnameHasError && (
                        <Form.Text className="text-danger">
                            Fullname cannot be empty
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Enter birthday"
                        onChange={birthdayChangeHandler}
                        onBlur={birthdayBlurHandler}
                        value={enteredBirthday}
                    />
                    {birthdayHasError && (
                        <Form.Text className="text-danger">
                            Birthday cannot be empty
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={emailChangeHandler}
                        onBlur={emailBlurHandler}
                        value={enteredEmail}
                    />
                    {emailHasError && (
                        <Form.Text className="text-danger">Email invalidate</Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Phone number"
                        onChange={phoneNumberChangeHandler}
                        onBlur={phoneNumberBlurHandler}
                        value={enteredPhoneNumber}
                    />
                    {phoneNumberHasError && (
                        <Form.Text className="text-danger">
                            Phone number invalidate
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="tar">
                    <Button
                        onClick={submitHandler}
                        variant="outline-primary"
                        disabled={!submitIsValid}
                    >
                        {buttonName}
                    </Button>
                    <Button
                        onClick={closeFormStudent}
                        variant="outline-secondary"
                        className="ml10"
                    >
                        Close
                    </Button>
                </Form.Group>

            </Form>
        </Modal>
    );
};

export default StudentForm;
