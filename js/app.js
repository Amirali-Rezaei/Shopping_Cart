// Variabels
const courses = document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody");
const clearCartBtn = document.querySelector("#clear-cart");

// Event Listeners
function eventListeners() {
  courses.addEventListener("click", buyCourse);

  // Remove Course From Cart Event Listener
  shoppingCartContent.addEventListener("click", removeCourse);

  // Empty The Cart
  clearCartBtn.addEventListener("click", clearCart);

  // Get Courses From LocalStorage On Load
  document.addEventListener("DOMContentLoaded", showCoursesOnLoad);
}

eventListeners();

// Functions

// Add The Course To The Cart
function buyCourse(e) {
  e.preventDefault();

  // Checking The Clicked Element And Using Delegation To Get The Course Info
  if (e.target.classList.contains("add-to-cart")) {
    // Access To The Course "Div"
    const course = e.target.parentElement.parentElement;

    // Read HTML Values
    getCourseInfo(course);
  }
}

// Reads HTML Values Of The "Div" That We Pass To It When We Call It
function getCourseInfo(course) {
  // Getting Course Info And Save It To An Object
  const courseInfo = {
    courseImage: course.querySelector("img").src,
    courseName: course.querySelector("h4").textContent,
    coursePrice: course.querySelector(".info-card p span").textContent,
    courseId: course.querySelectorAll("a")[1].getAttribute("data-id"),
  };

  addToCart(courseInfo);
}

// Adding The Course To The Card Fuction
function addToCart(courseInfo) {
  // Creating a <tr> tag
  let row = document.createElement("tr");

  // Building a HTML template
  row.innerHTML = `
    <tr>
      <td>
        <img src="${courseInfo.courseImage}" width="100px" alt="عکس دوره"/>
      </td>
      <td>${courseInfo.courseName}</td>
      <td>${courseInfo.coursePrice}</td>
      <td>
        <a class="remove" href="#" data-id="${courseInfo.courseId}" >X</a>
      </td>
    </tr>
  `;

  // Adding The Course To The Cart
  shoppingCartContent.appendChild(row);

  saveToLocalStorage(courseInfo);
}

// Course Removing From Cart Function
function removeCourse(e) {
  let course, courseId;

  e.preventDefault();

  if (e.target.classList.contains("remove")) {
    course = e.target.parentElement.parentElement;
    courseId = course.querySelector("a").getAttribute("data-id");

    e.target.parentElement.parentElement.remove();
  }

  // Remove Course From LocalStorage
  removeFromLocalStorage(courseId);
}

// Removes All Courses From Cart
function clearCart(e) {
  e.preventDefault();
  // Not A Good Way But A Working One
  // shoppingCartContent.innerHTML = "";

  while (shoppingCartContent.firstChild) {
    shoppingCartContent.firstChild.remove();
  }

  clearCartFromLocalStorage();
}

// Clears The Hole Cart That It's In LocalStorage
function clearCartFromLocalStorage() {
  localStorage.clear();
}

// Saves The Item To The LocalStorage
function saveToLocalStorage(course) {
  // Get An Array Of Courses From LocalStorage
  let courses = getCoursesFromLocalStorage();

  // Adds The New Course To The Courses Array
  courses.push(course);

  localStorage.setItem("courses", JSON.stringify(courses));
}

// Gets Content From LocalStorage
function getCoursesFromLocalStorage() {
  let courses;

  // Checks If The LocalStorage Is Empty Or Not
  if (localStorage.getItem("courses")) {
    courses = JSON.parse(localStorage.getItem("courses"));
  } else {
    courses = [];
  }

  return courses;
}

// Get Courses From LocalStorage On Load And Add Them To The cart
function showCoursesOnLoad() {
  let coursesInLocalStorage = getCoursesFromLocalStorage();

  // Add Courses Into The Cart
  coursesInLocalStorage.forEach(function (course) {
    // Creating a <tr> tag
    let row = document.createElement("tr");

    // Building a HTML template
    row.innerHTML = `
    <tr>
      <td>
        <img src="${course.courseImage}" width="100px" alt="عکس دوره"/>
      </td>
      <td>${course.courseName}</td>
      <td>${course.coursePrice}</td>
      <td>
        <a class="remove" href="#" data-id="${course.courseId}" >X</a>
      </td>
    </tr>
  `;

    shoppingCartContent.appendChild(row);
  });
}

// Removing Course From LocalStorage
function removeFromLocalStorage(courseId) {
  let coursesList = getCoursesFromLocalStorage();

  coursesList.forEach(function (course, index) {
    if (course.courseId == courseId) {
      coursesList.splice(index, 1);
    }
  });

  localStorage.setItem("courses", JSON.stringify(coursesList));
}
