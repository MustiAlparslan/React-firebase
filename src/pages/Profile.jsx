import React, {  useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

function Profile() {
  const { upProfile, delUser, logout, auth, setUserInfo, upEmail, upPassword } =
    useAuth();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

  const handleUpdate = async () => {
    try {
      await upProfile({
        displayName: `${name} ${surname}`,
      });
      await upEmail(email);
      await upPassword(password);
      setUserInfo({
        email: auth.currentUser.email,
        displayName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        accessToken: auth.currentUser.accessToken,
        emailVerified: auth.currentUser.emailVerified,
        photoUrl: auth.currentUser.photoUrl,
      });

      toast.success("Successful");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.message);
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
    }
  };

  const handleSubmit = async () => {
    try {
      await logout();
      sessionStorage.removeItem('uid')
      navigate("/login");
      toast.success("Logout");
    } catch (e) {
      toast.error(e.message);
    }
  };
  

  const handleDeleteUser = async () => {
    try{
      const conf = window.confirm('Are you sure ? ')
      if(conf){
        toast.success('Deleted!')
        await delUser()
      }else{
        toast.error('not deleted')
      }
    }catch(e) {
      toast.error(e.message)
    }
  }

  return (
    <div>
      <div className="m-auto max-w-3xl w-full bg-white p-4">
        <div className="flex justify-around items-center">
          <h2 className="text-3xl  font-bold">Profile Update</h2>
          <GrLogout
            size={20}
            className="cursor-pointer"
            onClick={handleSubmit}
          />
        </div>
        <hr className="my-3" />
        <div>
          <h2 className="text-2xl font-bold">Your Personal Information</h2>
          <h1 className="mt-2 ml-4 text-l font-medium	">
            {auth.currentUser?.displayName}
          </h1>
          <h1 className="mt-2 ml-4 text-l font-medium	">
            {auth.currentUser?.email}
          </h1>
        </div>
        <hr className="my-3" />
        <form className="flex flex-col gap-3">
          <div className="h-16 flex justify-between">
            <label>
              <h3>Name</h3>
              <input
                className="border px-2 h-10  w-64"
                placeholder="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <h3>Surname</h3>
              <input
                className="border px-2 h-10  w-64"
                placeholder="Surname"
                value={surname}
                type="text"
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
          </div>
          <div className="h-16">
            <label>
              <h3>Email</h3>
              <input
                className="border px-2 h-10  max-w-md w-full"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="h-16">
            <label>
              <h3>Password</h3>
              <div className="relative  max-w-md w-full">
                <input
                  value={password}
                  className="border px-2 h-10  max-w-md w-full"
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
          <button
            type="button"
            className="m-auto h-9 rounded bg-blue-400 max-w-xs w-full cursor-pointer text-white text-lg"
            onClick={handleUpdate}
          >
            Save
          </button>
          <button
            type="button"
            className="m-auto h-9 rounded bg-red-500 w-36 cursor-pointer text-white text-lg"
            onClick={handleDeleteUser}
            >
            Delete User
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
