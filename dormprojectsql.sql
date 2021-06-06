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
	userId varchar(16) UNIQUE NOT NULL,
	userName varchar(20) NOT NULL,
	title varchar(16) NOT NULL,
	content varchar(300) NOT NULL,
    uploadTime DATETIME NOT NULL,
    CONSTRAINT FOREIGN KEY(userId) REFERENCES admins(adminId)
);

INSERT INTO admins 
VALUES 
(1,999,"陈若",999,1);








