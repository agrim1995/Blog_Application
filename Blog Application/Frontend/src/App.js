import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import Menu from "./component/Menu";
import UserHome from "./component/UserHome";
import Error from "./component/Error";
import AddPost from "./component/AddPost";
import Profile from "./component/Profile";
import UpdatePost from "./component/UpdatePost";

function App()
{
  return<div>
    <BrowserRouter>
    <Menu/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/Login" element={<Login/>}></Route>
      <Route path="/Register" element={<Register/>}></Route>
      <Route path="/UserHome" element={<UserHome/>}></Route>
      <Route path="/Profile" element={<Profile/>}></Route>
      <Route path="/AddPost" element={<AddPost/>}></Route>
      <Route path="/Error" element={<Error/>}></Route>
      <Route path="/updatePost" element={<UpdatePost/>}></Route>

    </Routes>
    </BrowserRouter>
  </div>
}
export default App;