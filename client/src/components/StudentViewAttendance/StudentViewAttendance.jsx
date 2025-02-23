import React from "react";
import Navbar from "../Navbar/Navbar";
import { formatDate } from "../utils/utils";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./StudentViewAttendance.css";

export default function StudentViewAttendance() {
  const attendanceData = {
    "20-02-2025": true,
    "21-02-2025": false,
    "22-02-2025": true,
    "23-02-2025": false,
    "24-02-2025": false,
  };

  const attendanceArray = Object.keys(attendanceData).map((date, index) => ({
    date,
    status: attendanceData[date] ? "Present" : "Absent",
  }));

  const totalDays = Object.values(attendanceData).length;
  const presentCount = Object.values(attendanceData).filter((status) => status).length;
  const absentCount = totalDays - presentCount;

  const pieData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];

  const COLORS = ["#4caf50", "#ff4d4d"];

  const renderCustomizedLabel = ({ name, value }) => {
    const percentage = ((value / totalDays) * 100).toFixed(1);
    return `${name}: ${percentage}%`;
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>View Attendance</h1>
        <div className="attendance-box">
          <table className="attendance-table">
            <thead>
              <tr>
                <th>SL</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceArray.map((entry, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(entry.date)}</td>
                  <td>
                    <span className={`label ${entry.status.toLowerCase()}`}>
                      {entry.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>Attendance Overview</h3>
        <div className="pie-chart-container">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={renderCustomizedLabel}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </>
  );
}
