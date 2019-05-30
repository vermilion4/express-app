var express = require('express')
var bodyParser = require('body-parser')

var mongoose = require('mongoose')
var SignUp = require('./model/signup')
var Login = require('./model/login')
var Task = require('./model/task')
// require("./config/db")
var app = express()

var port = process.env.PORT || 8080


//create db connection
const dbURI = `mongodb+srv://Vermilion4:${encodeURIComponent('Godisgood1%24')}@express-mongodb-iixat.mongodb.net/expressapi?retryWrites=true`
const options = {
	reconnectTries:Number.MAX_VALUE,
	poolSize:10
}

mongoose.connect(dbURI, options) .then( 
	()=>{
	console.log('Database connection established');
},
err => {
	console.log('Database connection error due to: ', err) 
}
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

// allow cross origin request
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){

	res.send('HOMEPAGE')
})

app.post('/signup', function(req, res){
	// i am expecting data from a form from the server, so i will use body parser.

	var signupData = req.body

	//then save the data inside my database
	var dataTosave = new SignUp(req.body)
	// dataTosave = req.body
	dataTosave.save(function(err, signUpdata){
		if(err){ res.json({err})}
			else{
				//save login to database
				var saveLoginData = new Login({username : req.body.username, password: req.body.password})

				saveLoginData.save(function(err, data){
					if(err){ res.json({err})}
						else{ res.json(signUpdata) }
				})
			 }
	})

	
})

//handling login route
//This is also a post method since its sending data to the server

app.post('/login', function(req, res){
	//extract the data that is coming in from your response

	var loginData = req.body

	// check if your login credentials is correct in your database
	 Login.find({ username: req.body.username, password: req.body.password}, function (err, data) {
		if (err){
			res.json({err})
		}
		else{
			console.log(data)
			if(data[0]){
				res.json(data[0])
				}
				else{ 
					res.json({
							text: "user does not exist"
				})
					
			}
			
		}
	});

	
})

app.post('/task', function(req, res){
	//handling route for posting task

	var taskData = req.body

	//save task to the database
	var taskToSave = new Task(req.body)

	taskToSave.save((err, data)=>{
		if(err){
			res.json({err})
		}
		else{
			res.json(data)
		}
	})

})
//handle get method to get all tasks from database
app.get('/viewTask', function(req, res){

	Task.find({}, function(err,data){
		if(err){
			res.json({err})
		}
		else{
			res.json(data)
		}
	})
})

//route to update the task if it is completed. put<=>up
	//get the data from the requestdate
app.patch('/update/:taskId', function(req, res){

	var update = req.body

	//update your database
	
		Task.findByIdAndUpdate({_id:req.params.taskId}, update, function(err, data){
			if(err){
				res.json({err})
			}
			else{
				res.json(data)
			}
			
		})
		
	

	//send your response

})

//handling the delete task route
app.delete('/delete/:taskId', (req, res)=>{

	//get the task id
	var taskId = {_id:req.params.taskId}//req.params is made available by the body parser module.

	//search for task in the database using its id, and delete if found
	Task.findByIdAndDelete(taskId, function(err, data){

	if(err){
		res.json({err})
	}

	//send response to client
	res.json({text: "Task successfully deleted"})
})

})
//handling logout route
app.get('/logout', (req, res)=>{
	res.json({text: "Log out successful."})
})

app.listen(port,  "0.0.0.0", function() {console.log(`server started at port ${port}`)})