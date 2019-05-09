var mongoose = require('mongoose')

const Schema = mongoose.Schema;


let TaskSchema = new Schema({
	"taskName": String,
	"time": String,
	"description": String,
	"isCompleted": Boolean,
	"reminderTime":String
})

//since we have defined our database structure, we need to export it and make it available for use

module.exports = mongoose.model('Task', TaskSchema)

