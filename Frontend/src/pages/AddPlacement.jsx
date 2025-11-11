import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AddPlacement = () => {
    const [courses, setCourses] = useState([]);
    const [placementForm, setPlacementForm] = useState({
        course_id:"",
        year:"",
        total_students:"",
        total_placed:"",
        median_salary:"",
        average_salary:"",
        male:"",
        female:"",
        other:""	

      });

    const AddPlacement = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:5000/api/placements/", placementForm);
            console.log(response.data);
            alert("✅ Placement details added successfully!");
          } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
              alert(`⚠️ ${err.response.data.error}`);
            } else {
              alert("❌ Something went wrong while adding placement details");
            }
            console.error(err);
          }
    }
    useEffect(() => {
        try{
            axios.get("http://127.0.0.1:5000/api/courses").then((res) => setCourses(res.data));
        }
        catch(err){
            alert("Some error occured");
            console.log(err)
        }
    },[]);
  return (
        <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">
        Add Placement Details
      </h1>

      {/* Add Course Form */}
      <form
        onSubmit={AddPlacement}
        className="bg-white p-6 rounded-xl shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <select
          name="course_id"
          value={placementForm.course_id}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, course_id: e.target.value })
          }
          className="border p-2 rounded"
          required
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="total_students"
          value={placementForm.total_students}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, total_students: e.target.value })
          }
          placeholder="Total Students Appeared"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="total_placed"
          value={placementForm.total_placed}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, total_placed: e.target.value })
          }
          placeholder="Total Students Placed"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="median_salary"
          value={placementForm.median_salary}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, median_salary: e.target.value })
          }
          placeholder="Median Package"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="average_salary"
          value={placementForm.average_salary}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, average_salary: e.target.value })
          }
          placeholder="Average Package"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="male"
          value={placementForm.male}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, male: e.target.value })
          }
          placeholder="Male Students Placed"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="female"
          value={placementForm.female}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, female: e.target.value })
          }
          placeholder="Female Students Placed"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="other"
          value={placementForm.other}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, other: e.target.value })
          }
          placeholder="Other Students Placed"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="year"
          value={placementForm.year}
          onChange={(e) =>
            setPlacementForm({ ...placementForm, year: e.target.value })
          }
          placeholder="Year of Placement"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="md:col-span-3 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Add Placement Details
        </button>
      </form>
    </div>
  )
}

export default AddPlacement