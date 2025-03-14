import { useEffect, useState } from "react";
import * as MealsyAPI from "../../../services/api-service";
import DishItem from "./../dish-item/dish-item";

function DishList({ max, page, filters, sortClicked}) {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([])

  useEffect(() => {

    console.log("Filters enviados:", {
      limit: max || 20,
      page: page || 1,
      ...filters
    });

    MealsyAPI.listDishes({
      limit: max || 20,
      page: page || 1,
      ...filters,
    })
      .then((data) => setDishes(data))
      .catch((error) => console.error("Error fetching dishes:", error));
  }, [max, page, filters]);


  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {dishes.map((dish) => (
            <DishItem key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DishList;
