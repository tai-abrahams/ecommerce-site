import axios from "axios";
const BASE_URL = "http://localhost:8080/api";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  timeout:0,
  //headers: { Authorization: `Bearer ${TOKEN}`}
});

userRequest.interceptors.request.use( (request)=>{
     
    try{
  
          let TOKEN = JSON.parse(
            JSON.parse(localStorage.getItem("persist:root"))?.user || "{}"
        )?.currentUser?.accessToken;
        //console.log(TOKEN);
          request.headers.Authorization = TOKEN ? `Bearer ${TOKEN}` : null;
          //console.log(request)
        
        return request;
      
    } catch(err){
        console.error(err)
        
        
    }
    
  
});

userRequest.interceptors.response.use((response)=>{
  try{
    console.log(response);
    return response;
  } catch (err){
    console.log(err.response)
  }
    
})

