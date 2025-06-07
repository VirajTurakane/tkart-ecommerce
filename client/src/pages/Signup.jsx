import { useEffect, useRef } from "react";
import SignupForm from "../components/SignupForm";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.success) {
      navigate("/");
    }
  }, [auth, navigate]);

  function signupHandler(data) {
    const email = data.email;
    const password = data.password;
    const fname = data.fname;
    const lname = data.lname;
    const phone = data.phone;
    const address = data.address;

    const user = {
      email,
      password,
      fname,
      lname,
      phone,
      address,
    };
    dispatch(signup(user));

    navigate("/");
  }

  return (
    <div>
      <SignupForm
        signupHandler={signupHandler}
        register={register}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Signup;
