let elForm = document.querySelector(".login-form")
let submitBtn = document.querySelector(".login-btn")


let passwordsSaved = JSON.parse(localStorage.getItem("users"))

elForm.addEventListener("submit", function(evt){
    evt.preventDefault()
    let data = {
        name:evt.target.name.value,
        password:evt.target.password.value
    }
    submitBtn.innerHTML = `
        <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading-white.png" alt="Loading..." />
    `

   let isUser = passwordsSaved ? passwordsSaved.some(item => item.username == data.name && item.password == data.password) : users.some(item => item.username == data.name && item.password == data.password)
    let user = passwordsSaved ? passwordsSaved.find(item => item.username == data.name && item.password == data.password) : users.find(item => item.username == data.name && item.password == data.password)

    localStorage.setItem("user", JSON.stringify(user))
    setTimeout(() => {
        submitBtn.innerHTML = `Login`
        setTimeout(() => {
            if(isUser){
                location.pathname = "/students.html"
            }
            else{
                alert("There Is an Error.")
            }
        },600)
    },1000)
})
