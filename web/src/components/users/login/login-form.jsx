import { useForm } from "react-hook-form";
import * as MealsyAPI from "../../../services/api-service";
import { useAuthContext } from "../../../contexts/auth-context";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../ui/inputs/input-field";
import FormButton from "../../ui/buttons/form-button";

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setError, } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      user = await MealsyAPI.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      if (error.response?.status === 401) {
        const { data } = error.response;
        Object.keys(data.errors).forEach((inputName) =>
          setError(inputName, { message: data.errors[inputName] })
        );
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-beige-light p-6 pt-3 rounded-lg shadow-lg max-w-2xl mx-auto flex flex-col justify-center items-center">
      <h2 className="pb-3 text-center font-heading text-7xl text-brown-dark font-bold">
        Log in
      </h2>
      <form onSubmit={handleSubmit(handleLogin)} data-testid="login-form" className="w-full">
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
        <div className="d-grid mb-6 text-center">
          <FormButton text="Login"/>
        </div>
      </form>
      <div className="text-center mt-4">
        <p className="text-brown-medium">
          Not registered?{" "}
          <Link to="/register" className="text-brown-dark hover:text-brown-light font-semibold">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
