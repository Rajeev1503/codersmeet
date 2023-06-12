const serverUrl =
  process.env.NODE_ENV === "development"
    ? "https://codersmeetbackend.vercel.app"
    : "https://codersmeetbackend.vercel.app";
const fetchHelper = async (route, method, bodyData)=> {

    if(!bodyData)
    {
      try {
          const response = await fetch(serverUrl+route, {
            method: method,
            headers: {
              "content-type": "application/json",
            }
          });
          const responseData = await response.json();
          if(!response.ok){
            throw new Error(responseData.message);
          }
          return JSON.stringify(responseData);
          
        } catch (error) {
          console.log(error);
          return;
        }
    }
   else {
      try {
          const response = await fetch(serverUrl+route, {
            method: method,
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(bodyData)
          });
  
          const responseData = await response.json();
          if(!response.ok){
            throw new Error(responseData.message);
          }
  
          return JSON.stringify(responseData);
          
        } catch (error) {
          console.log(error);
          return;
        }
    }
  }
  
  export default fetchHelper;