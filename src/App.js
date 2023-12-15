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
            inputError: false
        };
    }

    addStudent = (e) => {
        e.preventDefault();

        if (
            this.state.firstName.length === 0 ||
            this.state.lastName.length === 0 ||
            this.state.email.length === 0 ||
            this.state.className.length === 0
        ) {
            this.setState({
                inputError: true
            });
            return;
        }

        const newStudent = {
            id: uuid(),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            className: this.state.className
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
        const updatedStudents = this.state.students.filter(
            (student) => student.id !== id
        );
        this.setState({
            students: updatedStudents
        });
    };

    render() {
        return (
            <main>
                <h1>Students Enrollment Form</h1>
                <form onSubmit={this.addStudent}>
                    <input
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <input
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <input
                        placeholder="Email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <input
                        placeholder="Class"
                        type="text"
                        name="className"
                        value={this.state.className}
                        onChange={this.handleInputChange}
                    />
                    <br />
                    <br />
                    <input type="submit" value="Add Student" />
                    {this.state.inputError && <p>Please fill in all fields.</p>}
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Class</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.students.map((student) => (
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        );
    }
}

export default App;
