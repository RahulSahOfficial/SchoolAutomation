import TeacherNavbar from "../Navbar/TeacherNavbar";
import { Link,useNavigate } from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import "./MarkAttendence.css";
import { useEffect, useState } from "react";
import CameraComponent from "../Camera/Camera";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
export default function MarkAttendence() {
  const date = new Date();
  const dateVal = date.toISOString().substring(0, 10);
  const navigate=useNavigate();

  //data from api
  const students = [
    {
      rollNo: "12",
      studentId: "12345",
      name: "Rahul Kumar Sah",
    },
    {
      rollNo: "13",
      studentId: "12345",
      name: "Hari Mohan",
    },
    {
      rollNo: "14",
      studentId: "12345",
      name: "Sourab Kumar",
    },
    {
      rollNo: "15",
      studentId: "12345",
      name: "Altaf Hussain",
    },
  ];
  const [inputDate, setInputDate] = useState(dateVal);
  const [isAnalyzed,setIsAnalyzed]=useState(false);
  const [checkedState, setCheckedState] = useState(
    Array(students.length).fill(true)
  );

  const analyzeAttendence=()=>{
    // send data to AI

    setIsAnalyzed(true);
  }
  const submitAttendence=()=>{
    //submit the data
    navigate("/dashboard");
  }
  const handleChange = (index) => {
    const updatedState = [...checkedState];
    updatedState[index] = !updatedState[index];
    setCheckedState(updatedState);
  };

  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.3;
    utterance.pitch = 1.2;
    utterance.volume = 1;

    const voices = synth.getVoices();
    utterance.voice =
      voices.find((v) => v.name.includes("Microsoft Ravi - English (India)")) ||
      voices[0];
    synth.speak(utterance);
  };

  const [capturedImage, setCapturedImage] = useState(null);

  const handleCapture = (image) => {
    setCapturedImage(image);
  };
  return (
    <div>
      <TeacherNavbar />

      <div className="section mark-attendence">
        <h1>Attendence Form</h1>
        <Link to="/select-class">Select Another Class</Link>
        <div className="form-box">
          <div className="each-line">
            <label htmlFor="attendenceClassName">Class</label>
            <input type="text" value="XII" id="attendenceClassName" readOnly />
          </div>
          <div className="each-line">
            <label htmlFor="attendenceDate">Select Date</label>
            <input
              type="date"
              name="attendenceDate"
              id="attendenceDate"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
            />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Announce</th>
              <th>Roll No</th>
              <th>Name</th>
              <th>Mark Attendence</th>
            </tr>
          </thead>
          <tbody>
            {checkedState.map((isChecked, index) => (
              <tr key={index}>
                <td className="center">
                  <HiMiniSpeakerWave
                    onClick={() =>
                      speakText(
                        `Roll No ${students[index].rollNo} ${students[index].name}`
                      )
                    }
                  />
                </td>
                <td>{students[index].rollNo}</td>
                <td>{students[index].name}</td>
                <td className="center">
                  <input
                    type="checkbox"
                    name="rollNo"
                    className="big-checkbox"
                    checked={isChecked}
                    onChange={() => handleChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <PrimaryBtn btnText="Analyze Attendence" btnOnClick={analyzeAttendence} />
        {
            isAnalyzed &&
            <div className="analysis-box">
                
                <h3>Analysis on Attendence</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati soluta iure suscipit labore alias cumque! Aut error dolorum recusandae facilis adipisci, deleniti laboriosam similique quae quibusdam ullam dolor veniam alias?</p>
                { capturedImage ? (
                    <>
                        <img src={capturedImage} alt="Captured" />
                        <br />
                        <PrimaryBtn btnText="Submit Attendance" btnOnClick={submitAttendence} />
                    </>
                ) : (
                    <CameraComponent onCapture={handleCapture} />
                )}
            </div>
        }
      </div>
    </div>
  );
}
