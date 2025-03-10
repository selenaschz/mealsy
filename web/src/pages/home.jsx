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
        <p className="text-white text-9xl font-heading">
           Taste the simplicity.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
