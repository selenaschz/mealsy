import DishList from "../components/dishes/dish-list/dish-list";
import Filter from "../components/filters/meal-type-filter/filter";
import { PageLayout } from "../components/layouts";

function DishesPage() {
  return (
    <PageLayout>
      <Filter />
      <DishList max={20} />
    </PageLayout>
  );
}

export default DishesPage;
