import { useState } from "react";
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signIn,auth,user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      toast.success("signIn..");
      console.log('Auth:', auth.currentUser)
      console.log('user:', user)
      sessionStorage.setItem('uid', auth.currentUser.uid)
      navigate("/");
    } catch (e) {
      setErr(true);
      setEmail("");
      setPassword("");
      toast.error(e.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* <div className="m-auto max-w-md w-full bg-white"> */}
      <div className="m-auto max-w-lg flex h-[400px]  shadow-lg	 justify-center flex-col w-full bg-white">
        <form
          onSubmit={handleSubmit}
          className="p-4 flex gap-4 flex-col items-center"
        >
          <h1 className="text-3xl">Login</h1>

          <div className="max-w-sm w-full h-13">
            <label>
              <h3 className="text-l"> E-mail:</h3>
              <input
                value={email}
                className={` outline-none rounded-sm border w-full h-9 px-2 ${
                  err && "border-red-500"
                }`}
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="max-w-sm w-full h-13">
            <label>
              <h3 className="text-l">Password:</h3>
              <div className="relative">
                <input
                  value={password}
                  className={` outline-none rounded-sm  border w-full h-9 px-2 ${
                    err && "border-red-500"
                  }`}
                  placeholder="Password"
                  type={`${passwordShown ? "text" : "password"}`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute top-3  right-2 cursor-pointer "
                  onClick={() => {
                    setPasswordShown(!passwordShown);
                  }}
                >
                  {password ? (
                    !passwordShown ? (
                      <FaRegEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )
                  ) : (
                    <></>
                  )}
                </span>
              </div>
            </label>
          </div>
          <div className="max-w-sm w-full  text-center leading-2">
            <button
              type="submit"
              className="h-9 bg-blue-400 w-full cursor-pointer text-white text-lg"
            >
              Login
            </button>
          </div>
          <div className="text-gray-500 font-light text-sm">
            <p>
              Don't have an account ?{" "}
              <NavLink
                to="/register"
                className="underline text-blue-500 font-medium"
              >
                Register
              </NavLink>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
