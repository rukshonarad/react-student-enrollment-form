import React, { useState, useEffect } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";
import { studentApi } from "./api";

const AppFunction = () => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [className, setClassName] = useState("");
    const [inputError, setInputError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        studentApi
            .getAll()
            .then((response) => {
                setStudents(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const addStudent = (e) => {
        e.preventDefault();
        if (
            firstName.length <= 1 ||
            lastName.length <= 1 ||
            email.length <= 1 ||
            className.length <= 1
        ) {
            setInputError(true);
            return;
        }
        const newStudent = {
            id: uuid(),
            firstName,
            lastName,
            email,
            className
        };

        setStudents([...students, newStudent]);
        setFirstName("");
        setLastName("");
        setEmail("");
        setClassName("");
        setInputError(false);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "className":
                setClassName(value);
                break;
            default:
                break;
        }
    };

    const deleteStudent = (studentId) => {
        const keptStudents = students.filter(
            (student) => student.id !== studentId
        );
        setStudents(keptStudents);
        setShowModal(false);
    };

    const editStudent = (studentId) => {
        const selectedStudent = students.find(
            (student) => student.id === studentId
        );
        setShowModal(true);
        setSelectedStudent(selectedStudent);
    };

    const submitEdit = () => {
        const updatedStudents = students.map((student) => {
            if (student.id === selectedStudent.id) {
                return {
                    ...student,
                    firstName,
                    lastName,
                    email,
                    className
                };
            }
            return student;
        });
        setStudents(updatedStudents);
        setShowModal(false);
    };

    return (
        <main>
            <h1>Student Enrollment Form</h1>
            <form onSubmit={addStudent}>
                <input
                    onChange={handleOnChange}
                    value={firstName}
                    type="text"
                    name="firstName"
                    placeholder="First name"
                />
                <br />
                <br />
                <input
                    onChange={handleOnChange}
                    value={lastName}
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                />
                <br />
                <br />
                <input
                    onChange={handleOnChange}
                    value={email}
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <br />
                <br />
                <select
                    name="className"
                    value={className}
                    onChange={handleOnChange}
                >
                    <option value="">Select Class</option>
                    <option value="Algebra">Algebra</option>
                    <option value="Geometry">Geometry</option>
                    <option value="Journalism">Journalism</option>
                    <option value="Literature">Literature</option>
                </select>
                <br />
                <br />
                <input type="submit" value="Add Student" />
                {inputError && <span>Please fill all fields</span>}
            </form>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.firstName}</td>
                            <td>{student.lastName}</td>
                            <td>{student.email}</td>
                            <td>{student.className}</td>
                            <td>
                                <button
                                    onClick={() => deleteStudent(student.id)}
                                >
                                    Delete
                                </button>
                                <button onClick={() => editStudent(student.id)}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <div className="modal">
                    <div>
                        <input
                            value={firstName}
                            onChange={handleOnChange}
                            type="text"
                            name="firstName"
                            placeholder="firstName"
                        />
                        <input
                            value={lastName}
                            onChange={handleOnChange}
                            type="text"
                            name="lastName"
                            placeholder="lastName"
                        />
                        <input
                            value={email}
                            onChange={handleOnChange}
                            type="text"
                            name="email"
                            placeholder="email"
                        />
                        <input
                            value={className}
                            onChange={handleOnChange}
                            type="text"
                            name="className"
                            placeholder="classtName"
                        />
                        <button type="button" onClick={submitEdit}>
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
};

export default AppFunction;
