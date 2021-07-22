// Variabels
const courses = document.querySelector("#courses-list");
const shoppingCartContent = document.querySelector("#cart-content tbody");

// Event Listeners
function eventListeners() {
  courses.addEventListener("click", buyCourse);
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
  // Creating an <tr> tag
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

  shoppingCartContent.appendChild(row);
}
