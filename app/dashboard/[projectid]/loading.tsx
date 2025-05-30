export default function Loading() {
  return (
    <div className="w-full h-full flex flex-col animate-pulse p-5">
      <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
      <div className="w-full grid grid-cols-2 grow gap-8">
        <div className="h-40 w-full bg-gray-100 rounded-lg" />
        <div>
          <div className="flex gap-2 items-center mb-4">
            <div className="h-8 w-32 bg-gray-200 rounded" />
            <div className="relative group">
              <div className="flex items-center rounded-lg transition-colors duration-200 group-hover:bg-gray-200 p-1">
                <div className="h-7 w-7 bg-gray-200 rounded" />
                <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-200 pointer-events-none whitespace-nowrap">
                  Edit Tasks
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 border border-gray-200 rounded-lg px-5 py-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-5 w-5 bg-gray-200 rounded mr-3" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}