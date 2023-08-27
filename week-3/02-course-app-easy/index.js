const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [{'username': "admin", 'password': "pass", 'purchasedCourses': []}];
let USERS = [{'username': "user", 'password': "pass", 'purchasedCourses': []}];
let COURSES = [{
  "id": -1,
  "title": "course title 2 edited",
  "description": "course description",
  "price": 100,
  "imageLink": "https://linktoimage.com",
  "published": true
}];
let courseId = 0;

function User(headers){
  this.username = headers.username;
  this.password = headers.password;
  this.purchasedCourses = [];
}

function Course(data, cid = courseId++){
  this.id = cid;
  this.title = data.title;
  this.description = data.description;
  this.price = data.price;
  this.imageLink = data.imageLink;
  this.published = data.published;
}

function authenticate(users, headers){
  let tmpUser = new User(headers);
  const validUser = users.find( u => u.username === tmpUser.username && u.password === tmpUser.password);
  return validUser;
}

function authenticateAdmin(req, res, next){
  const validUser = authenticate(ADMINS, req.headers);
  if(validUser){
    req.user = validUser; 
    return next();
  }
  return res.status(403).json({'message': 'Admin authentication failed'});
}

function authenticateUser(req, res, next){
  const validUser = authenticate(USERS, req.headers);
  if(validUser){
    req.user = validUser; 
    return next();
  }
  return res.status(403).json({'message': 'User authentication failed'});
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  let tmpUser = new User(req.headers);
  const user = ADMINS.find( u => u.username === tmpUser.username);
  if(!user){  
    ADMINS.push(tmpUser);
    return res.json({'message': 'Admin created successfully'});
  }
  else{
    return res.status(403).json({'message': 'Admin already exists'});
  }
});

app.post('/admin/login', authenticateAdmin, (req, res) => {
  res.json({'message': 'Logged in successfully'});
});

app.post('/admin/courses', authenticateAdmin, (req, res) => {
  let tmpCourse = new Course(req.body);
  const sameCourse = COURSES.find(c => c.title === tmpCourse.title);
  if(!sameCourse){
    COURSES.push(tmpCourse);
    return res.json({'message': 'Course created successfully', 'id':tmpCourse.id})
  }
  return res.status(403).json({'message': 'Course already exists!'});
});

app.put('/admin/courses/:courseId', authenticateAdmin, (req, res) => {
  const id = parseInt(req.params['courseId']);
  const existingCourse = COURSES.find(c => c.id === id);
  if(existingCourse){
    const editedCourse = new Course(req.body, id);
    Object.assign(existingCourse, editedCourse);
    return res.json({'message': 'Course updated successfully'});
  }
  return res.status(403).json({'message': 'Course updation failed'});
});

app.get('/admin/courses', authenticateAdmin, (req, res) => {
  return res.json({'courses': COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  const tmpUser = new User(req.headers);
  const existingUser = USERS.find( u => u.username === tmpUser.username);
  if(!existingUser){
    USERS.push(tmpUser);
    return res.json({'message': 'User created successfully'});
  }
  return res.status(403).json({'message': 'User already exists'});
});

app.post('/users/login', authenticateUser, (req, res) => {
  res.json({'message': 'Logged in successfully'});
});

app.get('/users/courses', authenticateUser, (req, res) => {
  res.json({'courses': COURSES});
});

app.post('/users/courses/:courseId', authenticateUser, (req, res) => {
  const id = parseInt(req.params.courseId);
  const course = COURSES.find(c => c.id === id);
  if(course){
    req.user.purchasedCourses.push(id);
    return res.json({'message': 'Course purchased successfully'});
  }
  return res.status(404).json({'message': 'Course not found'});
});

app.get('/users/purchasedCourses', authenticateUser, (req, res) => {
  const purchasedCourses = COURSES.filter(c => req.user.purchasedCourses && req.user.purchasedCourses.includes(c.id));
  return res.json({'purchasedCourses': purchasedCourses});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
