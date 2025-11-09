import React, { useState, useEffect } from "react";
import axios from "axios";

const AddStudents = () => {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    roll_number: "",
    department_id: "",
    course_id: "",
    category: "GEN",
    gender: "Male",
    handicapped: 0,
    religion: "",
    year_of_admission: "",
  });

  // Fetch departments & courses
  useEffect(() => {
    axios.get("http://localhost:5000/api/departments").then((res) => setDepartments(res.data));
    axios.get("http://localhost:5000/api/courses").then((res) => setCourses(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/students/", formData);
      alert(res.data.message);
      setFormData({
        name: "",
        roll_number: "",
        department_id: "",
        course_id: "",
        category: "GEN",
        gender: "Male",
        handicapped: 0,
        religion: "",
        year_of_admission: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Error adding student");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Add New Student</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="roll_number"
          value={formData.roll_number}
          onChange={handleChange}
          placeholder="Roll Number"
          className="border p-2 rounded"
          required
        />

        <select
          name="department_id"
          value={formData.department_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Department</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="course_id"
          value={formData.course_id}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Course</option>
          {courses
            .filter((c) => c.department_id === Number(formData.department_id))
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="GEN">GEN</option>
          <option value="EWS">EWS</option>
          <option value="OBC">OBC</option>
          <option value="SC">SC</option>
          <option value="ST">ST</option>
        </select>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* Religion Dropdown */}
        <select
          name="religion"
          value={formData.religion}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Religion</option>
          <option value="Islam">Islam</option>
          <option value="Hinduism">Hinduism</option>
          <option value="Sikhism">Sikhism</option>
          <option value="Christianity">Christianity</option>
          <option value="Buddhism">Buddhism</option>
          <option value="Jainism">Jainism</option>
          <option value="Other">Other</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="handicapped"
            checked={formData.handicapped === 1}
            onChange={handleChange}
          />
          Handicapped
        </label>

        <input
          type="number"
          name="year_of_admission"
          value={formData.year_of_admission}
          onChange={handleChange}
          placeholder="Year of Admission"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="md:col-span-3 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudents;
