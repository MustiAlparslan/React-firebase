import { useState } from "react";
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const { createUser, upProfile } = useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser(email, password);
      await upProfile({
        displayName: `${name} ${surname}`,
      });
      toast.success("Successful");
      navigate("/login");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="m-auto max-w-lg flex h-[400px]  shadow-lg	 justify-center flex-col w-full bg-white">
        <form
          onSubmit={handleSubmit}
          className="p-4 flex gap-4 flex-col items-center"
        >
          <h1 className="text-3xl">Register</h1>
          <div className="max-w-sm flex justify-around gap-4">
            <div className="max-w-xs w-full h-13">
              <label>
                <h3 className="text-l"> Name: </h3>
                <input
                  className="border w-full h-9 px-2"
                  placeholder="Name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="max-w-xs w-full h-13">
              <label>
                <h3 className="text-l"> Surname: </h3>
                <input
                  className="border  w-full h-9 px-2"
                  placeholder="Surname"
                  type="text"
                  onChange={(e) => setSurname(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="max-w-sm w-full h-13">
            <label>
              <h3 className="text-l"> E-mail:</h3>
              <input
                className="border w-full h-9 px-2"
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
                  className="border w-full h-9 px-2"
                  placeholder="Password"
                  type={`${passwordShown ? "text" : "password"}`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute top-[10px]  right-2 cursor-pointer "
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
              Register
            </button>
          </div>
          <div className="text-gray-500 font-light text-sm">
            <p>
              Already have an account ?{" "}
              <NavLink
                to="/login"
                className="underline text-blue-500 font-medium"
              >
                Log in
              </NavLink>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
