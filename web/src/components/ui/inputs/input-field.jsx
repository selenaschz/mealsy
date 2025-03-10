function InputField({ id, label, type = 'text', placeholder, register, errors }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm text-brown-dark mb-2 font-bold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`bg-[#fcf5f0] border ${
          errors ? "border-[#9b392c]" : "border-beige-medium"
        } text-brown-dark placeholder-brown-dark text-sm rounded-lg focus:ring-brown-light focus:border-beige-medium focus:outline-none block w-full p-2.5 dark:border-brown-medium dark:placeholder-brown-medium dark:text-brown-dark`}
        {...register(id, { required: "Mandatory field" })}
      />
      {errors && (
        <span className="text-xs text-[#9b392c]">{ errors.message }</span>
      )}
    </div>
  );
}

export default InputField;
