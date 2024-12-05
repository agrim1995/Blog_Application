import { useSelector } from "react-redux";
import WebAPI from "../Service/WebAPI";
import WebService from "../Service/WebService";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddPost()
{
    const data = useSelector(state=>state.userData.value); 
console.log(data.id, data.token);

const navigate=useNavigate();

    const title=useRef();
    const content=useRef();
    const post=useRef();

    const [loading,setLoding] = useState(false)

    const Addpost=async(event)=>{
        event.preventDefault();

        const titl=title.current.value;
        const postImage=post.current.files[0];
        const con=content.current.value;
        
        const fData = new FormData;
        fData.append("title",titl);
        fData.append("postImage",postImage);
        fData.append("content",con);
        fData.append("userId",data.id);

        try{
            setLoding(true)
            const responce=await WebService.postApiAuthData(WebAPI.savePost,data.token,fData);
            console.log("Add post responce is : "+JSON.stringify(responce));
            alert("post Add Successfully");

            if(responce){
                setTimeout(() => {
                    navigate('/userHome')
                  }, 2000);
                }
      
      
        }
        catch(error)
        {
            setLoding(false)
            console.log("Add post Error is : "+error);
        }
        finally{
            setLoding(false)
            
        }

    }

return<div className="container bg-body-tertiary my-5">
   <div className="jumbotron text-center">
<h1>Add Post</h1>
</div>
<div className="container">
<form onSubmit={Addpost}>
<div className="form-group my-2">
<label class="form-label">Enter title</label>
<input type="text"  ref={title} className="form-control" placeholder="Enter title"/>
</div>

<div className="form-group my-4">
<label class="form-label">Enter post Image</label>
<input type="file" ref={post} className="form-control" placeholder="Enter post Image"/>
</div>

<div className="form-group my-2">
<label class="form-label">Enter content</label>
<input type="text"  ref={content} className="form-control" placeholder="Enter content"/>
</div>


<div className="form-group my-4">
<input type="submit" value="Addpost"  className="form-control btn btn-success"/>
</div>
</form>
</div>
 </div>
}export default AddPost;