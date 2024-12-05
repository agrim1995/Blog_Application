import axios from "axios";
class WebService
{
    postAPI(url,data)
    {
       var result = axios.post(url,data);
       return result;
    }

    getAPIUsingToken(url,token)
    {
      var result = axios.get(url,{
        headers:{
            Authorization :'Bearer '+token
           }
       })
       return result;
    }

    putAPIUsingToken(url,token,data)
    {
       var result = axios.put(url,data,{ headers: { Authorization: `Bearer ${token}` } })
       return result;
    }

    postApiAuthData(url,token,data)
    {
      var result = axios.post(url,data,{ headers: { Authorization: `Bearer ${token}` }})
      return result
    }
    deleteAPIUsingToken(url,token)
    {
       var result = axios.delete(url,{ headers: { Authorization: `Bearer ${token}` } })
       return result;
    }

}
export default new WebService();