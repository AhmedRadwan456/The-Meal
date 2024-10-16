let rowData = document.getElementById("rowData");
let searchInput = document.getElementById("searchInput");
let submitBtn;

//jQuery Loading Screen
$("document").ready(() => {
  $(".loading-screen").fadeOut(500);
  $("body").css("overflow", "visible");
  $(".inner-loading-screen").fadeOut(100);
});
// function Open Side Bar
function openSideBar() {
  $(".side-nav-menu").animate({ left: 0 }, 700);

  $(".open-close").removeClass("fa-align-justify");
  $(".open-close").addClass("fa-x");
  for (let i = 0; i < 5; i++) {
    $(".open-link li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
// function Close Side Bar
function closeSideBar() {
  let boxWidth = $(".nav-tap").outerWidth();
  $(".side-nav-menu").animate({ left: -boxWidth }, 700);
  $(".open-close").removeClass("fa-x");
  $(".open-close").addClass("fa-align-justify");
  $(".open-link li").animate({ top: 300 }, 700);
}
closeSideBar();

// jQuery Name Alert
$(".side-nav-menu i.open-close").click(() => {
  let currentLeft = $(".side-nav-menu").css("left");

  if (currentLeft == "0px") {
    closeSideBar();
  } else {
    openSideBar();
  }
});

// function Search By First Name
async function searchByFirstName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`
  );
  response = await response.json();
  response.meals ? displayMeal(response.meals) : displayMeal([]);
}
// function Search By Name
async function searchByName(term) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
  );
  response = await response.json();
  response.meals ? displayMeal(response.meals) : displayMeal([]);
}

// function Display Search Input
function displaySearchInput() {
  searchInput.innerHTML = `
  <div class="row">
        <div class="col-md-6">
          <input
           onkeyup="searchByName(this.value)"
            class="form-control txt-color my-4  w-75 bg-transparent text-white"
            type="text"
            placeholder="Search By Name"
          />
        </div>
        <div class="col-md-6">
          <input
          onkeyup="searchByFirstName(this.value)"
            class="form-control txt-color my-4 w-75  bg-transparent text-white"
            maxlength="1"
            type="text"
            placeholder="Search By First Letter" 
          />
        </div>
      </div>
  `;
  rowData.innerHTML = "";
}

searchByName("");
// function Display Meal
function displayMeal(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3  overflow-hidden">
          <div onclick="getDetails('${arr[i]?.idMeal}')" class="meal cursor-pointer position-relative">
            <img
              class="w-100"
              src=${arr[i]?.strMealThumb}
              alt=""
            />
            <div class="meal-layer text-black  d-flex align-items-center position-absolute">
              <h3 class="p-2">${arr[i]?.strMeal}</h3>
            </div>
          </div>
          </div>`;
  }
  rowData.innerHTML = cartona;
}

// function Get Area
async function getArea() {
  $(".inner-loading-screen").fadeIn(300);
  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  response = await response.json();
  displayArea(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}
// function Display Area
function displayArea(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
       <div class="col-md-3">
          <div onclick="getAreaDetails('${arr[i]?.strArea}')" class="meal cursor-pointer product shadow1 rounded-2 text-center text-white">
           <i class="fa-solid fa-earth-americas"></i>
           <h3 class="p-2 ">${arr[i]?.strArea}</h3>
           
          </div>
        </div>`;
  }
  rowData.innerHTML = cartona;
}
// function Get Area Details
async function getAreaDetails(name) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`
  );
  response = await response.json();

  displayMeal(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// function Get Ingredient
async function getIngredient(Ingredient) {
  $(".inner-loading-screen").fadeIn(300);
  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=${Ingredient}`
  );
  response = await response.json();
  displayIngredient(response.meals.slice(0, 25));
  $(".inner-loading-screen").fadeOut(300);
}
// function Display Ingredient
function displayIngredient(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3">
          <div onclick="getIngredientDetails('${
            arr[i]?.strIngredient
          }')"  class="meal cursor-pointer product shadow1 rounded-2 text-center text-white">
          <i class="fa-sharp fa-solid fa-cookie-bite"></i>
           <h3 class="p-2 ">${arr[i]?.strIngredient}</h3>
            <P class="p-2 ">${arr[i]?.strDescription
              ?.split(" ")
              .slice(0, 25)
              .join(" ")}</p>
          </div>
        </div>`;
  }
  rowData.innerHTML = cartona;
}
// function Get Ingredient Details
async function getIngredientDetails(name) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`
  );
  response = await response.json();
  displayMeal(response.meals);
  $(".inner-loading-screen").fadeOut(300);
}

// function Get Categories
async function getCategories() {
  $(".inner-loading-screen").fadeIn(300);
  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCateory(response.categories);
  $(".inner-loading-screen").fadeOut(300);
}
// function Display Categories
function displayCateory(arr) {
  let cartona = "";
  for (let i = 0; i < arr.length; i++) {
    cartona += `
    <div class="col-md-3 overflow-hidden">
          <div onclick="getCategoriesDetails('${
            arr[i]?.strCategory
          }')" class="meal cursor-pointer rounded-2 position-relative">
            <img
              class="w-100 "
              src=${arr[i]?.strCategoryThumb}
              alt=""
            />
            <div class="meal-layer text-black text-center position-absolute">
              <h3>${arr[i]?.strCategory}</h3>
              <P>${arr[i]?.strCategoryDescription
                ?.split(" ")
                .slice(0, 25)
                .join(" ")}</p>
            </div>
          </div>
          </div>`;
  }
  rowData.innerHTML = cartona;
}
// function Get Categories Details
async function getCategoriesDetails(id) {
  $(".inner-loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`
  );
  response = await response.json();

  displayMeal(response.meals.slice(0, 20));
  $(".inner-loading-screen").fadeOut(300);
}

// function Get Details
async function getDetails(id) {
  closeSideBar();
  $(".inner-loading-screen").fadeIn(300);
  searchInput.innerHTML = "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  response = await response.json();
  displayDetails(response.meals[0]);
  $(".inner-loading-screen").fadeOut(300);
}
// function Display Details
function displayDetails(meal) {
  let ingredient = ``;
  for (let i = 0; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredient += `<li class=" alert alert-info m-2 p-2 ">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = ``;
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `<li class=" alert alert-danger m-2 p-2 ">${tags[i]}</li>`;
  }

  let cartona = `<div class="col-md-4 details text-white">
  <div class="">
          <img
            class="w-100 rounded-2"
            src=${meal.strMealThumb}
            alt=""
          />
          <h1>${meal.strMeal}</h1>
          </div>
        </div>
        <div class="col-md-8 details text-white">
        <div class="instruction-details">
          <h3>Instructions</h3>
          <p class="instruction my-3">
            ${meal.strInstructions}
          </p>
          <h3>Area : <span>${meal.strArea}</span></h3>
          <h3>Category : <span>${meal.strCategory}</span></h3>
          <h3 class="mb-4">Recipes :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap ">
            ${ingredient}
          </ul>
          <h3>Tags :</h3>
          <ul class="list-unstyled d-flex g-3 flex-wrap pb-3 ">
            ${tagsStr}
          </ul>
          <a target="-blank" href="${meal.strSource}" class="btn btn-outline-info">Source</a>
          <a target="-blank" href="${meal.strYoutube}" class="btn mx-2 btn-outline-success ">Youtube</a>
          </div>
        </div>`;
  rowData.innerHTML = cartona;
}

// function Show Contact
function showContact() {
  searchInput = "";
  rowData.innerHTML = `
       <div
      class="contact d-flex vh-100 justify-content-center align-items-center"
    >
      <div class="container">
        <div class="row gy-3">
          <div class="col-md-6">
            <input
            id="nameInput"
             onkeyup="inputValidation()"
              class="form-control w-75"
              type="text"
              placeholder="Enter Your Name"
            />
            <div id="nameAlert" class="alert alert-danger d-none mt-2">Name Is Vailed</div>
          </div>
          <div class="col-md-6">
            <input
            id="emailInput"
            onkeyup="inputValidation()"
              class="form-control w-75"
              type="email"
              placeholder="Enter Your Email"
            />
            <div id="emailAlert" class="alert alert-danger d-none mt-2">email Is Vailed</div>
          </div>
          <div class="col-md-6">
            <input
            id="phoneInput"
            onkeyup="inputValidation()"
              class="form-control w-75"
              type="tel"
              placeholder="Enter Your Phone"
            />
            <div id="phoneAlert" class="alert alert-danger d-none mt-2">phone Is Vailed</div>
          </div>
          <div class="col-md-6">
            <input
            id="ageInput"
            onkeyup="inputValidation()"
              class="form-control w-75"
              type="number"
              placeholder="Enter Your Age"
            />
            <div id="ageAlert" class="alert alert-danger d-none mt-2">age Is Vailed</div>
          </div>
          <div class="col-md-6">
            <input
            id="passwordInput"
            onkeyup="inputValidation()"
              class="form-control w-75"
              type="password"
              placeholder="Enter Your Password"
            />
            <div id="passwordAlert" class="alert alert-danger d-none mt-2">password Is Vailed</div>
          </div>
          <div class="col-md-6">
            <input
            id="rePasswordInput"
            onkeyup="inputValidation()"
              class="form-control w-75"
              type="password"
              placeholder="Enter Your Repassword"
            />
            <div id="rePasswordAlert" class="alert alert-danger d-none mt-2">rePassword Is Vailed</div>
          </div>
        </div>
        <div class="d-flex justify-content-center align-items-center my-3 ">
          <button disabled class="btn btn-outline-danger w-50" id="btn1">Submit</button>
        </div>
      </div>
    </div>
  `;
  submitBtn = document.getElementById("btn1");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInputTouched = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInputTouched = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInputTouched = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInputTouched = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInputTouched = true;
  });

  document.getElementById("rePasswordInput").addEventListener("focus", () => {
    rePasswordInputTouched = true;
  });
}

//Initiail Input Touched Value
let nameInputTouched = false;
let emailInputTouched = false;
let phoneInputTouched = false;
let ageInputTouched = false;
let passwordInputTouched = false;
let rePasswordInputTouched = false;

//Input Validation
function inputValidation() {
  if (nameInputTouched) {
    if (nameValidation()) {
      document
        .getElementById("nameAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("nameAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (emailInputTouched) {
    if (emailValidation()) {
      document
        .getElementById("emailAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("emailAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (phoneInputTouched) {
    if (phoneValidation()) {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("phoneAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (ageInputTouched) {
    if (ageValidation()) {
      document
        .getElementById("ageAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("ageAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (passwordInputTouched) {
    if (passwordValidation()) {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("passwordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (rePasswordInputTouched) {
    if (rePasswordValidation()) {
      document
        .getElementById("rePasswordAlert")
        .classList.replace("d-block", "d-none");
    } else {
      document
        .getElementById("rePasswordAlert")
        .classList.replace("d-none", "d-block");
    }
  }

  if (
    nameValidation() &&
    emailValidation() &&
    phoneValidation() &&
    ageValidation() &&
    passwordValidation() &&
    rePasswordValidation()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", "");
  }
}

//Validation Name
function nameValidation() {
  return /^[A-Za-z]+(?: [A-Za-z]+)*$/.test(
    document.getElementById("nameInput").value
  );
}
//Validation Email
function emailValidation() {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    document.getElementById("emailInput").value
  );
}
//Validation Phone
function phoneValidation() {
  return /^(\+2){0,1}(01)[0125][0-9]{8}$/gm.test(
    document.getElementById("phoneInput").value
  );
}
//Validation Age
function ageValidation() {
  return /^(1[01][0-9]|200|[1-9]?[0-9])$/.test(
    document.getElementById("ageInput").value
  );
}
//Validation Password
function passwordValidation() {
  return /^[\w\.-]{6,}$/gm.test(document.getElementById("passwordInput").value);
}
//Validation Repassword
function rePasswordValidation() {
  return (
    document.getElementById("rePasswordInput").value ===
    document.getElementById("passwordInput").value
  );
}
