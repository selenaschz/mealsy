import { useState } from "react"
import * as MealsyAPI from "/src/services/api-service.js"
import { useEffect } from "react";

function DishDetail({ id }) {
    const [dish, setDish] = useState();

    useEffect(() => {
        MealsyAPI.getDish(id)
            .then((dish) => setDish(dish))
            .catch((error) => console.error(error));
    }, [id]);

    if(!dish) {
        return null;
    } else {
        return (
            <div>{dish.name}</div>
        )
    }
}

export default DishDetail