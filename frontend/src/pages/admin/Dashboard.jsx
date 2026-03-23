import AdminCard from "../../components/admin/AdminCard";

const Dashboard = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AdminCard title="Total Users" value="120" />
        <AdminCard title="Active NGOs" value="15" />
        <AdminCard title="Volunteers" value="80" />
        <AdminCard title="Opportunities" value="40" />
      </div>
    </div>
  );
};

export default Dashboard;
