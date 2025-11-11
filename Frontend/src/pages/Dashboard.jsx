import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {

    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div className="p-6 text-gray-600">Loading dashboard...</div>;

  const cards = [
    { title: "Departments", value: stats.departments, color: "bg-blue-500", link: "/departments" },
    { title: "Students", value: stats.students, color: "bg-green-500", link: "/students" },
    { title: "Exams", value: stats.exams, color: "bg-yellow-500", link: "/examination" },
    { title: "Placements", value: stats.placements, color: "bg-purple-500", link: "/placement" },
    { title: "Staff", value: stats.staff, color: "bg-red-500", link: "/staff" },
    { title: "Scholarships", value: stats.scholarships, color: "bg-teal-500", link: "/scholarship" },
    { title: "Hostel", value: stats.hostels + " Blocks", color: "bg-indigo-500", link: "/hostel" },
    { title: "Library", value: stats.library_books.toLocaleString() + " Books", color: "bg-pink-500", link: "/library" },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <a
            href={card.link}
            key={card.title}
            className={`p-5 rounded-xl shadow-lg text-white ${card.color} hover:scale-105 transition transform`}
          >
            <div className="text-sm">{card.title}</div>
            <div className="text-2xl font-bold mt-2">{card.value}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
