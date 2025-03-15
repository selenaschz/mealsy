import { useEffect, useState } from "react";
import * as MealsyAPI from "../../../services/api-service";
import DishItem from "./../dish-item/dish-item";
import Pagination from "../../ui/pagination/pagination";
function DishList({ max, page, filters, sortDishes }) {
  const [dishes, setDishes] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])
  const [currentPage, setCurrentPage] = useState(page || 1)
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 8

  useEffect(() => {
    console.log("Fetching dishes with max:", max, "page:", page)
    MealsyAPI.listDishes({
      limit: max,
      page: page,
    })
      .then((dishes) => {
        console.log("Dishes loaded:", dishes)
        setDishes(dishes)
        setFilteredDishes(dishes)
      })
      .catch((error) => console.error("Error loading dishes:", error))
  }, [max, page])

  useEffect(() => {
    if (!dishes.length) {
      console.log("No dishes to filter")
      return
    }

    console.log("Applying filters:", filters)
    let result = [...dishes]

    if (filters) {
      // Filter by category (dinner, lunch, etc.)
      if (filters.category) {
        console.log("Filtering by category:", filters.category)
        result = result.filter(
          (dish) => dish.tags && dish.tags.some((tag) => tag.toLowerCase() === filters.category.toLowerCase()),
        )
      }

      // Filter by cuisine
      if (filters.cuisine && filters.cuisine.length > 0) {
        console.log("Filtering by cuisine:", filters.cuisine)
        result = result.filter((dish) => filters.cuisine.includes(dish.cuisine))
      }

      // Filter by diet
      if (filters.diet && filters.diet.length > 0) {
        console.log("Filtering by diet:", filters.diet)
        result = result.filter((dish) => filters.diet.every((dietTag) => dish.tags.includes(dietTag)))
      }

      // Filter by calories
      if (filters.calories && filters.calories.length === 2) {
        const [min, max] = filters.calories
        console.log("Filtering by calories:", min, "to", max)
        result = result.filter((dish) => dish.calories >= min && dish.calories <= max)
      }

      // Filter by duration
      if (filters.duration && filters.duration.length === 2) {
        const [min, max] = filters.duration
        console.log("Filtering by duration:", min, "to", max)
        result = result.filter((dish) => dish.duration >= min && dish.duration <= max)
      }

      // Filter by preparation
      if (filters.preparation && filters.preparation.length > 0) {
        console.log("Filtering by preparation:", filters.preparation)
        result = result.filter((dish) => dish.preparation && filters.preparation.includes(dish.preparation))
      }
    }

    // Apply sorting
    if (sortDishes) {
      console.log("Sorting dishes by:", sortDishes)
      switch (sortDishes) {
        case "name-asc":
          result.sort((a, b) => a.name.localeCompare(b.name))
          break
        case "name-desc":
          result.sort((a, b) => b.name.localeCompare(a.name))
          break
        case "duration-asc":
          result.sort((a, b) => a.duration - b.duration)
          break
        case "duration-desc":
          result.sort((a, b) => b.duration - a.duration)
          break
        case "calories-asc":
          result.sort((a, b) => a.calories - b.calories)
          break
        case "calories-desc":
          result.sort((a, b) => b.calories - a.calories)
          break
        default:
          break
      }
    }

    setFilteredDishes(result)
    setTotalPages(Math.ceil(result.length / itemsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [dishes, filters, sortDishes])

  // Get dishes by current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredDishes.slice(startIndex, endIndex)
  }

  // Change page
  const handlePageChange = (pageNumber) => {
    console.log("Changing to page:", pageNumber)
    setCurrentPage(pageNumber)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Dishes</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {getCurrentPageItems().length > 0 ? (
            getCurrentPageItems().map((dish) => <DishItem key={dish.id} dish={dish} />)
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No recipes matching your filters were found.
            </p>
          )}
        </div>

        {/* Paginación */}
        {filteredDishes.length > itemsPerPage && (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
        {/* Info Pagination */}
        <p className="pt-6 mb-4 text-sm text-gray-500 text-center">
          Total dishes: {dishes.length}, Filtered: {filteredDishes.length}, Page: {currentPage}/{totalPages}
        </p>
      </div>
    </div>
  )
}


export default DishList;
