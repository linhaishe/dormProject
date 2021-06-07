CREATE DATABASE dromProject2;
use dromProject2;

CREATE TABLE admins(
	id INT PRIMARY KEY AUTO_INCREMENT,
	adminId varchar(16) UNIQUE NOT NULL,
	adminName varchar(20) NOT NULL,
	adminPwd varchar(16) NOT NULL,
	adminType INT default 1
);

CREATE TABLE news(
	id INT PRIMARY KEY AUTO_INCREMENT,
	userId varchar(16) NOT NULL,
	userName varchar(20) NOT NULL,
	title varchar(16) NOT NULL,
	content varchar(300) NOT NULL,
    uploadTime DATETIME NOT NULL,
    CONSTRAINT FOREIGN KEY(userId) REFERENCES admins(adminId)
);

DROP TABLE news;

INSERT INTO news 
VALUES 
(1,999,'陈若','test2','test2','2018-12-20 10:01:00'
);

INSERT INTO news 
VALUES 
(2,999,'陈若','test3','test3','2018-12-21 10:01:00'
),
(3,999,'陈若','test4','test4','2018-12-22 10:01:00'
),
(4,999,'陈若','test5','test5','2018-12-23 10:01:00'
),
(5,999,'陈若','test6','test6','2018-12-24 10:01:00'
),
(6,999,'陈若','test7','test7','2018-12-25 10:01:00'
);

CREATE TABLE students(
	id INT PRIMARY KEY AUTO_INCREMENT,
    -- 学生编号
	stuId int unique NOT NULL,
    -- 学生姓名
	stuName varchar(20) NOT NULL,
    -- 学生登入用户名
    stuUserId int unique not null,
	stuDormId int,
	stuPwd int,
    CONSTRAINT FOREIGN KEY(stuDormId) REFERENCES dorms(id)
);

CREATE TABLE dorms(
	id INT PRIMARY KEY AUTO_INCREMENT,
	balance int default 0,
    -- 宿舍编号
	dormId int unique NOT NULL,
    dormName varchar(40) unique not null,
	peopleNum int default 0,
	dormType int default 1
);

CREATE TABLE payRecords(
	id INT PRIMARY KEY AUTO_INCREMENT,
	payTime datetime,
    amount float default 0,
	dormId int,
	stuId int,
    CONSTRAINT FOREIGN KEY(dormId) REFERENCES dorms(id),
    CONSTRAINT FOREIGN KEY(stuId) REFERENCES students(id)
);










