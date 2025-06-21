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


document.querySelector('.logout-btn').addEventListener("click", function(){
  window.location.href = "/index.html"
})




let modalWrapper = document.querySelector(".modal-wrapper")
let modalInner = document.querySelector(".modal-inner")



function handleAddBtnClick(){
    modalWrapper.classList.remove("scale-0")
    modalInner.innerHTML = `
    <form autocomplete="off" class="add-pool-form w-[1000px] p-3 rounded-[20px]" >
    <label>
      <input type="file" class="choose-file hidden"/>
      <div class="relative mx-auto flex items-center justify-center border-[2px] border-slate-500 w-[591px] h-[216px] bg-white rounded-[20px]">
        <img class="choose-img absolute w-full h-full hidden" src="" alt="choose img"/>
        <div class="flex gap-[15px] items-center justify-center">
          <svg width="86" height="65" viewBox="0 0 86 65" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.0625 0C5.92419 0 3.87346 0.84944 2.36145 2.36145C0.849439 3.87346 0 5.92419 0 8.0625L0 56.4375C0 58.5758 0.849439 60.6265 2.36145 62.1385C3.87346 63.6506 5.92419 64.5 8.0625 64.5H77.9375C80.0758 64.5 82.1265 63.6506 83.6385 62.1385C85.1506 60.6265 86 58.5758 86 56.4375V8.0625C86 5.92419 85.1506 3.87346 83.6385 2.36145C82.1265 0.84944 80.0758 0 77.9375 0H8.0625ZM77.9375 5.375C78.6503 5.375 79.3338 5.65815 79.8379 6.16215C80.3419 6.66615 80.625 7.34973 80.625 8.0625V40.3125L60.3344 29.8474C59.8303 29.5949 59.2596 29.5073 58.703 29.597C58.1465 29.6867 57.6322 29.9492 57.233 30.3472L37.2918 50.2885L22.9942 40.764C22.478 40.4203 21.8588 40.2657 21.2417 40.3265C20.6245 40.3872 20.0473 40.6595 19.608 41.0972L5.38575 53.75V56.6525C5.37932 56.581 5.37574 56.5093 5.375 56.4375V8.0625C5.375 7.34973 5.65815 6.66615 6.16215 6.16215C6.66615 5.65815 7.34973 5.375 8.0625 5.375H77.9375Z" fill="#898989"/>
          </svg>
          <p class="text-[20px] ">Выберите Изображение</p>
        </div>
      </div>
    </label>

    <div class="flex justify-between mt-10">
      <div class="w-[49%] flex flex-col gap-[30px]">
        <label>
          <input class="w-[480px] h-[50px] pl-[15px] outline-none shadow-md rounded-[4px]" placeholder="Enter your name">
        </label>

        <label>
          <input class="w-[480px] h-[50px] pl-[15px] outline-none shadow-md rounded-[4px]" placeholder="Enter your email">
        </label>

        <label>
          <input class="w-[480px] h-[50px] pl-[15px] outline-none shadow-md rounded-[4px]" placeholder="Enter your phone number">
        </label>
      </div>

      <div class="w-[49%] flex flex-col gap-[30px]">
        <label>
          <input class="w-[480px] h-[50px] pl-[15px] outline-none shadow-md rounded-[4px]" placeholder="Enter your enroll number">
        </label>

        <label>
          <input class="w-[480px] h-[50px] pl-[15px] outline-none shadow-md rounded-[4px]" placeholder="Enter your date admission">
        </label>
        <button class="add-btn bg-[#FEAF00] text-white py-[10px] rounded-[8px] mt-[20px] font-bold text-[22px] px-[14px] border-none hover:opacity-[80%] duration-300">Add</button>
      </div>
    </div>
  </form>
`

  let elAddPoolForm = document.querySelector(".add-pool-form")
  let elChooseFile = document.querySelector(".choose-file")
  let elChooseImg = document.querySelector(".choose-img")
  let elSubmitBtn = document.querySelector(".add-btn")

  elChooseFile.addEventListener("change", function(evt){
    elChooseImg.classList.remove("hidden")
    elChooseImg.src = URL.createObjectURL(evt.target.files[0])
  })

  elAddPoolForm.addEventListener("submit", function(evt){
  evt.preventDefault()
    let pool = {
      id:products[products.length - 1]?.id ? products[products.length - 1].id + 1 : 1,
        imgURL:elChooseImg.src,
        oldPrice:evt.target.oldPrice.value,
        newPrice:evt.target.newPrice.value,
        categoryId:evt.target.categoryId.value,
        quantity:evt.target.quantity.value,
        frameId:evt.target.frameId.value,
    }
    products.push(pool)
    localStorage.setItem("products", JSON.stringify(products))
    elSubmitBtn.innerHTML = `
      <img class="w-[30px] h-[30px] scale-[1.4] mx-auto" src="./images/loading-white.png" alt="loading" width="30" height="30" />
    `
    setTimeout(() => {
      elSubmitBtn.innerHTML = `Add`
      setTimeout(() => {
        modalWrapper.classList.add("scale-0")
        if(pool.categoryId == "0"){
          elCategoryList.firstElementChild.className = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[30px]"
          elCategoryList.lastElementChild.className = "text-[#A6A6A6] border-b-[3px] border-transparent cursor-pointer font-bold text-[30px]"
        }
        else{
          elCategoryList.lastElementChild.className = "border-b-[3px] cursor-pointer border-[#009398] text-[#009398] font-bold text-[30px]"
          elCategoryList.firstElementChild.className = "text-[#A6A6A6] border-b-[3px] border-transparent cursor-pointer font-bold text-[30px]"
        }
        renderProducts(products, elProductTable, pool.categoryId)
      }, 800)

    }, 1000)
})
}