import { Link } from "react-router-dom";

function DayRow({ day }) {
  return (
    <tr className="text-center border-1 border-white">
      <td className="bg-[#f8984e] p-2 font-bold text-white border-1">
        {day.day.toUpperCase()}
      </td>
      <td className="bg-[#5e5334] hover:bg-[#ad9d6f] p-3 text-white text-sm border-1 cursor-pointer">
        <Link to={`/dishes/${day.breakfast?.id}`}>{day.breakfast?.name}</Link>
      </td>
      <td className="bg-[#5e5334] hover:bg-[#ad9d6f] p-3 text-white text-sm border-1 cursor-pointer">
        <Link to={`/dishes/${day.lunch?.id}`}>{day.lunch?.name}</Link>
      </td>
      <td className="bg-[#5e5334] hover:bg-[#ad9d6f] p-3 text-white text-sm border-1 cursor-pointer">
        <Link to={`/dishes/${day.dinner?.id}`}>{day.dinner?.name}</Link>
      </td>
    </tr>
  );
}

export default DayRow;
