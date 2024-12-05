import { useEffect, useRef, useState } from "react"
import WebService from "../Service/WebService"
import WebAPI from "../Service/WebAPI"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function UserHome()
{
  const data = useSelector(state=>state.userData.value); 
  console.log("token : " ,data.token);
  
  const [postData,setPostData] = useState([]);
  const uploadPostFile = useRef({files:[1]})
  const message = useRef()

  useEffect(()=>{
    console.log("Hello....");
    loadAllUserPosts();
  },[]) 


  var loadAllUserPosts =async ()=>{
    
    console.log("hello");
    const responce= await WebService.getAPIUsingToken(WebAPI.getPost,data.token)
    console.log(responce);
    
    setPostData(responce.data.BlogList)
 }

 const formateDate = (datestr) => {
  if (!datestr) {
      return '-';
  }

  const date = new Date(datestr);
  return date.toLocaleDateString();
}


   return<div className="">
     

    {postData.map((content)=>{
        return<div className="row justify-content-center ">
          <div className="col-md-4  border border-2 mt-2 p-2">
            <div className="">
            <b className="p-2">Bloger : {content.userId?.name || "Unknown"}</b>
              <br />
            <h5 className="p-2"><b>{content.title}</b></h5>
            <br/>
            <img src={`assets/uploadImage/${content.postImage}`} height={500} width={500} className="img-thumbnail"/>
            <br/>
            <p className="p-2">{content.content}</p>
            <br/>
            <span>{formateDate(content.date)}</span>
            <div className="fs-4"><i className="fa-regular fa-heart mx-2"></i><i className="fa-regular fa-comment  mx-2"></i><i className="fa-solid fa-share mx-2"></i></div>
            </div>
          </div>
        </div>
     })}
  </div>
}
export default UserHome