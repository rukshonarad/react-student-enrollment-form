import React from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            students: [],
            firstName: "",
            lastName: "",
            email: "",
            className: "",
            inputError: false,
            showModal: false,
            selectedStudent: null
        };
    }

    addStudent = (e) => {
        e.preventDefault();

        const { firstName, lastName, email, className } = this.state;

        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            className === ""
        ) {
            this.setState({
                inputError: true
            });
            return;
        }

        const newStudent = {
            id: uuid(),
            firstName,
            lastName,
            email,
            className
        };

        this.setState((prevState) => ({
            students: [...prevState.students, newStudent],
            firstName: "",
            lastName: "",
            email: "",
            className: "",
            inputError: false
        }));
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };

    deleteStudent = (id) => {
        this.setState((prevState) => ({
            students: prevState.students.filter((student) => student.id !== id),
            showModal: false
        }));
    };

    openModal = (student) => {
        this.setState({
            showModal: true,
            selectedStudent: student
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
            selectedStudent: null
        });
    };

    updateStudent = () => {
        const { selectedStudent, students } = this.state;

        const updatedStudents = students.map((student) =>
            student.id === selectedStudent.id ? selectedStudent : student
        );

        this.setState({
            students: updatedStudents,
            showModal: false,
            selectedStudent: null
        });
    };

    render() {
        const {
            students,
            firstName,
            lastName,
            email,
            className,
            inputError,
            showModal,
            selectedStudent
        } = this.state;

        return (
            <main>
                <h1>Students Enrollment Form</h1>
                <form onSubmit={this.addStudent}>
                    <input
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <input
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <select
                        name="className"
                        value={className}
                        onChange={this.handleInputChange}
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
                    {inputError && <p>Please fill in all fields.</p>}
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
                                        onClick={() =>
                                            this.deleteStudent(student.id)
                                        }
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => this.openModal(student)}
                                    >
                                        Edit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={this.closeModal}>
                                &times;
                            </span>
                            <h2>Edit Student</h2>
                            {selectedStudent && (
                                <form onSubmit={this.updateStudent}>
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        name="firstName"
                                        value={selectedStudent.firstName}
                                        onChange={(e) =>
                                            this.setState({
                                                selectedStudent: {
                                                    ...selectedStudent,
                                                    firstName: e.target.value
                                                }
                                            })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        name="lastName"
                                        value={selectedStudent.lastName}
                                        onChange={(e) =>
                                            this.setState({
                                                selectedStudent: {
                                                    ...selectedStudent,
                                                    lastName: e.target.value
                                                }
                                            })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={selectedStudent.email}
                                        onChange={(e) =>
                                            this.setState({
                                                selectedStudent: {
                                                    ...selectedStudent,
                                                    email: e.target.value
                                                }
                                            })
                                        }
                                    />
                                    <br />
                                    <br />
                                    <select
                                        name="className"
                                        value={selectedStudent.className}
                                        onChange={(e) =>
                                            this.setState({
                                                selectedStudent: {
                                                    ...selectedStudent,
                                                    className: e.target.value
                                                }
                                            })
                                        }
                                    >
                                        <option value="">Select Class</option>
                                        <option value="Algebra">Algebra</option>
                                        <option value="Geometry">
                                            Geometry
                                        </option>
                                        <option value="Journalism">
                                            Journalism
                                        </option>
                                        <option value="Literature">
                                            Literature
                                        </option>
                                    </select>
                                    <br />
                                    <br />
                                    <input type="submit" value="Update" />
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </main>
        );
    }
}

export default App;
