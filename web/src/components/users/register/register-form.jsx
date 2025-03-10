import { Form, useForm } from "react-hook-form";
import * as MealsyAPI from "../../../services/api-service";
import InputField from "../../ui/inputs/input-field";
import FormButton from "../../ui/buttons/form-button";
import InputFile from "../../ui/inputs/input-file";
import { useAuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { register, handleSubmit, formState, setError, } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;

  const handleRegister = async (user) => {
    const formData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("avatar", user.avatar[0]);

    try {
      await MealsyAPI.register(formData);
      const data = await MealsyAPI.login(user);

      login(data);

      navigate("/");
    } catch (error) {
      const { data } = error.response;

      Object.keys(data.errors).forEach((inputName) =>
        setError(inputName, { message: data.errors[inputName] })
      );
    }
  };

  return (
    <div className="bg-beige-light p-6 pt-3 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="pb-5 text-center font-heading text-8xl text-brown-dark">
        Register
      </h2>
      <form onSubmit={handleSubmit(handleRegister)} data-testid="register-form">
        <InputField
          id="firstName"
          label="First Name"
          type="text"
          placeholder="Introduce your first name"
          register={register}
          errors={errors.firstName}
        />

        <InputField
          id="lastName"
          label="Last Name"
          type="text"
          placeholder="Introduce your last name"
          register={register}
          errors={errors.lastName}
        />

        <InputField
          id="username"
          label="Username"
          type="text"
          placeholder="Choose an username"
          register={register}
          errors={errors.username}
        />

        <InputField
          id="email"
          label="Email"
          type="email"
          placeholder="Introduce your email"
          register={register}
          errors={errors.email}
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Introduce your password"
          register={register}
          errors={errors.password}
        />

        <InputFile errors={errors} register={register} />

        <div className="d-grid mt-6 mb-2 text-center">
          <FormButton text="Sign Up" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
