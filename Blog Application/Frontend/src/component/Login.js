import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import WebService from "../Service/WebService";
import WebAPI from "../Service/WebAPI";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "../Redux/Slice";

function Login()
{
  var email=useRef();
  var password=useRef();

  var dispatch= useDispatch();
  var navigate= useNavigate();

  var LoginUser=async(event)=>{
    event.preventDefault();
    var em=email.current.value;
    var pass=password.current.value;
    var obj={email:em,password:pass};

    var responce = await WebService.postAPI(WebAPI.loginAPI,obj);
    // console.log(" data is : "+JSON.stringify(responce));
console.log(responce);

    if(responce.data.status)
    {
      var Userinfo = {name:responce.data.user.name, token:responce.data.token, id:responce.data.user.id};
      var userData = {...Userinfo, isLogin:true}
      console.log(userData);
      
      dispatch(storeUserInfo(userData))
      navigate("/UserHome");
    }

  }



  return<div className="container"> 
   <form>
      <div className="row d-flex justify-content-center mt-3">
    
        <div className="col-md-10 ">
          <div class="mb-3">
            <label  class="form-label">Email </label>
            <input type="email" class="form-control border border-4" placeholder="Enter Email" ref={email}/>
          </div>
          <div class="mb-3">
            <label  class="form-label">Password </label>
            <input type="password" class="form-control border border-4" placeholder="Enter Password" ref={password}/>
          </div>
          <button type="submit" className="form-control btn btn-success my-3" onClick={LoginUser}>Submit</button>
          <span>If you are not Register?<Link to="/Register">Click Here!</Link></span>

        </div>
     </div>
   </form>

  </div>
}
export default Login;