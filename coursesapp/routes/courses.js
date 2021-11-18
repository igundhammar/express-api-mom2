var express = require('express');
var router = express.Router();
const fs = require('fs');
const rawdata = fs.readFileSync('./courses.json');
let courses = JSON.parse(rawdata);
if (courses == "") {
  courses = [];
}



// Get all courses
router.get('/', function (req, res) {
  var out = "[";
  for (row of courses) {
    out += row.toString().replace("'", "");
    out += ",";
  }
  out += "]";
  out = out.replace(",]", "]");
  res.contentType('application/json');
  res.send(courses);
});


// Get specific course by id
router.get('/:id', function (req, res) {
  var intID = parseInt(req.params.id);
  foundCourse = courses.find(({
    _id
  }) => _id == intID);
  if (foundCourse == undefined) {
    foundCourse = {
      "Message": "No course found"
    };
  }
  res.contentType('application/json');
  res.send(foundCourse);
});


// Delete specific course by id
router.delete('/:id', async function (req, res) {
  var intID = parseInt(req.params.id);
  for (var i = 0; i < courses.length; i++) {
    if (courses[i]._id == intID) {
      courses.splice(i, 1);
      fs.promises.writeFile('./courses.json', JSON.stringify(courses));
      var deletedCourse = {
        "Message": "Course deleted"
      };
    } else {
      deletedCourse = {
        "Message": "No course with id " + intID + " found"
      };
    }
  }
  res.contentType('application/json');
  res.send(deletedCourse);
});


// Add new course
router.post('/', async function (req, res) {
    let body = req.body;
    courses.push(body);
    fs.promises.writeFile('./courses.json', JSON.stringify(courses));
    res.status(200);
    addedCourse = {
      "Message" : "Course added"
    }
  res.contentType('application/json');
  res.send(addedCourse);
})

module.exports = router;