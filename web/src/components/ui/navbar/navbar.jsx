import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../../contexts/auth-context";

function Navbar() {
  const location = useLocation();
  // Verifico si estamos en la página de inicio (landpage/home)
  const isHomePage = location.pathname === "/";
  const { user } = useAuthContext()

  return (
    <nav
      className={`${
        isHomePage
          ? "absolute bg-transparent"
          : "relative bg-brown-dark border-brown-medium shadow-md"
      } z-10 w-full fixed`}
    >
      <div className="w-full flex items-center justify-between md:px-16 p-2">
        {/* Small screen Menu*/}
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-beige-light rounded-lg md:hidden hover:bg-brown-medium focus:outline-none focus:ring-2 focus:ring-brown-light"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu */}
        <div className="flex flex-grow justify-start">
          <ul className="hidden md:flex font-medium space-x-6">
            <li>
              <Link
                to="/dishes"
                className="block py-2 px-3 text-beige-light rounded-sm md:bg-transparent md:hover:text-beige-medium md:p-0 transition-colors duration-300"
              >
                Dishes
              </Link>
            </li>
            <li>
              <Link
                to="/planner"
                className="block py-2 px-3 text-beige-light rounded-sm md:bg-transparent md:hover:text-beige-medium md:p-0 transition-colors duration-300"
              >
                Meal Planner
              </Link>
            </li>
            <li>
              <Link
                to="/planner"
                className="block py-2 px-3 text-beige-light rounded-sm md:bg-transparent md:hover:text-beige-medium md:p-0 transition-colors duration-300"
              >
                Surprise Meal
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-beige-light rounded-sm md:bg-transparent md:hover:text-beige-medium md:p-0 transition-colors duration-300"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex flex-grow justify-center">
          <img
            src="/images/logo.png"
            className={`h-12 ${
              isHomePage ? "md:h-24 lg:h-24" : "md:h-20 lg:h-20"
            } me-10`}
            alt="Mealsy Logo"
          />
        </Link>

        {/* Search and User profile */}
        <div className="flex flex-grow justify-end items-center space-x-4">
          <input
            type="text"
            id="search-navbar"
            className="block w-16 md:w-64 p-2 ps-10 text-sm text-brown-dark border border-beige-medium rounded-lg bg-beige-warm focus:ring-2 focus:ring-brown-light focus:outline-none focus:border-beige-medium dark:bg-beige-light dark:border-brown-medium dark:text-brown-dark dark:focus:ring-brown-light dark:focus:border-beige-medium"
            placeholder="Search..."
          />
          {user && (
            <button
              type="button"
              className="flex text-sm bg-brown-medium rounded-full md:me-0 focus:ring-4 focus:ring-brown-light"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-10 h-10 md:w-16 md:h-16 rounded-full"
                src="https://i.pinimg.com/736x/80/61/f2/8061f2ea2fa12cf52ce04fb9e9d34d07.jpg"
                alt="user photo"
              />
            </button>
          )}

          {/* Dropdown */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-beige-light divide-y divide-beige-medium rounded-lg shadow-md"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-brown-dark font-semibold">
                {/*Me falta poner Nombre*/}
              </span>
              <span className="block text-sm text-brown-medium truncate">
                {/*Falta Correo*/}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {["Dashboard", "Settings", "Earnings", "Sign out"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-brown-dark hover:bg-beige-medium hover:text-beige-light rounded"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
