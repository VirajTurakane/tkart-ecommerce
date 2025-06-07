import { useNavigate } from "react-router-dom";
import { PasswordCheck, Sms } from "iconsax-reactjs";
import "../globals.css";

const LoginForm = ({ loginHandler, register, handleSubmit }) => {
  const navigate = useNavigate();

  function navigateToSignup() {
    navigate("/signup");
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="flex flex-col justify-center gap-4 p-4 transition-all duration-300 ease-linear bg-white rounded-lg shadow-lg hover:scale-105 w-96 "
      >
        <h2 className="text-2xl font-medium">Welcome back,</h2>
        <div className="input-field">
          <Sms size="22" color="#555555" />{" "}
          <input
            {...register("email")}
            required
            type="email"
            placeholder="Email"
            className="w-full outline-none"
          />
        </div>
        <div className="input-field">
          <PasswordCheck size="22" color="#555555" />
          <input
            required
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full outline-none"
          />
        </div>
        <button
          type="submit"
          className="transition-all duration-300 ease-in-out bg-blue-900 py-2.5 rounded-lg text-base font-medium text-white hover:bg-blue-950"
        >
          Login
        </button>
        <p className="self-center">
          Already have an account?{" "}
          <button
            onClick={navigateToSignup}
            className="font-medium text-blue-600"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
