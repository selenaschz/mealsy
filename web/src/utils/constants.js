const cuisineCountry = {
  italian: "it",
  mexican: "mx",
  chinese: "cn",
  indian: "in",
  japanese: "jp",
  american: "us",
  french: "fr",
  mediterranean: "gr",
  "middle eastern": "sa",
  thai: "th",
  greek: "gr",
  spanish: "es",
  vietnamese: "vn",
  turkish: "tr",
  korean: "kr",
  african: "za",
  caribbean: "jm",
  german: "de",
  brazilian: "br",
  ethiopian: "et",
};

const sortOptions = [
  { label: "Name (A-Z)", value: "name-asc" },
  { label: "Name (Z-A)", value: "name-desc" },
  { label: "Duration (Low to High)", value: "duration-asc" },
  { label: "Duration (High to Low)", value: "duration-desc" },
  { label: "Calories (Low to High)", value: "calories-asc" },
  { label: "Calories (High to Low)", value: "calories-desc" }
];

// Categories
const mealCategories = ["BREAKFAST", "LUNCH", "DINNER"];

// Filter Options 
const filters = [
  {
    id: "diet",
    name: "Diet",
    options: [
      { value: "vegan", label: "Vegan", checked: false },
      { value: "vegetarian", label: "Vegetarian", checked: false },
      { value: "gluten-free", label: "Gluten Free", checked: false },
      { value: "dairy-free", label: "Dairy Free", checked: false },
      { value: "high-protein", label: "High Protein", checked: false },
    ],
  },
  {
    id: "preparation",
    name: "Preparation",
    options: [
      { value: "cooked", label: "Cooked", checked: false },
      { value: "cold", label: "Cold", checked: false },
    ],
  },
  {
    id: "cuisine",
    name: "Cuisine",
    options: Object.entries(cuisineCountry).map(([cuisine, code]) => ({
      value: cuisine,
      label: cuisine.charAt(0).toUpperCase() + cuisine.slice(1), // Upper Case -> First letter
      code: code,
      checked: false,
    })),
  },
];

  export {
    cuisineCountry,
    sortOptions,
    mealCategories,
    filters
  }