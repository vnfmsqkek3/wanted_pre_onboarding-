const express = require(`express`);
const mysql = require('mysql');
const bodyParser = require(`body-parser`);
require('dotenv').config()
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  database : process.env.RDS_DATABASE
});

connection.connect();

app.post("/register", (req, res) => {
	let data = { 
    채용포지션: req.body.채용포지션, 
    채용보상금: req.body.채용보상금,
    채용내용  : req.body.채용내용,
    사용기술  : req.body.사용기술
  };
	let sql = "INSERT INTO company SET ?";
	let query = connection.query(sql, data, (err, result) => {
		if (err) throw err;
		res
    .status(201)
    .header('Content-Type', 'application/json; charset=utf-8')
    .send("성공")
	});
});

app.get("/view", (req, res) => {
	let sql = "SELECT * FROM company";
	let query = connection.query(sql, (err, result) => {
		if (err) throw err;
		//res.send(JSON.stringify({ status: 200, error: null, response: result }));
    res
    .status(200)
    .send(result)
	});
});

  app.listen(3000, () => {
    console.log("server started on port 3000...");
  });