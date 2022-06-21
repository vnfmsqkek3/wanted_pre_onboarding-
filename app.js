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

//Create 회사 등록
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
    .send("채용공고 생성 완료")
	});
});

//잘 들어갔는지 보기위한 테스트용
app.get("/view", (req, res) => {
	let sql = "SELECT * FROM company";
	let query = connection.query(sql, (err, result) => {

		if (err) throw err;
    res
    .status(200)
    .send(result)
    console.log(result)
	});
});

  //update
app.put('/register/:id',(req,res)=>{
  const sql = "UPDATE company SET ? WHERE 회사_id = " + req.params.id;
  connection.query(sql,req.body,function (err, result, fields) {  
    if (err) throw err;
    res
    .status(201)
    .send(result)
    });
});
  

//Delete User
app.delete('/register/:id',(req, res) => {
  let sql = "DELETE FROM company WHERE 회사_id="+req.params.id;
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify("삭제 완료"));
  });
});

  app.listen(3000, () => {
    console.log("server started on port 3000...");
  });