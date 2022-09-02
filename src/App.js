import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import {Toaster} from 'react-hot-toast'
import Home from "./pages/Home";

function App() {
  return (
    <div>
      <Toaster position="top-right"/>
      <Routes>
        <Route path="/" element={<ProtectedRoute> <Home/> </ProtectedRoute> } />
        <Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Not Found!</div>} />
      </Routes>
    </div>
  );
}

export default App;
