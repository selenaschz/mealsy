import { Link } from "react-router-dom";

function DishItem({ dish }) {
  const { id, name, image } = dish;

  return (
    <div className="group pb-10">
      <Link to={`/dishes/${id}`}>
      <picture className="overflow-hidden block">
        <img
          src={image}
          alt={name}
          className="aspect-square w-full h-full bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8 filter brightness-90 contrast-90 hover:scale-110 ease-in duration-150"
        />
      </picture>
        <h3 className="mt-4 text-md text-brown-dark font-bold hover:text-beige-medium">{name}</h3>
      </Link>
    </div>
  );
}

export default DishItem;
