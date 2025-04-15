export const Shimmer = () => {
  return (
    <div className="p-1 flex flex-wrap relative">
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        </div>
     </div>
  );
};
