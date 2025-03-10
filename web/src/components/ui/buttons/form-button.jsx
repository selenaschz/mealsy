import React from "react";

function FormButton({ text = ""}) {
  return (
    <button
      className="bg-brown-dark text-beige-light hover:bg-brown-medium rounded-lg py-2 px-4 cursor-pointer focus:ring-4 focus:ring-brown-light"
      type="submit"
    >
      {text}
    </button>
  );
}

export default FormButton;
