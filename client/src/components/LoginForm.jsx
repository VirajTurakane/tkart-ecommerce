import { useNavigate } from "react-router-dom";
import { PasswordCheck, Sms } from "iconsax-reactjs";
import Input from "../components/shared/Input";

const LoginForm = ({ loginHandler, register, handleSubmit }) => {
  const navigate = useNavigate();

  function navigateToSignup() {
    navigate("/signup");
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(loginHandler)}
        className="flex flex-col justify-center gap-4 p-4 transition-all duration-300 ease-linear bg-gray-100 rounded-lg shadow-lg hover:scale-105 w-96 "
      >
        <h2 className="text-2xl font-medium text-tblack">Welcome back,</h2>
        <Input
          icon={<Sms size="22" color="#555555" />}
          name={"email"}
          placeholder={"Email"}
          register={register}
          required={true}
          type={"email"}
        />
        <Input
          icon={<PasswordCheck size="22" color="#555555" />}
          name={"password"}
          placeholder={"Password"}
          register={register}
          required={true}
          type={"password"}
        />

        <button
          type="submit"
          className="cursor-pointer transition-all duration-300 ease-in-out bg-primary-200 py-2.5 rounded-lg text-base font-medium text-twhite hover:bg-tblack"
        >
          Login
        </button>
        <p className="self-center">
          Already have an account?{" "}
          <button
            onClick={navigateToSignup}
            className="font-medium cursor-pointer text-primary-50"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
