import { useEffect, useState } from "react"
import * as MealsyAPI from "../services/api-service"
import WeekPlan from '../components/week-plan/week-grid';
import WeekGrid from "../components/week-plan/week-grid";
import PageLayout from './../components/layouts/page-layout/page-layout';

function MealPlannerPage() {
  const [weekPlan, setWeekPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    MealsyAPI.getRandomWeekPlan()
      .then((plan) => {
        setWeekPlan(plan.week);
        console.log(plan.week)
      })
      .catch((error) => {
        console.error('Error fetching week plan:', error);
      })
      .finally (() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <PageLayout>
    <div className="max-w-5xl mx-auto p-4 bg-[#8a7a4e] rounded-lg pb-8">
      <header className="bg-[#8a7a4e] p-6 rounded-lg text-center mb-6">
        <h1 className="text-4xl font-bold text-[#f5f0e1]">YOUR WEEKLY MEAL PLAN</h1>
      </header>
      <WeekGrid weekPlan={weekPlan} />
    </div>
    </PageLayout>
  );
}

export default MealPlannerPage
