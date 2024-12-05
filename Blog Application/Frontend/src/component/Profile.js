import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import WebService from "../Service/WebService";
import WebAPI from "../Service/WebAPI";
import { setBlogReducer } from "../Redux/UpdateSlice";

function Profile() {
  const data = useSelector(state => state.userData.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    loadUserPosts();
  }, []);

  const loadUserPosts = async () => {
    try {
      const responce = await WebService.getAPIUsingToken(WebAPI.getPost, data.token);
      console.log(responce);
      setPostData(responce.data.BlogList || []);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const formateDate = (datestr) => {
    if (!datestr) return '-';
    const date = new Date(datestr);
    return date.toLocaleDateString();
  };

  const deletepost = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      try {
        const URL = WebAPI.deletePost + "/" + id;
        const response = await WebService.deleteAPIUsingToken(URL, data.token);
        if (response.status === 200) {
          alert("Post Deleted Successfully");
          await loadUserPosts(); // Refresh the post list
        } else {
          alert("Post not Deleted");
        }
      } catch (error) {
        console.error("Delete post error:", error);
      }
    }
  };

  const update = (contentData) => {
    dispatch(setBlogReducer(contentData)); // Update the store with the post data
    navigate("/updatePost");
  };

  return (
    <div className="p-2">
      <h4 className="ms-5 ps-5">Name: {data.name}</h4>
      <h6 className="text-center">My Blog</h6>
      <div className="row justify-content-center">
        {postData.map((content) => (
          content.userId?._id === data.id && (
            <div className="col-md-3 border border-2 m-3 p-2" key={content._id}>
              <div>
                <h5 className="p-2"><b>{content.title}</b></h5>
                <br />
                <img
                  src={`assets/uploadImage/${content.postImage}`}
                  height={400}
                  width={400}
                  className="img-thumbnail"
                  alt={content.title}
                />
                <br />
                <p className="p-2">{content.content}</p>
                <br />
                <span>{formateDate(content.date)}</span>
                <div className="row">
                  <div className="fs-4 col-md-6">
                    <i className="fa-regular fa-heart mx-2"></i>
                    <i className="fa-regular fa-comment mx-2"></i>
                    <i className="fa-solid fa-share mx-2"></i>
                  </div>
                  <div className="fs-5 col-md-6 text-end">
                    <i
                      className="fa-solid fa-pen-to-square mx-2"
                      onClick={() => update(content)}
                    ></i>
                    <i
                      className="fa-solid fa-trash ms-2 text-danger"
                      onClick={() => deletepost(content._id)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}

export default Profile;
