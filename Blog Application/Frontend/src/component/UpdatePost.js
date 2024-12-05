import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import WebService from "../Service/WebService";
import WebAPI from "../Service/WebAPI";
import { useNavigate } from "react-router-dom";

function UpdatePost() {
    const data = useSelector(state => state.userData.value);
    const BlogD = useSelector(state => state.blogData.value);

    const navigate=useNavigate();
    
    console.log("User ID:", data.id, "Token:", data.token);
    console.log("Post Data:", BlogD);
  
    const titleRef = useRef();
    const contentRef = useRef();
  
    const [loading, setLoading] = useState(false);
  
    const update = async (event) => {
      event.preventDefault();
      const title = titleRef.current.value;
      const content = contentRef.current.value;
      const updateData = { title, content };
  
      const url = WebAPI.updatePost + '/' + BlogD._id;
  
      try {
        setLoading(true);
        const response = await WebService.putAPIUsingToken(url, data.token, updateData); // Make sure to use the right WebService method
        console.log("Update response:", response);
        alert("Post updated successfully!");

        if(response){
          setTimeout(() => {
              navigate('/userHome')
            }, 2000);
          }

      } catch (error) {
        console.error("Error updating post:", error);
      } finally {
        setLoading(false);
      }

      
    };
  
    return (
      <div className="container bg-body-tertiary my-5">
        <div className="jumbotron text-center">
          <h1>Update Post</h1>
        </div>
        <div className="container">
          <form onSubmit={update}>
            <div className="form-group my-2">
              <label className="form-label">Enter title</label>
              <input
                type="text"
                defaultValue={BlogD?.title}
                ref={titleRef}
                className="form-control"
                placeholder="Enter title"
              />
            </div>
  
            <div className="form-group my-4">
              <img
                src={`assets/uploadImage/${BlogD?.postImage}`}
                height={400}
                width={400}
                className="img-thumbnail"
                alt="Post"
              />
            </div>
  
            <div className="form-group my-2">
              <label className="form-label">Enter content</label>
              <input
                type="text"
                defaultValue={BlogD?.content}
                ref={contentRef}
                className="form-control"
                placeholder="Enter content"
              />
            </div>
  
            <div className="form-group my-4">
              <input
                type="submit"
                value={loading ? "Updating..." : "Update"}
                disabled={loading}
                className="form-control btn btn-success"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default UpdatePost;
  