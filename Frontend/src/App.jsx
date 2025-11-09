import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Department from "./pages/Department";
import Students from "./pages/Students";
import AddDepartment from "./pages/AddDepartment";
import ViewDepartments from "./pages/ViewDepartments";
import AddStudents from "./pages/AddStudents";
import ViewStudents from "./pages/ViewStudents";

function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/departments/add" element={<AddDepartment />} />
        <Route path="/departments/view" element={<ViewDepartments />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/add" element={<AddStudents />} />
        <Route path="/students/view" element={<ViewStudents />} />
      </Routes>
    </div>
    <Footer />
    </>
  );
}

export default App;
