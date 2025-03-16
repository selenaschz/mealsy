function DayRow({ day }) {
  return (
    <tr className="text-center border-1 border-white">
      <td className="bg-[#f8984e] p-2 font-bold text-white border-1">{day.day.toUpperCase()}</td>
      <td className="bg-[#5e5334] p-3 text-white text-sm border-1">{day.breakfast?.name || 'No data'}</td>
      <td className="bg-[#5e5334] p-3 text-white text-sm border-1">{day.lunch?.name || 'No data'}</td>
      <td className="bg-[#5e5334] p-3 text-white text-sm border-1">{day.dinner?.name || 'No data'}</td>
    </tr>
  );
}

export default DayRow;