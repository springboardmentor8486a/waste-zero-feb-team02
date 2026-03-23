const AdminCard = ({ title, value }) => {
  return (
    <div
      className="p-5 rounded-2xl shadow-md 
                    bg-white dark:bg-[#1e293b] 
                    border border-gray-200 dark:border-gray-700 
                    hover:shadow-xl transition duration-300"
    >
      <h2 className="text-sm text-gray-500 dark:text-gray-400">{title}</h2>

      <p className="text-3xl font-bold mt-2 text-gray-800 dark:text-white">
        {value}
      </p>
    </div>
  );
};

export default AdminCard;
