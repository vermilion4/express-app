var express = require('express')
var bodyParser = require('body-parser')

var mongoose = require('mongoose')
var SignUp = require('./model/signup')
var Login = require('./model/login')
// require("./config/db")
var app = express()

var port = 3000 || process.env.port


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

app.get('/', function(req, res){

	res.send('HOMEPAGE')
})

app.post('/signup', function(req, res){
	// i am expecting data from a form from the server, so i will use body parser.

	var signupData = req.body

	//then save the data inside my database
	var dataTosave = new SignUp(req.body)
	// dataTosave = req.body
	dataTosave.save((err, data) => {
		if(err){ res.send(err)}
			else{
				var saveLoginData = new Login({password: req.body.password, username : req.body.username})

				saveLoginData.save((err, data) =>{
					if(err){ res.send(err)}
						else{ res.json(data) }
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
			res.send('login error')
		}
		else{
			console.log(data)
			if(data[0]){
				res.send('Login successful')
				}
				else{ res.send("user does not exist")}
			
		}
	});

	
})

app.post('/task', function(req, res){
	//handling route for posting task

	var taskData = req.body

	//save task to the database

	//server response
	res.json(taskData)
})

//route to update the task if it is completed. put<=>update
app.put('/update:task', function(req, res){
	//get the data from the request

	var updateData = req.body.isCompleted

	//update your database

	//send your response
	res.send('Task is completed')
})

//handling the delete task route
app.delete('/delete:taskId', (req, res)=>{

	//get the task id
	var taskId = req.params.taskId //req.params is made available by the body parser module.

	//search for task in the database using its id, and delete if found


	//send response to client
	res.send('Task successfully deleted')
})

//handling logout route
app.get('/logout', (req, res)=>{
	res.send('Log out successful.')
})

app.listen(port, ()=> {console.log(`server started at port ${port}`)})