import { Navbar, Footer } from "./components/ui/index"
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  DishesPage,
  DishPage,
  MealPlannerPage,
  AboutPage,
} from "./pages";

import PrivateRoute from "./guards/private-route";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dishes/:id" element={<DishPage />} />
        <Route
          path="/dishes"
          element={
              <DishesPage />
          }
        />
        <Route
          path="/planner"
          element={
            <PrivateRoute>
              <MealPlannerPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <AboutPage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;