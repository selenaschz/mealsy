import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { mealCategories, sortOptions, filters } from "../../../utils/constants";
import RangeFilter from "../range-filter/range-filter";

function Filter() {
  const [showFilters, setShowFilters] = useState(false);
  const [duration, setDuration] = useState(60);
  const [calories, setCalories] = useState(400);
  const [sortClicked, setSortClicked] = useState("Most popular")
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleToggleMenu = () => {
    setShowFilters(!showFilters);
  };

  const handleSortClick = (option) => {
    setSortClicked(option);
  }

  /* Breakfast, lunch or dinner */
  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  return (
    <div className="bg-white">
    {/* OPTIONS -> SHOW MENUS */}
      <div className="bg-white flex justify-end p-4 gap-6">
        {/* Filter Button */}
        <button
          onClick={handleToggleMenu}
          className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
        >
          <img src="/src/assets/icons/filter.svg" alt="Filters" width="40px" />
          FILTERS
        </button>
        {/* Sort options */}
        <div className="flex items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
                <img src="/src/assets/icons/sort.svg" alt="Sort" width="35px"/>
                SORT
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                {sortOptions.map((option) => (
                  <MenuItem key={option}>
                    <button
                      href={option.href}
                      onClick={() => handleSortClick(option)}
                      className={`${sortClicked === option} ? " text-gray-900" : "text-gray-500"} block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden`}
                    >
                      {option}
                    </button>
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>

      {/* FILTERS MENU */}
      <Dialog
        open={showFilters}
        onClose={() => setShowFilters(false)}
        className="relative"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        {/* MENU */}
        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 px-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
          >
            <div className="flex items-center justify-end px-4">
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 50 50"
                >
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
                </svg>
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <button className="text-sm px-4 py-3 flex justify-center text-gray-900 cursor-pointer">
              CLEAR FILTERS
            </button>
            {/* Filters */}
            <form className="mt-4 border-t border-gray-200">
              <h3 className="sr-only">Categories</h3>
              <ul
                role="list"
                className="space-y-4 border-b border-gray-200 py-3 text-sm text-gray-900"
              >
              {/* Categories: Breakfast, Lunch and Dinner */}
                {mealCategories.map((category) => (
                  <li key={category}>
                    <button onClick={() => handleCategoryChange(category)}>{category}</button>
                  </li>
                ))}
              </ul>
              
              {/* Filter Options */}
              {filters.map((section) => (
                <Disclosure key={section.id} as="div" className="border-b border-gray-200 py-4" >
                  <h3 className="-my-3 flow-root">
                    <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                      <span className="text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center"></span>
                    </DisclosureButton>
                  </h3>
                  <DisclosurePanel className="py-4">
                    <div className="space-y-4">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex gap-3">
                          <div className="flex h-5 shrink-0 items-center">
                            <div className="group grid size-4 grid-cols-1">
                              <input defaultValue={option.value} defaultChecked={option.checked} id={`filter-${section.id}-${optionIdx}`} name={`${section.id}[]`} type="checkbox"
                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                              />
                              <svg fill="none" viewBox="0 0 14 14"
                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                              >
                                <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-checked:opacity-100" />
                                <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-indeterminate:opacity-100" />
                              </svg>
                            </div>
                          </div>
                          <label
                            htmlFor={`filter-${section.id}-${optionIdx}`}
                            className="text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              ))}
              {/*Duration and Calories*/}
              <Disclosure key="duration" as="div" className="border-b border-gray-200 py-4" >
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className=" text-gray-900">Duration</span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <RangeFilter type="duration" min={0} max={600} step={5} onChange={(e) => setDuration(Number(e.target.value))} unit="mins"  />
                </DisclosurePanel>
              </Disclosure>
              <Disclosure key="calories" as="div" className="border-b border-gray-200 py-4" >
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className=" text-gray-900">Calories</span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <RangeFilter type="calories" min={0} max={700} step={5} onChange={(e) => setCalories(Number(e.target.value))} unit="kcal" />
                </DisclosurePanel>
              </Disclosure>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default Filter;
