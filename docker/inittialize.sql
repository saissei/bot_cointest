
SET CHARSET UTF8;
create database linebot
DEFAULT CHARACTER
SET utf8;
create user 'zbbuser'@'localhost' identified by 'Today123';
create user 'zbbuser'@'172.17.0.1' identified by 'Today123';
create user 'zbbuser'@'%' identified by 'Today123';
GRANT ALL ON linbot.* TO rsuser@
'%' IDENTIFIED BY 'Today123';


use linebot;
SET CHARACTER_SET_CLIENT
= utf8;
SET CHARACTER_SET_CONNECTION
= utf8;

create table users
(
  id int NOT NULL
  auto_increment,
  name VARCHAR
  (255),
  lineid VARCHAR
  (255),
  email varchar
  (255),
  qrcode longblob,
  PRIMARY KEY
  (id)
) DEFAULT CHARACTER
  SET utf8;

  create table zebra_user
  (
    id int,
    name VARCHAR(255),
    lineid VARCHAR(255),
    jwt varchar(255),
    password VARCHAR(255),
    PRIMARY KEY(id)
  )
  DEFAULT CHARACTER
  SET utf8;

  INSERT INTO users
    (name, lineid, email)
  values('testUsr001', '', 'issei.kariya@zerobillbank.com');
  INSERT INTO loginuser
    (name, lineid, email)
  values('testUsr001', '', 'issei.kariya@zerobillbank.com');

