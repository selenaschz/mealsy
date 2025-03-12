import { useParams } from "react-router-dom"
import DishDetail from "../components/dishes/dish-detail/dish-detail"
import { PageLayout } from "../components/layouts"

function DishPage() {
  const { id } = useParams();

  return (
    <PageLayout>
      <DishDetail id={id} />
    </PageLayout>
  )
}

export default DishPage