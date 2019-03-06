const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const sequelize = new Sequelize('postgres://ftycsmyztfxhfv:934974f303f230e8267bbbefe59e87f0222ed5d772836a676a1edf8c038ea35a@ec2-54-83-44-4.compute-1.amazonaws.com:5432/d25d3sh7bvjnln');

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