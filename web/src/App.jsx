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
  ProfilePage,
} from "./pages";

import PrivateRoute from "./guards/private-route";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow h-full">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dishes/:id" element={<DishPage />} />
        <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>} />
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
              <AboutPage />
          }
        />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;