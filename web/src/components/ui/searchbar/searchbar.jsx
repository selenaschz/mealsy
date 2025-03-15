import { useState, useEffect, useRef } from "react";
import * as MealsyAPI from "../../../services/api-service.js";
import { Link } from "react-router-dom";

function SearchBar({}) {
  const [name, setName] = useState("");
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setLoading(true);
    document.addEventListener("mousedown", handleClickOutside);

    MealsyAPI.listDishes({
      page: 0,
      limit: 100,
    })
      .then((dish) => {
        setDishes(dish);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading dishes:", error);
        setLoading(false);
      });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (name.length >= 3) {
      const filtered = dishes.filter((dish) =>
        dish.name.toLowerCase().includes(name.toLowerCase())
      );
      setFilteredDishes(filtered);
    } else {
      setFilteredDishes([]);
    }
  }, [name, dishes]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} className="search-container relative">
      <input
        type="text"
        id="search-navbar"
        className={`${isOpen ? "pb-10 focus:ring-0" : "focus:border-beige-medium focus:ring-2"} block w-16 md:w-64 p-4 ps-10 text-sm text-brown-dark border border-beige-medium rounded-full bg-beige-warm focus:ring-brown-light focus:outline-none  dark:bg-beige-light dark:border-brown-medium dark:text-brown-dark dark:focus:ring-brown-light dark:focus:border-beige-medium`}
        placeholder="Search for dishes..."
        onChange={(e) => {
          setName(e.target.value);
          setIsOpen(true);
        }}
      />
      {loading && <p className="text-beige-light">Searching...</p>}
      {/* Dropwdown with results */}
      {isOpen && filteredDishes.length > 0 && (
        <ul className="absolute w-full -mt-9 bg-beige-light border-b border-brown-light max-h-32 overflow-y-auto z-10 shadow-lg">
          {filteredDishes.map((dish, index) => (
            <Link
              to={`/dishes/${dish.id}`}
              key={index}
              onClick={() => setIsOpen(false)}
            >
              <li className="flex justify-between p-4 text-sm text-brown-dark cursor-pointer hover:bg-beige-light dark:hover:bg-brown-light">
                {dish.name}
                <img
                  src={dish.image}
                  className="w-8 h-6 object-cover"
                  alt={dish.name}
                />
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
