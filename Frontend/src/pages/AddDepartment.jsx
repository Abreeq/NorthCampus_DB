import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [deptForm, setDeptForm] = useState({ name: "" });
  const [courseForm, setCourseForm] = useState({
    department_id: "",
    name: "",
    intake: "",
    gen_seats: "",
    obc_seats: "",
    sc_seats: "",
    st_seats: "",
    ews_seats: "",
    duration_years: "",
    exam_system: "",
    yearStart: "",
  });

  // ✅ Fetch departments when component loads
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/departments") // Adjust backend URL if different
      .then((res) => setDepartments(res.data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  // ✅ Add Department
// ✅ Add Department
const addDepartment = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://127.0.0.1:5000/api/departments/", deptForm);
    setDepartments([...departments, res.data]);
    setDeptForm({ name: "" });
    alert("✅ Department added successfully!");
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      alert(`⚠️ ${err.response.data.error}`);
    } else {
      alert("❌ Something went wrong while adding department");
    }
    console.error(err);
  }
};

// ✅ Add Course
const addCourse = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://127.0.0.1:5000/api/courses/", courseForm);
    console.log(res.data);
    setCourseForm({
department_id: "",
    name: "",
    intake: "",
    gen_seats: "",
    obc_seats: "",
    sc_seats: "",
    st_seats: "",
    ews_seats: "",
    duration_years: "",
    exam_system: "",
    yearStart: "",
    });
    alert("✅ Course added successfully!");
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      alert(`⚠️ ${err.response.data.error}`);
    } else {
      alert("❌ Something went wrong while adding course");
    }
    console.error(err);
  }
};


  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Departments & Courses
      </h1>

      {/* Add Department Form */}
      <form
        onSubmit={addDepartment}
        className="bg-white p-6 rounded-xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          placeholder="Department Name"
          value={deptForm.name}
          onChange={(e) => setDeptForm({ name: e.target.value })}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition"
        >
          Add Department
        </button>
      </form>

      {/* Add Course Form */}
      <form
        onSubmit={addCourse}
        className="bg-white p-6 rounded-xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <select
          name="deptId"
          value={courseForm.department_id}
          onChange={(e) =>
            setCourseForm({ ...courseForm, department_id: e.target.value })
          }
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

        <input
          type="text"
          name="name"
          value={courseForm.name}
          onChange={(e) =>
            setCourseForm({ ...courseForm, name: e.target.value })
          }
          placeholder="Course Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="intake"
          value={courseForm.intake}
          onChange={(e) =>
            setCourseForm({ ...courseForm, intake: e.target.value })
          }
          placeholder="Intake"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="gen"
          value={courseForm.gen_seats}
          onChange={(e) =>
            setCourseForm({ ...courseForm, gen_seats: e.target.value })
          }
          placeholder="Gen"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="obc"
          value={courseForm.obc_seats}
          onChange={(e) =>
            setCourseForm({ ...courseForm, obc_seats: e.target.value })
          }
          placeholder="OBC"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="sc"
          value={courseForm.sc_seats}
          onChange={(e) =>
            setCourseForm({ ...courseForm, sc_seats: e.target.value })
          }
          placeholder="SC"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="st"
          value={courseForm.st_seats}
          onChange={(e) =>
            setCourseForm({ ...courseForm, st_seats: e.target.value })
          }
          placeholder="ST"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="ews"
          value={courseForm.ews_seats}
          onChange={(e) =>
            setCourseForm({ ...courseForm, ews_seats: e.target.value })
          }
          placeholder="EWS"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="duration"
          value={courseForm.duration_years}
          onChange={(e) =>
            setCourseForm({ ...courseForm, duration_years: e.target.value })
          }
          placeholder="Duration (years)"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="examSystem"
          value={courseForm.exam_system}
          onChange={(e) =>
            setCourseForm({ ...courseForm, exam_system: e.target.value })
          }
          placeholder="Exam System"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="yearStart"
          value={courseForm.yearStart}
          onChange={(e) =>
            setCourseForm({ ...courseForm, yearStart: e.target.value })
          }
          placeholder="Year Start"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="md:col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
