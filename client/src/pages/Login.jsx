import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.success) {
      navigate("/");
    }
  }, [auth, navigate]);

  function loginHandler(data) {
    const email = data.email;
    const password = data.password;

    dispatch(login({ email, password }));

    navigate("/");
  }
  return (
    <div>
      <LoginForm
        loginHandler={loginHandler}
        register={register}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
