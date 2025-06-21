const changeInput = document.querySelector(".change-img-input");
const changeImg = document.querySelector(".change-img");
const userName = document.querySelector(".user-name");
const studentsList = document.querySelector(".students-list");
const modalWrapper = document.querySelector(".modal-wrapper");
const modalInner = document.querySelector(".modal-inner");

// Dastlabki ma'lumotlar
let students = JSON.parse(localStorage.getItem("students")) || [];
let user = JSON.parse(localStorage.getItem("user")) || { 
    username: "Admin", 
    role: "Administrator" 
};

// Dastlabki sozlash
function init() {
    // Foydalanuvchi ma'lumotlari
    userName.textContent = user.username;
    changeImg.src = "./images/default-photo.png";
    
    // Rasm o'zgartirish
    changeInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
            changeImg.src = URL.createObjectURL(file);
            changeImg.classList.add("w-24", "h-24", "rounded-full", "mx-auto", "mb-2");
            
            // Yangi rasmni saqlash
            user.avatar = changeImg.src;
            localStorage.setItem("user", JSON.stringify(user));
        }
    });
    
    // Chiqish
    document.querySelector(".logout-btn").addEventListener("click", function() {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });
    
    // Studentlarni chiqarish
    renderStudents();
}

// Studentlarni jadvalga chiqarish
function renderStudents() {
    studentsList.innerHTML = "";
    
    if (students.length === 0) {
        studentsList.innerHTML = `
            <tr>
                <td colspan="6" class="py-4 text-center text-gray-500">No students found</td>
            </tr>
        `;
        return;
    }
    
    students.forEach(student => {
        const tr = document.createElement("tr");
        tr.className = "border-b border-gray-200 hover:bg-gray-50";
        tr.innerHTML = `
            <td class="py-4 flex items-center">
                <img src="${student.imgURL || './images/default-photo.png'}" class="w-10 h-10 rounded-full mr-3">
                ${student.name}
            </td>
            <td class="py-4">${student.email}</td>
            <td class="py-4">${student.phone}</td>
            <td class="py-4">${student.enrollNumber}</td>
            <td class="py-4">${student.dateAdmission}</td>
            <td class="py-4">
                <div class="flex gap-2">
                    <button onclick="editStudent(${student.id})" class="text-blue-500 hover:text-blue-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 16.25H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 2.5C13.941 2.30899 14.1626 2.1509 14.4056 2.03237C14.6486 1.91384 14.9095 1.83652 15.1774 1.80363C15.4452 1.77074 15.7163 1.78278 15.9799 1.83923C16.2435 1.89568 16.4957 1.99563 16.725 2.13438C16.9542 2.27324 17.1573 2.44886 17.325 2.6535C17.4927 2.85814 17.6225 3.08877 17.7087 3.33514C17.7949 3.58151 17.8363 3.84008 17.8311 4.09993C17.8259 4.35978 17.7742 4.6166 17.6785 4.85875C17.5827 5.1009 17.4443 5.32469 17.2696 5.51985C17.0949 5.71502 16.8866 5.87856 16.6544 6.00313L6.25 12.5L2.5 13.75L3.75 10L10 3.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button onclick="deleteStudent(${student.id})" class="text-red-500 hover:text-red-700">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.5 5H4.16667H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M6.6665 5V3.33333C6.6665 2.89131 6.8421 2.46738 7.15466 2.15482C7.46722 1.84226 7.89114 1.66667 8.33317 1.66667H11.6665C12.1085 1.66667 12.5325 1.84226 12.845 2.15482C13.1576 2.46738 13.3332 2.89131 13.3332 3.33333V5M15.8332 5V16.6667C15.8332 17.1087 15.6576 17.5326 15.345 17.8452C15.0325 18.1577 14.6085 18.3333 14.1665 18.3333H5.83317C5.39114 18.3333 4.96722 18.1577 4.65466 17.8452C4.3421 17.5326 4.1665 17.1087 4.1665 16.6667V5H15.8332Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </td>
        `;
        studentsList.appendChild(tr);
    });
}

// Yangi student qo'shish modalini ochish
function handleAddBtnClick() {
    modalWrapper.classList.remove("scale-0");
    modalInner.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">Add New Student</h2>
        <form class="add-student-form">
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
                <input type="file" class="student-img-input hidden" accept="image/*">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 student-img-container">
                    <img src="" class="student-preview-img hidden w-full h-48 object-contain mx-auto">
                    <div class="student-upload-text">
                        <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p class="mt-2 text-sm text-gray-600">Click to upload profile image</p>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Enroll Number</label>
                    <input type="text" name="enrollNumber" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Date of Admission</label>
                    <input type="date" name="dateAdmission" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
            </div>
            
            <div class="mt-8 flex justify-end gap-4">
                <button type="button" onclick="closeModal()" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" class="px-6 py-2 bg-[#FEAF00] text-white rounded-lg hover:bg-[#e09d00]">Add Student</button>
            </div>
        </form>
    `;
    
    // Rasm yuklash
    const imgInput = document.querySelector(".student-img-input");
    const imgContainer = document.querySelector(".student-img-container");
    const imgPreview = document.querySelector(".student-preview-img");
    const uploadText = document.querySelector(".student-upload-text");
    
    imgContainer.addEventListener("click", () => imgInput.click());
    
    imgInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imgPreview.src = event.target.result;
                imgPreview.classList.remove("hidden");
                uploadText.classList.add("hidden");
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Formni yuborish
    document.querySelector(".add-student-form").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const imgFile = imgInput.files[0];
        let imgURL = "";
        
        if (imgFile) {
            imgURL = URL.createObjectURL(imgFile);
        }
        
        const newStudent = {
            id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
            imgURL: imgURL || "./images/default-photo.png",
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            enrollNumber: formData.get("enrollNumber"),
            dateAdmission: formData.get("dateAdmission")
        };
        
        students.push(newStudent);
        localStorage.setItem("students", JSON.stringify(students));
        
        // Yuklash animatsiyasi
        const submitBtn = e.target.querySelector("button[type='submit']");
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
        `;
        
        setTimeout(() => {
            submitBtn.innerHTML = "Add Student";
            closeModal();
            renderStudents();
        }, 1500);
    });
}

// Modalni yopish
function closeModal() {
    modalWrapper.classList.add("scale-0");
}

// Studentni o'chirish
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        students = students.filter(student => student.id !== id);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    }
}

// Studentni tahrirlash
function editStudent(id) {
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    modalWrapper.classList.remove("scale-0");
    modalInner.innerHTML = `
        <h2 class="text-2xl font-bold mb-6">Edit Student</h2>
        <form class="edit-student-form">
            <input type="hidden" name="id" value="${student.id}">
            
            <div class="mb-6">
                <label class="block mb-2 text-sm font-medium text-gray-700">Profile Image</label>
                <input type="file" class="student-img-input hidden" accept="image/*">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 student-img-container">
                    <img src="${student.imgURL}" class="student-preview-img w-full h-48 object-contain mx-auto">
                    <div class="student-upload-text hidden">
                        <svg class="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p class="mt-2 text-sm text-gray-600">Click to upload profile image</p>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" name="name" value="${student.name}" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" value="${student.email}" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
                    <input type="tel" name="phone" value="${student.phone}" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Enroll Number</label>
                    <input type="text" name="enrollNumber" value="${student.enrollNumber}" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
                
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-700">Date of Admission</label>
                    <input type="date" name="dateAdmission" value="${student.dateAdmission}" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FEAF00]" required>
                </div>
            </div>
            
            <div class="mt-8 flex justify-end gap-4">
                <button type="button" onclick="closeModal()" class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                <button type="submit" class="px-6 py-2 bg-[#FEAF00] text-white rounded-lg hover:bg-[#e09d00]">Save Changes</button>
            </div>
        </form>
    `;
    
    // Rasm yuklash
    const imgInput = document.querySelector(".student-img-input");
    const imgContainer = document.querySelector(".student-img-container");
    const imgPreview = document.querySelector(".student-preview-img");
    const uploadText = document.querySelector(".student-upload-text");
    
    imgContainer.addEventListener("click", () => imgInput.click());
    
    imgInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imgPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Formni yuborish
    document.querySelector(".edit-student-form").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const id = parseInt(formData.get("id"));
        const imgFile = imgInput.files[0];
        
        const updatedStudent = {
            id: id,
            imgURL: imgFile ? URL.createObjectURL(imgFile) : student.imgURL,
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            enrollNumber: formData.get("enrollNumber"),
            dateAdmission: formData.get("dateAdmission")
        };
        
        students = students.map(s => s.id === id ? updatedStudent : s);
        localStorage.setItem("students", JSON.stringify(students));
        
        // Yuklash animatsiyasi
        const submitBtn = e.target.querySelector("button[type='submit']");
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
        `;
        
        setTimeout(() => {
            submitBtn.innerHTML = "Save Changes";
            closeModal();
            renderStudents();
        }, 1500);
    });
}

// Dasturni ishga tushurish
document.addEventListener("DOMContentLoaded", init);