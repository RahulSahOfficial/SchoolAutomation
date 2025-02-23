import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { formatDate,getLabel,getColor } from "../utils/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import "./ViewAttendance.css";

export default function ViewAttendance() {
  const attendanceData = {
    "21-02-2025": [
      { className: "Class XII", present: 5, total: 60, analysis: "Some Text" },
      { className: "Class XI", present: 20, total: 55, analysis: "Another Text" },
    ],
    "22-02-2025": [
      { className: "Class X", present: 38, total: 50, analysis: "Some Text" },
      { className: "Class IX", present: 30, total: 50, analysis: "Another Text" },
    ],
  };

  const initialExpandedDate = Object.keys(attendanceData)[0] || null;
  const [expandedDates, setExpandedDates] = useState(initialExpandedDate ? [initialExpandedDate] : []);

  const toggleDate = (date) => {
    setExpandedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h1>View Attendance</h1>
        <div className="attendance-box">
          {Object.keys(attendanceData).map((date) => (
            <div key={date} className="attendance-date">
              <div className="date-down-btn" onClick={() => toggleDate(date)}>
                {formatDate(date)}
                <button>
                  <FaChevronDown />
                </button>
              </div>

              {expandedDates.includes(date) && (
                <>
                  <table className="attendance-table">
                    <thead>
                      <tr>
                        <th>Class Name</th>
                        <th>Present</th>
                        <th>Total</th>
                        <th>Percentage</th>
                        <th>Analysis</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData[date].map((entry, index) => {
                        const percentage = ((entry.present / entry.total) * 100).toFixed(2);
                        return (
                          <tr key={index}>
                            <td>{entry.className}</td>
                            <td>{entry.present}</td>
                            <td>{entry.total}</td>
                            <td>{percentage}%</td>
                            <td>{entry.analysis}</td>
                            <td>
                              <span className={`label ${getLabel(percentage)}`}>
                                {getLabel(percentage)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div>
                    <h3>Attendance Overview</h3>
                    <div className="chart-wrapper">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={attendanceData[date].map((entry) => ({
                            ...entry,
                            percentage: (entry.present / entry.total) * 100,
                          }))}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="className" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                          <Bar dataKey="percentage">
                            {attendanceData[date].map((entry, index) => {
                              const percentage = (entry.present / entry.total) * 100;
                              return <Cell key={`cell-${index}`} fill={getColor(percentage)} />;
                            })}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
