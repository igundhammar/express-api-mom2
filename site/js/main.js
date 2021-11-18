const outputEl = document.getElementById('output');
const messageEl = document.getElementById('message');
const courseCodeEl = document.getElementById('courseCode');
const courseNameEl = document.getElementById('courseName');
const coursePeriodEl = document.getElementById('coursePeriod');
const addCourseBtn = document.getElementById('addCourseBtn');
let last_id;
const url = new URL("http://localhost:3000/courses");


window.addEventListener('load', getAllCourses);
addCourseBtn.addEventListener('click', addCourse);


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


function deleteCourse(id) {
    fetch(url + "/" + id, {
        method: 'DELETE',
    })
    getAllCourses();
    messageEl.innerHTML = `<b>Kurs raderad</b>`;

}


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