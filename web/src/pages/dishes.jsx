import DishList from "../components/dishes/dish-list/dish-list";
import { PageLayout } from "../components/layouts";

function DishesPage() {
  return (
    <PageLayout>
      <DishList max={10} />
    </PageLayout>
  );
}

export default DishesPage;
