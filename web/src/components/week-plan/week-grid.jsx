import DayRow from "./day-row";

function WeekGrid({ weekPlan }) {
  return (
    <table className="w-full table-auto bg-white">
      <thead>
        <tr className="text-brown-dark font-bold border-b-2 border-gray-300">
          <th className="p-3"> DAY </th>
          <th className="p-3">BREAKFAST</th>
          <th className="p-3">LUNCH</th>
          <th className="p-3">DINNER</th>
        </tr>
      </thead>
      <tbody>
        {weekPlan?.map((day, index) => (
          <DayRow key={index} day={day} />
        ))}
      </tbody>
    </table>
  );
};

export default WeekGrid;
