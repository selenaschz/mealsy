import { useEffect, useState } from "react"
import * as MealsyAPI from "../services/api-service"
import WeekPlan from '../components/week-plan/week-grid';
import WeekGrid from "../components/week-plan/week-grid";
import PageLayout from './../components/layouts/page-layout/page-layout';
import html2pdf from "html2pdf.js";

function MealPlannerPage() {
  const [weekPlan, setWeekPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);
  //   MealsyAPI.getRandomWeekPlan()
  //     .then((plan) => {
  //       setWeekPlan(plan.week);
  //       console.log(plan.week)
  //       localStorage.setItem("weekPlan", JSON.stringify(plan.week));
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching week plan:', error);
  //     })
  //     .finally (() => {
  //       setIsLoading(false);
  //     });
  // }, [update]);

  const handleUpdate = () => {
    fetchPlan();
  }

  const handleDownloadPDF = () => {
    const element = document.getElementById("meal-planner");
    const opt = {
      margin: 1,
      filename: "meal-planner.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const fetchPlan = () => {
    setIsLoading(true);
    MealsyAPI.getRandomWeekPlan()
      .then((plan) => {
        setWeekPlan(plan.week);
        localStorage.setItem("weekPlan", JSON.stringify(plan.week));
      })
      .catch((error) => {
        console.error("Error fetching week plan:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const storedPlan = localStorage.getItem("weekPlan");
    if (storedPlan) {
      setWeekPlan(JSON.parse(storedPlan));
    } else {
      fetchPlan();
    }
  }, []);

  return (
    <PageLayout className="bg-beige-light">
     {isLoading && (
        <div className="flex w-screen h-screen inset-0 justify-center items-center bg-beige-light fixed z-10">
          <img src="/images/load.gif" className="w-40" alt="Loading..." />
        </div>
      )}
    <div id="meal-planner" className="max-w-5xl mx-auto p-4 bg-beige-light pb-10">
      <header className="bg-beige-light p-6 text-center flex flex-col justify-center items-center">
        <h1 className="font-heading text-7xl text-brown-dark font-bold">Your Weekly Meal Plan</h1>
        <img src="/images/cook.gif" alt="cook" className="w-40"/>
        <div className="w-full flex justify-end">
          <button className="hover:bg-brown-dark p-1 rounded-full cursor-pointer" onClick={handleUpdate}>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" id="Refresh--Streamline-Solar" height="30" width="30"><desc>Refresh Streamline Icon: https://streamlinehq.com</desc><path d="M8.0526 1.5c-3.1956666666666664 0 -5.822746666666667 2.4419999999999997 -6.078899999999999 5.555533333333333h-0.6403533333333333c-0.20258666666666664 0 -0.3851533333333333 0.12226666666666666 -0.46231333333333335 0.3096 -0.07715999999999999 0.18733333333333335 -0.033659999999999995 0.4026666666666666 0.11015333333333333 0.5453333333333332l1.1198733333333333 1.1111333333333333c0.19494 0.19340000000000002 0.5093866666666667 0.19340000000000002 0.7043266666666665 0l1.1198733333333333 -1.1111333333333333c0.14381333333333332 -0.14266666666666666 0.18731333333333333 -0.358 0.11015333333333333 -0.5453333333333332 -0.07715999999999999 -0.18733333333333335 -0.25972666666666666 -0.3096 -0.46231333333333335 -0.3096H2.9778666666666664C3.2310133333333333 4.501113333333333 5.403193333333332 2.5 8.0526 2.5c1.8463333333333332 0 3.4625333333333335 0.9722999999999999 4.357799999999999 2.4285266666666665 0.1446 0.23524 0.4525333333333333 0.3087066666666667 0.6878 0.16408666666666666 0.23526666666666665 -0.14462 0.3087333333333333 -0.4525666666666666 0.16406666666666667 -0.6878066666666666C12.191399999999998 2.662846666666667 10.258199999999999 1.5 8.0526 1.5Z" fill="#96865a" strokeWidth="0.6667"></path><path d="M13.894066666666667 6.977733333333333c-0.19473333333333334 -0.19253333333333333 -0.5081333333333333 -0.19253333333333333 -0.7029333333333333 0l-1.1241333333333332 1.1111333333333333c-0.14426666666666665 0.14253333333333332 -0.18806666666666666 0.358 -0.11106666666666666 0.5456 0.07706666666666666 0.18753333333333333 0.2597333333333333 0.31 0.4625333333333333 0.31h0.5993999999999999c-0.2542 2.553 -2.433933333333333 4.555533333333333 -5.096 4.555533333333333 -1.8550266666666666 0 -3.47796 -0.9731333333333333 -4.37656 -2.4292666666666665 -0.14502666666666666 -0.235 -0.45308666666666664 -0.3079333333333333 -0.6880866666666666 -0.16286666666666666 -0.23499333333333333 0.145 -0.3079333333333333 0.4530666666666666 -0.16291333333333333 0.6880666666666666C3.76938 13.338000000000001 5.709373333333333 14.5 7.921866666666666 14.5c3.2052 0 5.843133333333332 -2.440533333333333 6.100199999999999 -5.555533333333333h0.6447333333333333c0.20273333333333332 0 0.38539999999999996 -0.12246666666666667 0.46246666666666664 -0.31 0.07706666666666666 -0.1876 0.03319999999999999 -0.4030666666666667 -0.111 -0.5456l-1.1241999999999999 -1.1111333333333333Z" fill="#96865a" strokeWidth="0.6667"></path></svg>
          </button>
        </div>
      </header>
      <WeekGrid weekPlan={weekPlan} />
    </div>
    <div className="flex justify-center mt-4 pb-40">
        <button
          className="px-4 py-2 bg-brown-dark text-white rounded-lg hover:bg-brown-light transition-colors"
          onClick={handleDownloadPDF}
        >
          Download PDF
        </button>
      </div>
    </PageLayout>
  );
}

export default MealPlannerPage
