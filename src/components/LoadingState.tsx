const LoadingState = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-24 bg-gray-700 rounded-2xl w-full"></div>
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 bg-gray-700 rounded-xl w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default LoadingState;