import { useState, useEffect } from "react";
import "./index.css";
import { v4 as uuid } from "uuid";
import { studentApi } from "./api";

const App = () => {
    const [students, setStudents] = useState([]);
    const [firstNameValue, setFirstNameValue] = useState("");
    const [lastNameValue, setLastNameValue] = useState("");
    const [emailAddressValue, setEmailAddressValue] = useState("");
    const [classEnrolledValue, setClassEnrolledValue] = useState("ALGEBRA");

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailAddressError, setEmailAddressError] = useState(false);
    const [classEnrolledError, setClassEnrolledError] = useState(false);

    const [firstNameEditValue, setFirstNameEditValue] = useState("");
    const [lastNameEditValue, setLastNameEditValue] = useState("");
    const [emailAddressEditValue, setEmailAddressEditValue] = useState("");
    const [classEnrolledEditValue, setClassEnrolledEditValue] = useState("");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [editingStudentId, setEditingStudentId] = useState(null);
    const [deleteStudentId, setDeleteStudentId] = useState(null);

    useEffect(() => {
        studentApi
            .getAll()
            .then((response) => {
                console.log(response);
                setStudents(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addStudent = (e) => {
        e.preventDefault();

        if (firstNameValue.length <= 1) {
            setFirstNameValue(true);

            return;
        }

        if (lastNameValue.length <= 1) {
            setLastNameValue(true);

            return;
        }

        if (emailAddressValue.length <= 1) {
            setEmailAddressValue(true);

            return;
        }

        if (classEnrolledValue.length <= 1) {
            setClassEnrolledValue(true);

            return;
        }

        const newStudent = {
            id: uuid(),
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailAddressValue,
            className: classEnrolledValue
        };

        studentApi
            .create(newStudent)
            .then((response) => {
                setFirstNameValue("");
                setLastNameValue("");
                setEmailAddressValue("");
                setClassEnrolledValue("");

                setStudents((prevStudents) => [...prevStudents, response.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleFirstNameOnChange = (e) => {
        const { value } = e.target;

        setFirstNameValue(value);

        if (value.length <= 1) {
            setFirstNameError(true);
        } else {
            setFirstNameError(false);
        }
    };

    const handleLastNameOnChange = (e) => {
        const { value } = e.target;

        setLastNameValue(value);

        if (value.length <= 1) {
            setLastNameError(true);
        } else {
            setLastNameError(false);
        }
    };

    const handleEmailAddressOnChange = (e) => {
        const { value } = e.target;

        setEmailAddressValue(value);

        if (value.length <= 1) {
            setEmailAddressError(true);
        } else {
            setEmailAddressError(false);
        }
    };

    const handleClassEnrolledOnChange = (e) => {
        const { value } = e.target;

        setClassEnrolledValue(value);

        if (value.length <= 1) {
            setClassEnrolledError(true);
        } else {
            setClassEnrolledError(false);
        }
    };

    const deleteStudent = (studentId) => {
        studentApi.deleteOne(studentId);

        setStudents((prevState) => {
            const keptStudents = prevState.filter(
                (student) => student.id !== studentId
            );

            return keptStudents;
        });

        setShowDeleteModal(false);
    };

    const editStudent = (studentId) => {
        setShowEditModal(true);

        let firstName = "";
        let lastName = "";
        let emailAddress = "";
        let classEnrolled = "";

        for (const student of students) {
            if (student.id === studentId) {
                firstName = student.firstName;
                lastName = student.lastName;
                emailAddress = student.email;
                classEnrolled = student.className;
                break;
            }
        }

        setFirstNameEditValue(firstName);
        setLastNameEditValue(lastName);
        setEmailAddressEditValue(emailAddress);
        setClassEnrolledEditValue(classEnrolled);
        setEditingStudentId(studentId);
    };

    const handleFirstNameEdit = (e) => {
        setFirstNameEditValue(e.target.value);
    };

    const handleLastNameEdit = (e) => {
        setLastNameEditValue(e.target.value);
    };

    const handleEmailAddressEdit = (e) => {
        setEmailAddressEditValue(e.target.value);
    };

    const handleClassEnrolledEdit = (e) => {
        setClassEnrolledEditValue(e.target.value);
    };

    const submitEdit = () => {
        setStudents((prevState) => {
            const updatedStudents = prevState.map((student) => {
                if (student.id === editingStudentId) {
                    const copy = {
                        ...student,
                        firstName: firstNameEditValue,
                        lastName: lastNameEditValue,
                        email: emailAddressEditValue,
                        className: classEnrolledEditValue
                    };
                    studentApi.updateOne(editingStudentId, copy);
                    return copy;
                }
                return student;
            });
            return updatedStudents;
        });
        setShowEditModal(false);
    };

    return (
        <main>
            <h1>Student Enrollment Data</h1>
            <form onSubmit={addStudent}>
                <div className="form-inputs">
                    <input
                        onChange={handleFirstNameOnChange}
                        value={firstNameValue}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    {firstNameError && <span>Invalid First Name</span>}
                    <input
                        onChange={handleLastNameOnChange}
                        value={lastNameValue}
                        type="text"
                        placeholder="Last Name"
                        required
                    />
                    {lastNameError && <span>Invalid Last Name</span>}
                    <input
                        onChange={handleEmailAddressOnChange}
                        value={emailAddressValue}
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                    {emailAddressError && <span>Invalid Email Address</span>}
                    <select
                        onChange={handleClassEnrolledOnChange}
                        value={classEnrolledValue}
                        required
                    >
                        <option value="ALGEBRA">Algebra</option>
                        <option value="GEOMETRY">Geometry</option>
                        <option value="JOURNALISM">Journalism</option>
                        <option value="LITERATURE">Literature</option>
                    </select>
                    {classEnrolledError && <span>Invalid Class Name</span>}

                    <input type="submit" value="Add Student" />
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Class Enrolled</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(
                        ({ firstName, lastName, email, className, id }) => {
                            return (
                                <tr key={id}>
                                    <td>{firstName}</td>
                                    <td>{lastName}</td>
                                    <td>{email}</td>
                                    <td>{className}</td>
                                    <td className="action-buttons">
                                        <button
                                            onClick={() => {
                                                editStudent(id);
                                            }}
                                            className="edit-btn"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowDeleteModal(true);
                                                setDeleteStudentId(id);
                                            }}
                                            className="main-delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
            {showDeleteModal && (
                <div className="delete-modal">
                    <span>DELETE STUDENT</span>
                    <p>Are you sure you want to delete this student?</p>

                    <div className="confirm-buttons">
                        <button
                            onClick={() => {
                                setShowDeleteModal(false);
                                setDeleteStudentId(null);
                            }}
                            type="button"
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                deleteStudent(deleteStudentId);
                                setShowDeleteModal(false);
                                setDeleteStudentId(null);
                            }}
                            type="button"
                            className="delete-btn"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            {showEditModal && (
                <>
                    <h2>Edit The Student Information</h2>
                    <form>
                        <div className="edit-inputs">
                            <input
                                value={firstNameEditValue}
                                onChange={handleFirstNameEdit}
                            />
                            <input
                                value={lastNameEditValue}
                                onChange={handleLastNameEdit}
                            />
                            <input
                                value={emailAddressEditValue}
                                onChange={handleEmailAddressEdit}
                            />
                            <select
                                value={classEnrolledEditValue}
                                onChange={handleClassEnrolledEdit}
                            >
                                <option value="ALGEBRA">Algebra</option>
                                <option value="GEOMETRY">Geometry</option>
                                <option value="JOURNALISM">Journalism</option>
                                <option value="LITERATURE">Literature</option>
                            </select>
                            <div className="edit-buttons"></div>
                            <button
                                className="edit-cancel-btn"
                                onClick={() => {
                                    setShowEditModal(false);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="edit-update-btn"
                                onClick={submitEdit}
                            >
                                Update Student
                            </button>
                        </div>
                    </form>
                </>
            )}
        </main>
    );
};

export default App;
