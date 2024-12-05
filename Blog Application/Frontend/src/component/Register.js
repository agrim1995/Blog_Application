import { useRef } from "react";
import WebService from "../Service/WebService";
import WebAPI from "../Service/WebAPI";
import { Link, useNavigate } from "react-router-dom";

function Register()
{
  var name=useRef();
  var email=useRef();
  var password=useRef();

  var navigate = useNavigate();
  
  var RegisterUser=async(event)=>{
    event.preventDefault();
    var nm = name.current.value;
    var em = email.current.value;
    var pass = password.current.value;
    
    var obj = {name:nm,email:em,password:pass};

    var responce = await WebService.postAPI(WebAPI.registerAPI,obj);
    console.log(obj);
    console.log("Register Data : "+JSON.stringify(responce));

    if(responce.data.status)
    {
      navigate("/Login");
    }
    else{
      navigate("/Error")
    }

  }






    return<div className="container"> 
    <form>
       <div className="row d-flex justify-content-center mt-3">
     
         <div className="col-md-10 ">
           <div class="mb-3">
             <label  class="form-label">Your Name </label>
             <input type="text" class="form-control border border-4" placeholder="Enter Your Name" ref={name}/>
           </div>
           <div class="mb-3">
             <label  class="form-label">Email </label>
             <input type="email" class="form-control border border-4" placeholder="Enter Email" ref={email}/>
           </div>
           <div class="mb-3">
             <label  class="form-label">Password </label>
             <input type="password" class="form-control border border-4" placeholder="Enter Password" ref={password}/>
           </div>

           <button type="submit" className="form-control btn btn-success my-3" onClick={RegisterUser}>Submit</button>
           <p>if you have already signIn <Link to='/Login'> Login</Link></p>
         </div>
      </div>
    </form>
   </div>
 }
export default Register;