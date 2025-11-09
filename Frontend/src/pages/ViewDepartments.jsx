import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [deptFilter, setDeptFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");

  // ✅ Fetch Departments and Courses on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, courseRes] = await Promise.all([
          axios.get("http://127.0.0.1:5000/api/departments"),
          axios.get("http://127.0.0.1:5000/api/courses"),
        ]);
        setDepartments(deptRes.data);
        setCourses(courseRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to load departments or courses");
      }
    };
    fetchData();
  }, []);

  // ✅ Filters
  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(deptFilter.toLowerCase())
  );

  const filteredCourses = courses.filter((c) =>
    c.name.toLowerCase().includes(courseFilter.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Department Filter */}
      <input
        type="text"
        placeholder="Filter Departments..."
        value={deptFilter}
        onChange={(e) => setDeptFilter(e.target.value)}
        className="border p-2 rounded mb-4 w-full md:w-1/3"
      />

      {/* Departments Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl mb-6">
        <h2 className="text-xl font-bold p-4 border-b">Departments</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Department Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.map((dept) => (
              <tr
                key={dept.id}
                className="border-b hover:bg-gray-100 transition"
              >
                <td className="p-2 text-center">{dept.id}</td>
                <td className="p-2 text-center">{dept.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Filter */}
      <input
        type="text"
        placeholder="Filter Courses..."
        value={courseFilter}
        onChange={(e) => setCourseFilter(e.target.value)}
        className="border p-2 rounded mb-4 w-full md:w-1/3"
      />

      {/* Courses Table */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <h2 className="text-xl font-bold p-4 border-b">Courses</h2>
        <table className="min-w-full table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-2">Department</th>
              <th className="p-2">Course Name</th>
              <th className="p-2">Intake</th>
              <th className="p-2">Gen</th>
              <th className="p-2">OBC</th>
              <th className="p-2">SC</th>
              <th className="p-2">ST</th>
              <th className="p-2">Duration</th>
              <th className="p-2">Exam System</th>
              <th className="p-2">Year Start</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map((course) => {
              const dept = departments.find(
                (d) => d.id === Number(course.department_id)
              );
              return (
                <tr
                  key={course.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-2 text-center">{dept ? dept.name : "Unknown"}</td>
                  <td className="p-2 text-center">{course.name}</td>
                  <td className="p-2 text-center">{course.intake}</td>
                  <td className="p-2 text-center">{course.gen_seats}</td>
                  <td className="p-2 text-center">{course.obc_seats}</td>
                  <td className="p-2 text-center">{course.sc_seats}</td>
                  <td className="p-2 text-center">{course.st_seats}</td>
                  <td className="p-2 text-center">{course.duration_years}</td>
                  <td className="p-2 text-center">{course.exam_system}</td>
                  <td className="p-2 text-center">{course.year_start}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewDepartments;
