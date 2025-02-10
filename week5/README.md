# Week 5

## Task 2: Create database and table in your MySQL server

- Create a new database named website.

```
mysql> CREATE DATABASE website;
```

![image](url)

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

![image](url)

## Task 3: SQL CRUD

- INSERT a new row to the member table where name, username and password must be set to test. INSERT additional 4 rows with arbitrary data.

```
INSERT INTO member (name, username, `password`) VALUES ('test', 'test', 'test');
INSERT INTO member (name, username, `password`) VALUES ('user001', 'user001', 'qaz12345');
INSERT INTO member (name, username, `password`) VALUES ('user002', 'user002', 'qaz12345');
INSERT INTO member (name, username, `password`) VALUES ('user003', 'user003', 'qaz12345');
INSERT INTO member (name, username, `password`) VALUES ('user004', 'user004', 'qaz12345');
```

![image](url)

- SELECT all rows from the member table.

```
SELECT * FROM member;
```

![image](url)

- SELECT all rows from the member table, in descending order of time.

```
SELECT * FROM member ORDER BY `time` DESC;
```

![image](url)

- SELECT total 3 rows, second to fourth, from the member table, in descending order of time.

```
SELECT * FROM member ORDER BY `time` DESC LIMIT 1,3;
```

![image](url)

- SELECT rows where username equals to test.

```
SELECT * FROM member WHERE username = 'test'
```

![image](url)

- SELECT rows where name includes the es keyword.

```
SELECT * FROM member WHERE name like '%es%';
```

![image](url)

- SELECT rows where both username and password equal to test.

```
SELECT * FROM member WHERE (username = 'test' and `password` = 'test');
```

![image](url)

- UPDATE data in name column to test2 where username equals to test.

```
UPDATE member SET name = 'test2' WHERE username = 'test';
```

![image](url)

## Task 4: SQL Aggregation Functions

- SELECT how many rows from the member table.

```
SELECT COUNT(id) FROM member;
```

![image](url)

- SELECT the sum of follower_count of all the rows from the member table.

```
SELECT SUM(follower_count) AS `Sum of follower_count of all the rows` FROM member;
```

![image](url)

- SELECT the average of follower_count of all the rows from the member table.

```
SELECT AVG(follower_count) AS `Average of follower_count of all the rows` FROM member;
```

![image](url)

- SELECT the average of follower_count of the first 2 rows, in descending order of follower_count, from the member table.

```
SELECT AVG(follower_count) AS `Average of follower_count of the first 2 the rows` FROM ( SELECT * FROM member ORDER BY follower_count DESC LIMIT 2) t;
```

![image](url)
