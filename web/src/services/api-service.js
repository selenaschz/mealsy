import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

http.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
    /* if (error.reponse?.status === 401 &&
      window.location.pathname !== "/login") {
        localStorage.removeItem("user");
        window.location.assign("/login");
      }
    }*/
  }
);

// Profile
const profile = (username) => http.get(`/users/${username}`);

// Register
const register = (user) => http.post("/users", user);

// Login and Logout (session)
const login = (user) => http.post("/sessions", user);
const logout = () => http.delete("/sessions");

// Dishes 
const listDishes = ({ limit, page, cuisine, tags, ingredients, caloriesMin, caloriesMax, duration }) => {
  limit = Number.isNaN(Number(limit)) || Number(limit) <= 0 ? 20 : limit;
  page = Number.isNaN(Number(page)) || Number(page) <= 0 ? undefined : page;

  const tagList = tags ? tags.join(",") : "";
  const ingredientsList = ingredients ? ingredients.join(",") : "";
  const durationRange = duration?.length === 2 ? duration.join(",") : duration;

  return http.get("/dishes", {
    params: {
      limit,
      page,
      cuisine,
      tags: tagList,
      ingredients: ingredientsList,
      caloriesMin,
      caloriesMax,
      duration: durationRange,
    },
  });
}  


const getDish = (id) => http.get(`/dishes/${id}`);
const getReviews = (id) => http.get(`/dishes/${id}/reviews`)


export {
    profile,
    register,
    login,
    logout, 
    listDishes, 
    getDish,
    getReviews
};
