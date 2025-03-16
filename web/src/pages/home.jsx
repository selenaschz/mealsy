import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="relative">
      <img
        src="/images/landpage.gif"
        alt="Food Landpage"
        className="w-full h-screen object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-transparent">
        <p className="text-white text-9xl font-heading ">
          Meal planning made effortless.
        </p>
        <p className="mb-6 text-white text-9xl font-heading">
          Taste the simplicity.
        </p>
        <Link to="/login">
        <button className="mt-6 group rounded-full bg-transparent text-4xl text-white p-4 border border-white hover:bg-white hover:text-transparent transition-all duration-300 cursor-pointer">
          <span className="bg-clip-text bg-gradient-to-r from-black to-gray-500 group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-black group-hover:to-gray-500">
            Explore
          </span>
        </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
