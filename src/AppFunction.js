import React from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

const AppFunction = () => {
    const [students, setStudents] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [className, setClassName] = useState("");
    const [inputError, setInputError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
};
