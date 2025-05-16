import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { auth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth && auth.success) {
      navigate("/");
    }
  }, [auth, navigate]);

  async function loginHandler(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    dispatch(login({ email, password }));
  }
  return (
    <div>
      <form onSubmit={loginHandler}>
        <input type="text" placeholder="Email" ref={emailRef} />
        <input type="text" placeholder="Password" ref={passwordRef} />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
