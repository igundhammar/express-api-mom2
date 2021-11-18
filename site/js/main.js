// Code by Ida Gundhammar, 2021-11-18 - Mittuniversitetet HT20


// Declaring variables
const outputEl = document.getElementById('output');
const messageEl = document.getElementById('message');
const courseCodeEl = document.getElementById('courseCode');
const courseNameEl = document.getElementById('courseName');
const coursePeriodEl = document.getElementById('coursePeriod');
const addCourseBtn = document.getElementById('addCourseBtn');
let last_id;



// Declare url to use with fetch
const url = new URL("http://localhost:3000/courses");



// Eventlisteners on window and button
window.addEventListener('load', getAllCourses);
addCourseBtn.addEventListener('click', addCourse);



// Function to get all courses. Write table to HTML and fetch data with url. Loop through result and write to HTML.
async function getAllCourses() {
    outputEl.innerHTML = "";
    outputEl.innerHTML = "<tr><th>ID</th><th>Kod</th><th>Namn</th><th>Period</th><th>Radera</th></tr>";
    await fetch(url)
        .then(response => response.json())
        .then((data) => {
            data.forEach(course => {
                outputEl.innerHTML += `<tr><th>${course._id}</th><th>${course.courseId}</th><th>${course.courseName}</th><th>${course.coursePeriod}</th><th><button onclick="deleteCourse(${course._id})">Radera<th></tr>`;
                last_id = course._id + 1;

            })
        });
}



// Function to delete course. Use method delete with id from the clicked button. Write message and call getAllCourses again to update the website with correct data.
function deleteCourse(id) {
    fetch(url + "/" + id, {
        method: 'DELETE',
    })
    getAllCourses();
    messageEl.innerHTML = `<b>Kurs raderad</b>`;

}


// Function to add a new course. Get values from inputs. Make sure inputs are not empty. If not, create JSON object and send as body in fetch request. Call getAllCourses again to update the website with correct data.
async function addCourse(e) {
    e.preventDefault();
    let courseCodeValue = courseCodeEl.value;
    let courseNameValue = courseNameEl.value;
    let coursePeriodValue = coursePeriodEl.value;
    if (courseCodeValue == "" || courseNameValue == "" || coursePeriodValue == "") {
        messageEl.innerHTML = `<b>Fyll i alla fält</b>`;
    } else {
        var body = {
            "_id": last_id,
            "courseId": courseCodeValue,
            "courseName": courseNameValue,
            "coursePeriod": coursePeriodValue
        }
    }
    await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    await getAllCourses();

}