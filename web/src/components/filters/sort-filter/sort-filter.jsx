import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { sortOptions} from "../../../utils/constants";

function SortFilter({ setSortClicked, sortClicked }) {
  const handleSortClick = (option) => {
    setSortClicked(option)
  }

  return (
    <div className="flex items-center">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <img src="/src/assets/icons/sort.svg" alt="Sort" width="35px" />
            SORT
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
        >
          <div className="py-1">
            {sortOptions.map((option) => (
              <MenuItem key={option}>
                {({ active }) => (
                  <button
                    onClick={() => handleSortClick(option)}
                    className={`${
                      sortClicked === option ? "text-gray-900 font-medium" : "text-gray-500"
                    } ${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm`}
                  >
                    {option}
                  </button>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  )
}

export default SortFilter
