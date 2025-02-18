-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `follower_count` int NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'test2','test','test',0,'2025-02-10 15:09:53'),(2,'user001','user001','qaz12345',123,'2025-02-10 15:21:59'),(3,'user002','user002','qaz12345',456,'2025-02-10 15:22:47'),(4,'user003','user003','qaz12345',789,'2025-02-10 15:22:53'),(5,'user004','user004','qaz12345',1234,'2025-02-10 15:22:56'),(6,'丁丁','tinky','scrypt:32768:8:1$CssTvCy6gwEviJfP$eb7e977ab716f1b09393ef355095bf59856d61a80f85db8e768ba8f27e1b2354af96c3aab6591d1c63cd659c6d9528cb6e0209c323a0488b5ba78fb5c7ca3357',0,'2025-02-17 14:51:59'),(7,'迪西','dipsy','scrypt:32768:8:1$xqYChG5i1qGab0sy$58ee81033074b4cf60eb4c9d930dd52d17a12c493c16a9ca6ca2810499c65e3cb58686912548ba749a759467b98749348d7006c2271e1d3af661dbb110960023',0,'2025-02-17 15:26:08'),(8,'拉拉','laalaa','scrypt:32768:8:1$8zk5NvhfnhRS4kCT$832198aa519d4601fe18d84a94c3f66fd00998f41b4870d5f2d40578a7a70d32c9b883c852bd904607e95c5cd68907cad9eb76b915c3a4b937cb74017ee44395',0,'2025-02-18 15:25:50'),(9,'小波','po','scrypt:32768:8:1$Imk9d0tBNHlQ32PG$a58cef7a70e0039708c671c1b4793e04a879a968ab8f9284d6940d2ce8455541504a4a30d50e3dcfdfc141332377ec4b89444570c25a353f22ed82dcf7590a9a',0,'2025-02-18 15:26:14'),(10,'旁白','voice','scrypt:32768:8:1$7WRRZVNnFW5GsKOK$09ba45597f58c90f2c470fd7af4c1884fdb37eef113edc169c447cb7f4b0585c432d25ab630aca252a1ca473bdbf75505723bc565d953e8db963257026dc5be3',0,'2025-02-18 15:27:05'),(11,'太陽','sunbaby','scrypt:32768:8:1$MKcyeSaIvwySsUxI$ce47940cd599ff0c7b887f5d46f79f04020567ef200f56c26ad45db791d23275baeb2199ca7341560587df7d44cd9ca92518f434350caddaecf562b9036e8a74',0,'2025-02-18 16:33:59'),(12,'努努','noonoo','scrypt:32768:8:1$WeSH3PbZlEHZrS91$cf67d6c0ceaab9e12178d6c201fc1ae560192ed33c77f74b10ec8add6b016437eb937418b29a3f6638b3b48c12d4535baa740c9842532689f3be403dcc463ed5',0,'2025-02-18 16:45:37'),(13,'喇叭','phone','scrypt:32768:8:1$aZC19J5qqWmUuSDY$e8eb8201994f08d59fe2e54d7bb4bb1f0a7589e400396e3f059ad112fdab1525800d94388ad92b0e7d10b67d17e3d51361caf2bdef620e5031b630c18fef1cc4',0,'2025-02-18 16:46:39');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `member_id` bigint NOT NULL,
  `content` varchar(255) NOT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  `time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `message_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (26,10,'藍天藍，白雲白，天線寶寶出來玩囉！',0,'2025-02-18 15:27:53'),(27,6,'丁丁~',0,'2025-02-18 15:28:26'),(28,7,'迪西！',0,'2025-02-18 15:28:40'),(29,8,'拉~拉~',0,'2025-02-18 15:28:51'),(30,9,'小...波...',0,'2025-02-18 15:29:02'),(31,10,'天線寶寶，天線寶寶~',0,'2025-02-18 15:29:34'),(32,6,'說你好',0,'2025-02-18 15:29:52'),(33,7,'你好',0,'2025-02-18 15:30:05'),(34,8,'天線寶寶~',0,'2025-02-18 15:31:23'),(35,9,'天...線...寶寶~',0,'2025-02-18 15:31:48'),(40,11,'（微笑）',0,'2025-02-18 16:34:56');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-18 17:00:51
