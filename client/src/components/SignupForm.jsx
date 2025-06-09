import { PasswordCheck, Sms, Location, Call, User } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";
import Input from "../components/shared/Input";

const SignupForm = ({ signupHandler, register, handleSubmit }) => {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleSubmit(signupHandler)}
        className="flex flex-col gap-4 p-4 transition-all duration-300 ease-linear bg-gray-100 rounded-lg shadow-lg w-96 hover:scale-105"
      >
        <h2 className="text-2xl font-medium">Signup</h2>
        <div className="flex gap-2">
          <div className="input-field flex-[1.1]">
            <User size="22" color="#555555" />
            <input
              required
              type="text"
              placeholder="First Name"
              {...register("fname")}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex-1 input-field">
            <input
              required
              type="text"
              placeholder="Last Name"
              {...register("lname")}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <Input
          icon={<Call size="22" color="#555555" />}
          name={"phone"}
          placeholder={"Phone"}
          register={register}
          required={true}
          type={"text"}
        />

        <Input
          icon={<Location size="22" color="#555555" />}
          name={"address"}
          placeholder={"Address"}
          register={register}
          required={true}
          type={"text"}
        />
        
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
          className="cursor-pointer transition-all duration-300 ease-in-out hover:bg-tblack rounded-lg text-twhite bg-primary-200 py-2.5"
        >
          Signup
        </button>
        <div className="flex items-center justify-center gap-1">
          <p>Already have an account?</p>
          <button
            className="font-medium cursor-pointer text-primary-50"
            onClick={navigateToLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
