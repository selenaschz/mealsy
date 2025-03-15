import { useState } from "react";
import DishList from "../components/dishes/dish-list/dish-list";
import { PageLayout } from "../components/layouts";
import Filters from "../components/filters/filters";
import SortFilter from "../components/filters/sort-filter/sort-filter";

function DishesPage() {
  const [sortClicked, setSortClicked] = useState("Most popular");
  const [filters, setFilters] = useState({
    category: "",
    duration: [0, 600],
    calories: [0, 700],
    diet: [],
    preparation: [],
    cuisine: [],
  })

  // Update filters (from Filters component)
  const handleFiltersChange = (filters) => {
    setFilters(filters)
  }

  return (
    <PageLayout>
      <div className="bg-white flex justify-end p-4 gap-6">
        <Filters onFiltersChange={handleFiltersChange} />
        <SortFilter setSortClicked={setSortClicked} sortClicked={sortClicked} />
      </div>
      <DishList max={20} page={0} filters={filters} sort={sortClicked} />
    </PageLayout>
  );
}

export default DishesPage;
