const mysql = require('mysql');

let connecttion = mysql.createConnection({
    user:'root',
    host:'localhost',
    port:3306,
    password:'root',
    database:'1704e'
})

connecttion.connect((error) => {
    if(error){
        console.log("连接失败")
    }else{
        console.log('连接成功')
    }
})

module.exports = connecttion