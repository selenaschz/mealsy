import { useState } from "react";
import * as MealsyAPI from "/src/services/api-service.js";
import { useEffect } from "react";
import StarsReview from "../../stars-review/stars-review";
import { useParams } from "react-router-dom";

function DishDetail() {
  const [dish, setDish] = useState();
  const [dataReviews, setDataReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    MealsyAPI.getDish(id)
      .then((dish) => setDish(dish))
      .catch((error) => console.error(error));
    MealsyAPI.getReviews(id)
      .then((reviews) => setDataReviews(reviews))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
        <div className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
          <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
              <img
                src={dish?.image}
                alt={dish?.name}
                className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5"
              />
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
                  {dish?.name}
                </h2>

                <section aria-labelledby="information-heading" className="mt-2">
                  <h3 id="information-heading" className="sr-only">
                    Dish information
                  </h3>
                  <div className="mt-6">
                    <h4 className="sr-only">Reviews</h4>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <StarsReview rating={dataReviews?.average} />
                      </div>
                      <p className="sr-only">
                        {dataReviews?.average} out of 5 stars
                      </p>
                      <a
                        href="#"
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {dataReviews?.total} reviews
                      </a>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
