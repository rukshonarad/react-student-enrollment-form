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
    handleOnChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };
    deleteStudent = (studentId) => {
        this.setState((prevState) => {
            const keptStudents = prevState.students.filter(
                (student) => student.id !== studentId
            );
            return {
                students: keptStudents,
                showModal: false
            };
        });
    };
    editStudent = (studentId) => {
        const selectedStudent = this.state.students.find(
            (student) => student.id === studentId
        );
        this.setState({
            showModal: true,
            selectedStudent
        });
    };
    submitEdit = () => {
        const { selectedStudent, firstName, lastName, email, className } =
            this.state;
        this.setState((prevState) => {
            const updatedStudents = prevState.students.map((student) => {
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
            return {
                students: updatedStudents,
                showModal: false
            };
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
                <h1>Student Enrollment Form</h1>
                <form onSubmit={this.addStudent}>
                    <input
                        onChange={this.handleOnChange}
                        value={this.state.firstName}
                        type="text"
                        name="firstName"
                        placeholder="First name"
                    />
                    <br />
                    <br />
                    <input
                        onChange={this.handleOnChange}
                        value={this.state.lastName}
                        type="text"
                        name="lastName"
                        placeholder="Last name"
                    />
                    <br />
                    <br />
                    <input
                        onChange={this.handleOnChange}
                        value={this.state.email}
                        type="email"
                        name="email"
                        placeholder="Email"
                    />
                    <br />
                    <br />
                    <select
                        name="className"
                        value={className}
                        onChange={this.handleOnChange}
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
                    {this.state.inputError && (
                        <span>Please fill all fields</span>
                    )}
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
                                        onClick={() =>
                                            this.editStudent(student.id)
                                        }
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
                        <h2>Edit Student</h2>
                        <div>
                            <input
                                value={firstName}
                                onChange={this.handleOnChange}
                                type="text"
                                name="firstName"
                                placeholder="firstName"
                            />
                            <br />
                            <br />
                            <input
                                value={lastName}
                                onChange={this.handleOnChange}
                                type="text"
                                name="lastName"
                                placeholder="lastName"
                            />
                            <br />
                            <br />
                            <input
                                value={email}
                                onChange={this.handleOnChange}
                                type="email"
                                name="email"
                                placeholder="email"
                            />
                            <br />
                            <br />
                            <select
                                name="className"
                                value={className}
                                onChange={this.handleOnChange}
                            >
                                <option value="">Select Class</option>
                                <option value="Algebra">Algebra</option>
                                <option value="Geometry">Geometry</option>
                                <option value="Journalism">Journalism</option>
                                <option value="Literature">Literature</option>
                            </select>
                            <br />
                            <br />
                            <input
                                value={className}
                                onChange={this.handleOnChange}
                                type="text"
                                name="className"
                                placeholder="Class name"
                            />
                            <br />
                            <br />
                            <button type="button" onClick={this.submitEdit}>
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() =>
                                    this.setState({ showModal: false })
                                }
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </main>
        );
    }
}
export default App;
