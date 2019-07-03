'use strict'
const mysql = require('mysql2/promise')
require('dotenv').config()

class connector {
  constructor(config) {
    this.config = {
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      database: config.database
    }
  }
  connect() {
    return mysql.createConnection(this.config)
  }
}

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
}
const conn = new connector(config)
;(async () => {})()

exports.excecute = async () => {
  const connection = await conn.connect()
  const [rows, fields] = await connection.execute('select * from users')
  connection.end()
  return rows
}

exports.addUser = async userObject => {
  const connection = await conn.connect()
  const rows = await connection.execute(
    'insert into users (name, lineid, email, qrcode) values(?, ?, ?, ?);',
    [userObject.name, userObject.lineid, userObject.email, userObject.qrcode]
  )
  connection.end()
  return rows
}
