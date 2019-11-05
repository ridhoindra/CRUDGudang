const path = require("path"); 
const express = require("express"); 
const hbs = require("hbs"); 
const bodyParser = require("body-parser"); 
const mysql = require("mysql"); 
const app = express()
const port = 8000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "apibuku"
});

db.connect(err => {
    if(err) throw err;
    console.log("Database Connected ...");
});

app.set("view engine", "hbs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get("/", (req, res) => {
  let sql = "select * from gudang";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.render("index", {
      posts: results
    });
  });
});

app.post('/tambah', (req, res) => {
  let data = {
      nama : req.body.nama,
      deskripsi: req.body.deskripsi,
      stok: req.body.stok
  };
  let sql = "INSERT INTO gudang SET ?";
  let query = db.query(sql,data,(err,results)=>{
      if (err) throw err;
      res.redirect("/");
  });
});

app.post('/edit', function (req, res) {
  let sql =
    'UPDATE gudang SET nama="' +
    req.body.nama +
    '", deskripsi="' +
    req.body.deskripsi +
    '", stok="' +
    req.body.stok +
    '" where id=' +
    req.body.id;
  let query = db.query(sql,(err,results)=>{
      if (err) throw err;
      res.redirect("/");
  });
});

app.post('/delete', function (req, res) {
  let sql = "DELETE FROM gudang WHERE id="+req.body.id;
  let query = db.query(sql,(err, results)=>{
      if (err) throw err;
      res.redirect("/");
  });
});

app.listen(port, () => console.log(`Example app listening on port 8000!`))