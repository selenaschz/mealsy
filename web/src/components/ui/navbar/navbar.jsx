import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#7F5539] border-b border-[#9C6644] shadow-md">
      <div className="w-full flex flex-wrap items-center justify-between px-6 p-2">
        {/* Logo */}
        <Link to="/">
          <img src="/public/logo.png" className="h-20" alt="Mealsy Logo" />
        </Link>

        {/* User Menu */}
        <div className="flex items-center md:order-2 space-x-3 md:space-x-4 rtl:space-x-reverse">
          <input
            type="text"
            id="search-navbar"
            className="block w-64 p-2 ps-10 text-sm text-[#7F5539] border border-[#DDB892] rounded-lg bg-[#E6CCB2] focus:ring-2 focus:ring-[#B08968] focus:outline-none focus:border-[#DDB892] dark:bg-[#EDE0D4] dark:border-[#9C6644] dark:text-[#7F5539] dark:focus:ring-[#B08968] dark:focus:border-[#DDB892]"
            placeholder="Search..."
          />
          <button
            type="button"
            className="flex text-sm bg-[#9C6644] rounded-full md:me-0 focus:ring-4 focus:ring-[#B08968]"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-16 h-16 rounded-full"
              src="https://i.pinimg.com/736x/80/61/f2/8061f2ea2fa12cf52ce04fb9e9d34d07.jpg"
              alt="user photo"
            />
          </button>

          {/* Dropdown */}
          <div
            className="z-50 hidden my-4 text-base list-none bg-[#EDE0D4] divide-y divide-[#DDB892] rounded-lg shadow-md"
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-[#7F5539] font-semibold">
                {/*Me falta poner Nombre*/}
              </span>
              <span className="block text-sm text-[#9C6644] truncate">
                {/*Falta Correo*/}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              {["Dashboard", "Settings", "Earnings", "Sign out"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-[#7F5539] hover:bg-[#DDB892] hover:text-[#EDE0D4] rounded"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-[#EDE0D4] rounded-lg md:hidden hover:bg-[#9C6644] focus:outline-none focus:ring-2 focus:ring-[#B08968]"
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
        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:space-x-14 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <Link to ="/dishes" 
                className="block py-2 px-3 text-[#EDE0D4] rounded-sm md:bg-transparent md:hover:text-[#DDB892] md:p-0 transition-colors duration-300">
                Dishes
              </Link>
            </li>
            <li>
              <Link to="/planner"
                className="block py-2 px-3 text-[#EDE0D4] rounded-sm md:bg-transparent md:hover:text-[#DDB892] md:p-0 transition-colors duration-300">
                Meal Planner
              </Link>
            </li>
            <li>
              <Link to="/about"
                className="block py-2 px-3 text-[#EDE0D4] rounded-sm md:bg-transparent md:hover:text-[#DDB892] md:p-0 transition-colors duration-300">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
