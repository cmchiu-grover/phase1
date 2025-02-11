# Week 5

## Task 2: Create database and table in your MySQL server

- Create a new database named website.

```
mysql> CREATE DATABASE website;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/001.jpg)

- Create a new table named member, in the website database, designed as below:...

```
CREATE TABLE member (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    follower_count INT NOT NULL DEFAULT 0,
    `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/002.jpg)

## Task 3: SQL CRUD

- INSERT a new row to the member table where name, username and password must be set to test. INSERT additional 4 rows with arbitrary data.

```
INSERT INTO member (name, username, `password`) VALUES ('test', 'test', 'test');
INSERT INTO member (name, username, `password`) VALUES ('user001', 'user001', 'qaz12345');
INSERT INTO member (name, username, `password`) VALUES ('user002', 'user002', 'qaz12345');
INSERT INTO member (name, username, `password`) VALUES ('user003', 'user003', 'qaz12345');
INSERT INTO member (name, username, `password`) VALUES ('user004', 'user004', 'qaz12345');
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/003.jpg)

- SELECT all rows from the member table.

```
SELECT * FROM member;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/004.jpg)

- SELECT all rows from the member table, in descending order of time.

```
SELECT * FROM member ORDER BY `time` DESC;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/005.jpg)

- SELECT total 3 rows, second to fourth, from the member table, in descending order of time.

```
SELECT * FROM member ORDER BY `time` DESC LIMIT 1,3;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/006.jpg)

- SELECT rows where username equals to test.

```
SELECT * FROM member WHERE username = 'test'
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/007.jpg)

- SELECT rows where name includes the es keyword.

```
SELECT * FROM member WHERE name like '%es%';
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/008.jpg)

- SELECT rows where both username and password equal to test.

```
SELECT * FROM member WHERE (username = 'test' and `password` = 'test');
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/009.jpg)

- UPDATE data in name column to test2 where username equals to test.

```
UPDATE member SET name = 'test2' WHERE username = 'test';
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/010.jpg)

## Task 4: SQL Aggregation Functions

- SELECT how many rows from the member table.

```
SELECT COUNT(id) FROM member;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/011.jpg)

- SELECT the sum of follower_count of all the rows from the member table.

```
SELECT SUM(follower_count) AS `Sum of follower_count of all the rows` FROM member;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/012.jpg)

- SELECT the average of follower_count of all the rows from the member table.

```
SELECT AVG(follower_count) AS `Average of follower_count of all the rows` FROM member;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/013.jpg)

- SELECT the average of follower_count of the first 2 rows, in descending order of follower_count, from the member table.

```
SELECT AVG(follower_count) AS `Average of follower_count of the first 2 the rows` FROM ( SELECT * FROM member ORDER BY follower_count DESC LIMIT 2) t;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/014.jpg)

## Task 5: SQL JOIN

- Create a new table named message, in the website database. designed as below:

```
CREATE TABLE message (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    member_id BIGINT NOT NULL,
    `content` VARCHAR(255) NOT NULL,
    like_count INT NOT NULL DEFAULT 0,
    `time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(id)
    );
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/015.jpg)

- SELECT all messages, including sender names. We have to JOIN the member table

```
SELECT DISTINCT b.*, a.username FROM message b LEFT JOIN member a ON a.id = b.member_id;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/016.jpg)

- SELECT all messages, including sender names, where sender username equals to
  test. We have to JOIN the member table to filter and get that.

```
SELECT DISTINCT b.*, a.username FROM message b LEFT JOIN member a ON a.id = b.member_id
WHERE a.username = 'test';
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/017.jpg)

- Use SELECT, SQL Aggregation Functions with JOIN statement, get the average like
  count of messages where sender username equals to test.

```
SELECT AVG(b.like_count) AS `Average like count` FROM message b LEFT JOIN member a ON a.id = b.member_id
WHERE a.username = 'test';
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/018.jpg)

- Use SELECT, SQL Aggregation Functions with JOIN statement, get the average like
  count of messages GROUP BY sender username.

```
SELECT a.username, AVG(b.like_count) AS `Average like count` FROM message b LEFT JOIN member a ON a.id = b.member_id
GROUP BY a.username;
```

![image](https://github.com/cmchiu-grover/phase1/blob/main/week5/img/019.jpg)
