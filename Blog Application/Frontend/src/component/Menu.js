import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { storeUserInfo } from "../Redux/Slice";

function Menu()
{
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const logout = () => {
    dispatch(storeUserInfo({
      id:undefined,
        name: undefined,
        token: undefined,
        islogin: false
    }))
    navigate('/Login')
}


  const data = useSelector(state=>state.userData.value)

  return<div className="container">
    {data.isLogin?<>
  <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
 <div className="container-fluid">
   <Link className="navbar-brand ms-5 text-success fw-bold fs-3" to="/">Chat_Hub</Link> 
   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"  aria-label="Toggle navigation">
     <span className="navbar-toggler-icon"></span>
   </button>
   <div className="collapse navbar-collapse" id="navbarSupportedContent">
     <ul className="navbar-nav  m-lg-auto mb-2 ">

       <li className="nav-item mx-3">
         <Link className="nav-link "  to="/UserHome">Home</Link> 
       </li>
       <li className="nav-item mx-3">
         <Link className="nav-link text-nowrap"  to="/AddPost">Add Blog</Link> 
       </li>
       <li className="nav-item mx-3">
         <Link className="nav-link text-nowrap"  to="/Profile">Profile</Link> 
       </li>
       <li className="nav-item ms-lg-5 mx-3 ps-lg-5 text-lg-end">
       <Link className="nav-link text-lg-end" to="" onClick={logout}>Logout</Link> 
       </li>
       {/* <li className="nav-item mx-3">
         <Link className="nav-link "  to="/Home">Home</Link> 
       </li>
       <li className="nav-item ms-lg-5 mx-3 ps-lg-5 text-lg-end ">
         <Link className="nav-link text-nowrap"  to="/Login">login</Link> 
       </li>
       <li className="nav-item ms-lg-5 mx-3 ps-lg-5 text-lg-end">
       <Link className="nav-link text-lg-end" to="/Register">Register</Link> 
       </li> */}

     </ul>
   </div>
 </div>
</nav>

</>
:<></>}


  </div>
  
}
export default Menu;