import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";

export default function AddStudent() {
    const navigate = useNavigate();
    const [rollNo, setRollNo] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [selectedClass, setSelectedClass] = useState("");


    const classList = [
        { classId: "C1", className: "Class 1" },
        { classId: "C2", className: "Class 2" },
        { classId: "C3", className: "Class 3" },
        { classId: "C4", className: "Class 4" }
    ];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = () => {
        console.log({ rollNo, name, image, selectedClass });
        navigate("/dashboard");
    };

    return (
        <>
            <Navbar />
            <div className="section">
                <h1>Add Student</h1>
                <div className="form-box">
                    <div className="each-line">
                        <label>Enter the Roll No</label>
                        <input
                            type="text"
                            value={rollNo}
                            onChange={(e) => setRollNo(e.target.value)}
                        />
                    </div>
                    <div className="each-line">
                        <label>Enter the Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="each-line">
                        <label>Upload Student Image</label>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        {image && <img src={image} alt="Student" width="100" />}
                    </div>
                    <div className="each-line">
                        <label>Select Class:</label>
                        <select
                            value={selectedClass}
                            onChange={(e) => setSelectedClass(e.target.value)}
                        >
                            <option value="">Select Class</option>
                            {classList.map((cls) => (
                                <option key={cls.classId} value={cls.classId}>
                                    {cls.className}
                                </option>
                            ))}
                        </select>
                    </div>
                    <PrimaryBtn btnText="Add Student" btnOnClick={handleSubmit} />
                </div>
            </div>
        </>
    );
}
