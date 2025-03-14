import { useState } from "react";
import { formatDuration } from "../../../utils/utils";

const RangeFilter = ({ min, max, step, unit, type }) => {
  const [values, setValues] = useState([min, max]);

  const handleChange = (e, index) => {
    const newValues = [...values];
    newValues[index] = Number(e.target.value);
    setValues(newValues);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label> Min </label>
        <div className="flex gap-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={values[0]}
            onChange={(e) => handleChange(e, 0)}
            className="w-full"
          />
          <input
            type="number"
            value={values[0]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleChange(e, 0)}
            className="w-20 p-1 border rounded"
          />
        </div>
        <label> Max </label>
        <div className="flex gap-4">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={values[1]}
            onChange={(e) => handleChange(e, 1)}
            className="w-full"
          />
          <input
            type="number"
            value={values[1]}
            min={min}
            max={max}
            step={step}
            onChange={(e) => handleChange(e, 1)}
            className="w-20 p-1 border rounded"
          />
        </div>
      </div>

      <p>
        {type === "duration"
          ? `${formatDuration(values[0])} - ${formatDuration(values[1])}`
          : `${values[0]} ${unit} - ${values[1]} ${unit}`}
      </p>
    </div>
  );
};

export default RangeFilter;
