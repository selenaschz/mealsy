import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <div className="bg-beige-light pb-10 py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-3xl mx-auto text-center flex flex-col justify-center items-center">
        <h2 className="font-heading md:text-7xl mb-10 font-bold text-brown-dark text-4xl">
          About Mealsy
        </h2>
        <p className="mt-4 text-lg text-gray-600 pb-4">
          <span className="font-bold text-brown-dark">Mealsy</span> was created
          to solve a simple yet frustrating problem: deciding what to cook. We
          all know the struggle of standing in front of the fridge wondering
          what to make. This platform was born out of a love for food, a passion
          for programming, and a desire to make meal planning easier.
        </p>
        <p className="mt-4 text-lg text-gray-600 pb-4">
          Mealsy allows you to <Link to="/dishes" className="font-bold text-brown-dark"> filter </Link> recipes by your favorite cuisine, dietary preferences (for those with allergies or specific diets), 
          calories, preparation time, and more, so you can easily find the ideal dish. 
          
        </p>
        <p className="mt-4 text-lg text-gray-600 pb-4">
          Additionally, you can get recommendations for a <Link to="/planner" className="font-bold text-brown-dark"> random weekly meal calendar </Link>, making meal organization even easier. 
          With Mealsy, you'll have everything you need to make meal planning a quick and simple task.
        </p>

        <p className="mt-4 text-lg text-gray-600">
          Made with love, spiced with code by{" "}
          <span className="font-bold text-brown-dark"> 
            <a href="https://www.linkedin.com/in/selenasanchezdevicente/">
              Selena Sánchez🤎
            </a>
          </span>
        </p>
        <img src="/images/logo-1.png" className="w-40 my-10" alt="Mealsy Logo" />
      </div>
    </div>
  );
}

export default AboutPage;
