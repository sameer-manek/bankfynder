const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/bankfynder');

// queryTypes

const queryTypes = {
	select: sequelize.QueryTypes.SELECT
}
sequelize.authenticate()
	.then(() => console.log("Connection has been eshtablished"))
	.catch(err => console.log("Unable to connect: ", err))

app.get("/", (req, res) => {
	return res.send("hello world")
})

app.get("/branch/:ifsc", (req, res) => {
	let query = "SELECT * FROM bank_branches WHERE ifsc = '" + req.params.ifsc + "' LIMIT 1"
	sequelize.query(query, { type: queryTypes.select }).then(details => {
		return res.json(details[0])
	})
})

app.get("/branches", (req, res) => {
	let query = "SELECT * FROM bank_branches WHERE bank_name = '" + req.query.bank + "' AND city = '" + req.query.city + "'"
	sequelize.query(query, { type: queryTypes.select }).then(details => {
		return res.json(details)
	})
})

app.get("/branches", (req, res) => {
	let query = "SELECT * FROM bank_branches WHERE bank_id = '" + req.query.bank + "' AND city = '" + req.query.city + "'"
	sequelize.query(query, { type: queryTypes.select }).then(details => {
		return res.json(details)
	})
})

app.get("/branches/:bank/:city", (req, res) => {
 	let query = "SELECT * FROM bank_branches WHERE bank_name = '" + req.params.bank + "' AND city = '" + req.params.city + "'"
 	console.log(query)
	sequelize.query(query, { type: queryTypes.select }).then(details => {
		return res.json(details)
	})
})

app.get("/branches/:bank/:city", (req, res) => {
 	let query = "SELECT * FROM bank_branches WHERE bank_id = '" + req.params.bank + "' AND city = '" + req.params.city + "'"
 	console.log(query)
	sequelize.query(query, { type: queryTypes.select }).then(details => {
		return res.json(details)
	})
})

app.listen(4000, _ => console.log("the server is running on port 4000"))