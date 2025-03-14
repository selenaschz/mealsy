import { useState } from "react";
import { formatDuration } from "../../../utils/utils";

const RangeFilter = ({ min, max, step, unit, type, sectionKey, onChange }) => {
  const [values, setValues] = useState([min, max])

  const handleChange = (event, index) => {
    const newValues = [...values]
    newValues[index] = Number(event.target.value)

    // Min value doesn't exceed max value
    if (index === 0 && newValues[0] > newValues[1]) {
      newValues[0] = newValues[1]
    }

    // Max value doesn't go below min value
    if (index === 1 && newValues[1] < newValues[0]) {
      newValues[1] = newValues[0]
    }

    setValues(newValues)
    onChange(sectionKey, newValues)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1"> Min </label>
        <div className="flex gap-4 items-center">
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
        <label className="text-sm text-gray-600 mb-1 mt-2"> Max </label>
        <div className="flex gap-4 items-center">
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

      <p className="text-sm text-gray-700">
        {type === "duration"
          ? `${formatDuration(values[0])} - ${formatDuration(values[1])}`
          : `${values[0]} ${unit} - ${values[1]} ${unit}`}
      </p>
    </div>
  )
}

export default RangeFilter

