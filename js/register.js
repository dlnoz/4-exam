let elForm2 = document.querySelector(".register-form")

let submitBtn2 = document.querySelector(".login-btn")



elForm2.addEventListener("submit", function(e){
    e.preventDefault()
     let data = {
        id:users.length + 1,
        username:e.target.name.value,
        password:e.target.password.value
        // name:e.target.username.value,
        // password:e.target.password.value
    }
    users.push(data)
    localStorage.setItem("users", JSON.stringify(users))
    submitBtn2.innerHTML = `
        <img class="w-[30px] h-[30px]  mx-auto" src="./images/loading-white.png" alt="loading" width="30" height="30" />
    `
    setTimeout(() => {
        submitBtn2.innerHTML = `Sign up`
        setTimeout(() => {
            location.pathname = "/index.html"
        },600)
    },1000)
})