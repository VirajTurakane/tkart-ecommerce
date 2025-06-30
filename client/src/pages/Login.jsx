import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm.jsx";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth?.success && auth?.email && auth?.id) {
      toast.success(auth.message);
      console.log(auth);
      
      navigate("/", { replace: true });
    }
  }, [auth, navigate]);

  const loginHandler = (data) => {
    dispatch(login({ email: data.email, password: data.password }));
  };

  return (
    <div className="flex flex-col">
      <LoginForm
        loginHandler={loginHandler}
        register={register}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
