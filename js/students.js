let changeInput = document.querySelector(".change-img-input")
let changeImg = document.querySelector(".change-img")
let userName = document.querySelector(".user-name")
let listTable = document.querySelector(".dashboard")
changeImg.src = "./images/default-photo.png"
let user = JSON.parse(localStorage.getItem("data"))

userName.textContent = user.username
console.log(userName);

changeInput.addEventListener("change", function (e) {
    changeImg.src = URL.createObjectURL(e.target.files[0])
    changeImg.className = "w-[100px] h-[100px] rounded-full mx-auto mb-[12px] flex flex-col"
})