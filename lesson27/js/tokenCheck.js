document.addEventListener('DOMContentLoaded',()=>{
    if(!localStorage.token){
        location.href="login.html";
    }
});