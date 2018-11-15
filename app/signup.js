document.addEventListener("DOMContentLoaded", init);



function init() {
  const BASE_URL = "http://localhost:3000/api/v1/users"
  const USER_URL = `${BASE_URL}/${userId}`
  const POSTS_URL = "http://localhost:3000/api/v1/posts"

 fetch(BASE_URL, {
   method: "POST",
   headers:{
     "Content-Type": 'application/json',
     Accept:'application/json'
   }
 })
 .then()
 .then()

}
