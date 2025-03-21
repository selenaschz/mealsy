import React from "react";

function InputFile({ errors, register, onImageChange = () => {} }) {
  return (
    <div className="mb-4">
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className={`block text-sm file:py-2 file:px-4 rounded-lg p-2 text-center text-brown-dark file:bg-brown-dark ${
          errors.avatar ? "border-red-500" : "border-gray-300"
        } focus:ring-blue-500 focus:border-blue-500`}
        {...register("avatar")}
      />
      {errors.avatar && (
        <div className="mt-2 text-sm text-red-900">{errors.avatar.message}</div>
      )}
    </div>
  );
}

export default InputFile;
