import Navbar from "../Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import "./MarkAttendence.css";
import { useContext, useEffect, useState } from "react";
import CameraComponent from "../Camera/Camera";
import PrimaryBtn from "../PrimaryBtn/PrimaryBtn";
import axios from "axios";
import { UserContext } from "../../context";

const GET_STUDENTS_BY_CLASS_ID_URL =
  "http://localhost:3000/api/students/class/";

export default function MarkAttendence() {
  const [studentClass, setStudentClass] = useState({});
  const [students, setStudents] = useState([]);
  const { user } = useContext(UserContext);

  const date = new Date();
  const dateVal = date.toISOString().substring(0, 10);
  const navigate = useNavigate();

  const [inputDate, setInputDate] = useState(dateVal);
  const [loading, setLoading] = useState(false);
  const [isAnalyzed, setIsAnalysed] = useState(false);
  const [checkedState, setCheckedState] = useState([]);
  const [aiResponse, setAiResponse] = useState(
    "AI Analysis will appear here..."
  );

  useEffect(() => {
    async function getClassInfo() {
      const urlParams = new URLSearchParams(window.location.search);
      const classId = urlParams.get("classId");
      const className = urlParams.get("className");

      setStudentClass({ className, classId });
      if (user.userId) {
        const result = await axios.get(GET_STUDENTS_BY_CLASS_ID_URL + classId);
        const data = result.data;
        console.log(data);
        setStudents(data);
        setCheckedState(Array(data.length).fill(true));
      }
    }
    getClassInfo();
  }, [user]);

  const analyzeAttendence = async (students, checkedState) => {
    const data = [];
    for (let i = 0; i < students.length; i++) {
      data.push({
        studentId: students[i].student_id,
        present: checkedState[i],
      });
    }
    const content = `Tell the attendance percentage of the following students given in json format, give 20 word analysis. Keep it short and to the point. Context is of rural schools in India, what can be the reason. ${JSON.stringify(
      data
    )}. PS: Do not format the text.`;
    console.log(content);
    try {
      setIsAnalysed(true);

      setLoading(true);
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "cognitivecomputations/dolphin3.0-r1-mistral-24b:free",
          messages: [
            {
              role: "user",
              content,
            },
          ],
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      setAiResponse(response.data.choices[0].message.content);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const submitAttendence = () => {
    //submit the data
    navigate("/dashboard");
  };
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
      <Navbar />

      <div className="section mark-attendence">
        <h1>Attendence Form</h1>
        <Link to="/select-class">Select Another Class</Link>
        <div className="form-box">
          <div className="each-line">
            <label htmlFor="attendenceClassName">Class</label>
            <input
              type="text"
              value={studentClass.className}
              id="attendenceClassName"
              readOnly
            />
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
                        `Roll No ${students[index].roll_no} ${students[index].name}`
                      )
                    }
                  />
                </td>
                <td>{students[index].roll_no}</td>
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
        <PrimaryBtn
          btnText="Analyze Attendence"
          btnOnClick={() => analyzeAttendence(students, checkedState)}
        />
        {isAnalyzed && (
          <div className="analysis-box">
            <h3>Analysis on Attendence</h3>
            <p>{loading ? <div className="spinner"></div> : aiResponse}</p>
            {capturedImage ? (
              <>
                <img src={capturedImage} alt="Captured" />
                <br />
                <PrimaryBtn
                  btnText="Submit Attendance"
                  btnOnClick={submitAttendence}
                />
              </>
            ) : (
              <CameraComponent onCapture={handleCapture} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
