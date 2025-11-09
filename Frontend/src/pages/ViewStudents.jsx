import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Fetch all students with department & course names from backend
    axios
      .get("http://127.0.0.1:5000/api/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error("Error fetching students:", err));
  }, []);

  const filteredStudents = students.filter((s) => {
    return (
      s.name.toLowerCase().includes(filter.toLowerCase()) ||
      s.department_name.toLowerCase().includes(filter.toLowerCase()) ||
      s.course_name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">View Students</h1>

      {/* Filter Input */}
      <input
        type="text"
        placeholder="Filter by name, department, or course..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 rounded mb-4 w-full md:w-1/3"
      />

      {/* Students Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">Roll Number</th>
              <th className="p-2">Name</th>
              <th className="p-2">Department</th>
              <th className="p-2">Course</th>
              <th className="p-2">Category</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Religion</th>
              <th className="p-2">Handicapped</th>
              <th className="p-2">Year of Admission</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-100 transition">
                <td className="p-2 text-center">{s.roll_number}</td>
                <td className="p-2 text-center">{s.name}</td>
                <td className="p-2 text-center">{s.department_name}</td>
                <td className="p-2 text-center">{s.course_name}</td>
                <td className="p-2 text-center">{s.category}</td>
                <td className="p-2 text-center">{s.gender}</td>
                <td className="p-2 text-center">{s.religion}</td>
                <td className="p-2 text-center">{s.handicapped ? "Yes" : "No"}</td>
                <td className="p-2 text-center">{s.year_of_admission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;
