import { useState } from "react";
import * as MealsyAPI from "/src/services/api-service.js";
import { useEffect } from "react";
import StarsReview from "../../stars-review/stars-review";
import { Link, useParams } from "react-router-dom";
import { cuisineCountry as country } from "/src/utils/constants.js";
import ReviewsModal from "../../reviews-modal/reviews-modal";
import ReviewForm from "../../users/review/review-form";
import { useAuthContext } from "../../../contexts/auth-context";

function DishDetail() {
  const [dish, setDish] = useState();
  const [dataReviews, setDataReviews] = useState([]);
  const { id } = useParams();
  const [showReviews, setShowReviews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    getDish();
    getReviews();
  }, [id]);

  

  const getDish = async () => {
    try {
      setIsLoading(true);
      const dishData = await MealsyAPI.getDish(id);
      setDish(dishData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getReviews = async () => {
    try {
      setIsLoading(true);
      const reviewsData = await MealsyAPI.getReviews(id);
      setDataReviews(reviewsData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowReviews = () => {
    setShowReviews(true);
  };

  const getDietTags = (tags) => {
    return tags?.filter(
      (tag) =>
        tag === "gluten-free" ||
        tag === "dairy-free" ||
        tag === "high-protein" ||
        tag === "vegan" ||
        tag === "vegetarian"
    );
  };

  return (
    <div className="bg-white">
    {isLoading && (
        <div className="flex w-screen h-screen inset-0 justify-center items-center bg-beige-light fixed z-10">
          <img src="/images/load.gif" className="w-40" alt="Loading..." />
        </div>
      )}
      {dataReviews?.reviews && showReviews && (
        <ReviewsModal
          data={dataReviews.reviews}
          setShowModal={setShowReviews}
        />
      )}
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link
                  to="/dishes"
                  className="mr-2 text-sm font-medium text-brown-dark"
                >
                  Dishes
                </Link>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <Link
                to={`/dishes/${id}`}
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {dish?.name}
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 px-4 lg:px-8 max-w-2xl lg:max-w-7xl lg:grid lg:grid-cols-2">
          <div className="w-full">
            <img
              src={dish?.image}
              alt={dish?.name}
              className="aspect-square w-full object-cover brightness-90 contrast-90"
            />
          </div>
          <div className="bg-beige-light flex w-full h-full lg:px-14 items-center justify-center p-4">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl lg:text-9xl text-brown-dark">
              {dish?.name}
            </h1>
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8"></div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <StarsReview rating={dataReviews?.average} />
                </div>
                <p className="sr-only">
                  {dataReviews?.average && Math.round(dataReviews.average)} out
                  of 5 stars
                </p>
                <button
                  onClick={handleShowReviews}
                  className="ml-3 text-sm font-medium text-brown-dark hover:text-brown-medium cursor-pointer hover:underline"
                >
                  {" "}
                  {dataReviews?.total} reviews
                </button>
              </div>
            </div>
            {user && (
              <ReviewForm id={dish?.id} />
            )}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{dish?.description}</p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex gap-2 mb-3">
                {getDietTags(dish?.tags)?.map((tag, index) => (
                  <img
                    key={index}
                    src={`/images/${tag}.png`}
                    className={tag === "vegetarian" ? "w-9" : "w-8"}
                    title={tag}
                  />
                ))}
              </div>
              <div className="flex gap-6">
                <div className="flex gap-2">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    id="Time-Lapse--Streamline-Sharp"
                    height="24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="time-lapse--time-lapse-mode-photo-picture-image-setting">
                      <path
                        id="Union"
                        fill="#9C6644"
                        fillRule="evenodd"
                        d="M3.25 12a8.75 8.75 0 1 0 17.5 0h2.5c0 6.213 -5.037 11.25 -11.25 11.25S0.75 18.213 0.75 12 5.787 0.75 12 0.75v2.5A8.75 8.75 0 0 0 3.25 12Zm17.325 -1.752a8.675 8.675 0 0 0 -0.7 -2.066l2.25 -1.093c0.405 0.835 0.71 1.727 0.9 2.662l-2.45 0.497Zm-3.326 -5.25a8.809 8.809 0 0 1 1.752 1.751l1.998 -1.501a11.309 11.309 0 0 0 -2.248 -2.249l-1.502 2Zm-1.43 -0.873a8.678 8.678 0 0 0 -2.068 -0.7l0.498 -2.45c0.934 0.19 1.827 0.496 2.661 0.901l-1.092 2.249Z"
                        clipRule="evenodd"
                        strokeWidth="1"
                      ></path>
                      <path
                        id="Vector 3844 (Stroke)"
                        fill="#DDB892"
                        fillRule="evenodd"
                        d="M11 7h2v4.586l3.707 3.707 -1.414 1.414L11 12.414V7Z"
                        clipRule="evenodd"
                        strokeWidth="1"
                      ></path>
                    </g>
                  </svg>
                  <p className="text-base text-gray-900">
                    {dish?.duration} minutes
                  </p>
                </div>
                <div className="flex gap-2">
                  <img
                    src="/images/calories.png"
                    alt="Calories"
                    className="w-5"
                    title="calories"
                  />
                  <p>{dish?.calories}</p>
                </div>
                <div className="flex gap-2 w-10 h-6">
                  <img
                    src={`https://flagcdn.com/w320/${
                      country[dish?.cuisine]
                    }.png`}
                    alt={`${dish?.cuisine} flag`}
                    className="w-full h-full object-cover rounded-sm"
                    title={dish?.cuisine}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Instructions
              </h3>

              <div className="mt-4">
                <ol role="list" className="list-decimal space-y-2 pl-4 text-sm">
                  {dish?.instructions?.map((instruction, index) => (
                    <li key={index} className="text-brown-dark">
                      <span className="text-gray-600">{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Ingredients
              </h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {dish?.ingredients?.map((ingredient, index) => (
                    <li key={index} className="text-brown-dark">
                      <span className="text-gray-600">{ingredient.ingredient}: {ingredient.quantity} {ingredient.unit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
