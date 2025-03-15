import { useEffect, useState } from "react";
import * as MealsyAPI from "../../../services/api-service";
import DishItem from "./../dish-item/dish-item";

function DishList({ max, page, filters, sortClicked }) {
  const [dishes, setDishes] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])

  useEffect(() => {
    MealsyAPI.listDishes({
      limit: max,
      page,
    })
      .then((dishes) => {
        console.log(dishes)
        setDishes(dishes)
        setFilteredDishes(dishes) // Initialize with All dishes
      })
      .catch((error) => console.error(error))
  }, [max, page])

 // Filters
 useEffect(() => {
  if (!dishes.length) return

  let result = [...dishes]

  if (filters) {
    // Filter by Breakfast, dinner or lunch
    if (filters.category) {
      result = result.filter((dish) => 
        dish.tags && dish.tags.map(tag => tag.toLowerCase()).includes(filters.category.toLowerCase())
      )
    }

    // Filter by cuisine
    if (filters.cuisine && filters.cuisine.length > 0) {
      result = result.filter((dish) => filters.cuisine.includes(dish.cuisine))
    }

    // Filter by diet
    if (filters.diet && filters.diet.length > 0) {
      result = result.filter((dish) =>
        // Check if ALL selected diet tags are included in the dish's tags
        filters.diet.every((dietTag) => dish.tags.includes(dietTag)),
      )
    }

    // Filter by calories
    if (filters.calories && filters.calories.length === 2) {
      const [min, max] = filters.calories
      result = result.filter((dish) => dish.calories >= min && dish.calories <= max)
    }

    // Filter by duration
    if (filters.duration && filters.duration.length === 2) {
      const [min, max] = filters.duration
      result = result.filter((dish) => dish.duration >= min && dish.duration <= max)
    }

    // Filter by preparation method
    if (filters.preparation && filters.preparation.length > 0) {
      result = result.filter((dish) => filters.preparation.includes(dish.preparation))
    }
  }

  setFilteredDishes(result)
}, [ filters ])



  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {filteredDishes.length > 0 ? (
            filteredDishes.map((dish) => <DishItem key={dish.id} dish={dish} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">No dishes found matching your filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DishList;
