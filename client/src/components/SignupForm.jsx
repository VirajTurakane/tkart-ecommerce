import { PasswordCheck, Sms, Location, Call, User } from "iconsax-reactjs";
import { useNavigate } from "react-router-dom";

const SignupForm = ({ signupHandler, register, handleSubmit }) => {
  const navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(signupHandler)}
        className="flex flex-col gap-4 p-4 transition-all duration-300 ease-linear bg-white rounded-lg shadow-lg w-96 hover:scale-105"
      >
        <h2 className="text-2xl font-medium">Signup</h2>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 flex-[1.1] py-2.5 px-2 rounded-lg border-2 border-gray-500 focus-within:border-blue-500">
            <User size="22" color="#555555" />
            <input
              required
              type="text"
              placeholder="First Name"
              {...register("fname")}
              className="w-full bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center gap-2 flex-1 py-2.5 px-2 rounded-lg border-2 border-gray-500 focus-within:border-blue-500">
            <input
              required
              type="text"
              placeholder="Last Name"
              {...register("lname")}
              className="w-full bg-transparent outline-none"
            />
          </div>
        </div>

        <div className="input-field">
          <Call size="22" color="#555555" />
          <input
            accept="number"
            required
            type="text"
            placeholder="Phone"
            {...register("phone")}
            className="w-full outline-none"
          />
        </div>
        <div className="input-field">
          <Location size="22" color="#555555" />
          <input
            required
            type="text"
            placeholder="Address"
            {...register("address")}
            className="w-full outline-none"
          />
        </div>
        <div className="input-field">
          <Sms size="22" color="#555555" />
          <input
            required
            type="email"
            placeholder="Email"
            {...register("email")}
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
          className="transition-all duration-300 ease-in-out hover:bg-blue-950 rounded-lg text-white bg-blue-900 py-2.5"
        >
          Signup
        </button>
        <div className="flex items-center justify-center gap-1">
          <p>Already have an account?</p>
          <button
            className="font-medium text-blue-600"
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
