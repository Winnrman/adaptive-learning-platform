const TestingPage = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-slate-200">
  {/* Left div */}
  <div className="relative z-0 p-4 w-96 bg-slate-400 rounded-r-xl overflow-hidden">
    {/* Fake right corner */}
    <div className="absolute top-0 right-0 h-10 w-10 bg-slate-600 rounded-bl-full"></div>
    <div className="absolute bottom-0 right-0 h-10 w-10 bg-slate-600 rounded-tl-full"></div>
  </div>

  {/* Right div */}
  <div className="-ml-4 relative z-10 p-4 w-72 bg-slate-600 rounded-bl-xl">
    {/* right card content */}
  </div>
</div>

    );
}

export default TestingPage;