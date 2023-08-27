const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

const adminKey = 'AdminSecretKey@1';
const userKey = 'UserSecretKey@2';

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

function authenticate(req, res, next, users=[], key){
  const sendAuthFailed = (arg) => {
    console.log(arg);
    res.status(403).json({'message': 'Authentication failed'});
  }
  let authHeader = req.headers.authorization;
  if(!authHeader)
    return sendAuthFailed(authHeader);
  authHeader = authHeader.split(' ');
  const token = authHeader[1];
  if(!token)
    return sendAuthFailed(token);
  jwt.verify(token, key, (err, payload) => {
    if(err || !payload || !payload.username || payload.username != req.headers.username)
      return sendAuthFailed();
    const user = users.find(u => u.username === payload.username);
    if(!user)
      sendAuthFailed();
    req.user = user;
    next();
  });
}

function authenticateAdmin(req, res, next){
  return authenticate(req, res, next, ADMINS, adminKey);
}

function authenticateUser(req, res, next){
  return authenticate(req, res, next, USERS, userKey);
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  let tmpUser = new User(req.headers);
  const user = ADMINS.find( u => u.username === tmpUser.username);
  if(!user){
    ADMINS.push(tmpUser);
    const payload = {username: tmpUser.username};
    const token = jwt.sign(payload, adminKey, {expiresIn: '1h'});
    return res.json({'message': 'Admin created successfully', token});
  }
  return res.status(403).json({'message': 'Admin already exists'});
});

app.post('/admin/login', (req, res) => {
  const tmpUser = new User(req.headers);
  const validUser = ADMINS.find(u => u.username===tmpUser.username && u.password === tmpUser.password);
  if(!validUser)
    return res.status(403).json({'message': 'Login failure'});
  const payload = {username: validUser.username};
  const token = jwt.sign(payload, adminKey, {expiresIn: '1h'});
  res.json({'message': 'Logged in successfully', token});
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
  let tmpUser = new User(req.headers);
  const user = USERS.find( u => u.username === tmpUser.username);
  if(!user){
    USERS.push(tmpUser);
    const payload = {username: tmpUser.username};
    const token = jwt.sign(payload, userKey, {expiresIn: '1h'});
    return res.json({'message': 'Admin created successfully', token});
  }
  return res.status(403).json({'message': 'Admin already exists'});
});

app.post('/users/login', (req, res) => {
  const tmpUser = new User(req.headers);
  const validUser = USERS.find(u => u.username===tmpUser.username && u.password === tmpUser.password);
  if(!validUser)
    res.status(403).json({'message': 'Login failure'});
  const payload = {username: validUser.username};
  const token = jwt.sign(payload, userKey, {expiresIn: '1h'});
  res.json({'message': 'Logged in successfully', token});
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
