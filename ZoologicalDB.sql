-- MySQL dump 10.13  Distrib 9.0.1, for Win64 (x86_64)
--
-- Host: localhost    Database: ZoologicalDB
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `Administration`
--
CREATE DATABASE IF NOT EXISTS ZoologicalDB;
USE ZoologicalDB;
DROP TABLE IF EXISTS `Administration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Administration` (
  `AdminID` int NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`AdminID`),
  CONSTRAINT `administration_ibfk_1` FOREIGN KEY (`AdminID`) REFERENCES `Staff` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Administration`
--

LOCK TABLES `Administration` WRITE;
/*!40000 ALTER TABLE `Administration` DISABLE KEYS */;
INSERT INTO `Administration` VALUES (1001,'Sarah Zookeeper');
/*!40000 ALTER TABLE `Administration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Animal`
--

DROP TABLE IF EXISTS `Animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Animal` (
  `AnimalID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) DEFAULT NULL,
  `Weight` decimal(5,2) DEFAULT NULL,
  `Behavior` text,
  `Species` varchar(100) DEFAULT NULL,
  `Age` int NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `TransferHistory` text,
  `Birthday` date DEFAULT NULL,
  `Breed` varchar(100) DEFAULT NULL,
  `ConservationStatus` varchar(100) DEFAULT NULL,
  `Housing` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`AnimalID`),
  KEY `Housing` (`Housing`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`Housing`) REFERENCES `Facilities` (`Type`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Animal`
--

LOCK TABLES `Animal` WRITE;
/*!40000 ALTER TABLE `Animal` DISABLE KEYS */;
INSERT INTO `Animal` VALUES (1,'Leo',190.50,'Calm and dominant','Lion',7,'Male','Transferred from Chicago Zoo','2017-05-14','African Lion','Vulnerable','EXH001'),(2,'Kaa',12.20,'Solitary','Python',5,'Female','Born in captivity','2019-03-22','Burmese Python','Least Concern','RPT001'),(3,'Milo',0.70,'Energetic','Monkey',3,'Male','New arrival','2021-08-10','Capuchin','Least Concern','RST001'),(4,'Ryan',227.36,'Make behind management fill wind because.','Lion',2,'Female','Particularly gun grow agency list others treatment.','2010-08-19','African Lion','Endangered','GFT001'),(5,'Jeremy',367.15,'Stand black everybody themselves teacher or.','Python',8,'Female','Sense rest care cultural.','2009-10-31','Burmese Python','Least Concern','EXH001'),(6,'Angela',358.86,'Sense result star per act sign author road.','Lion',16,'Male','Finally shake value.','2007-02-09','African Lion','Endangered','RST001'),(7,'Patricia',470.60,'Child imagine focus.','Kangaroo',8,'Male','Drop herself fill federal certainly finally.','2005-09-20','Red Kangaroo','Endangered','VET001'),(8,'Julie',284.21,'Certain training about.','Lion',4,'Female','Bank relate west recent including.','2023-02-25','African Lion','Vulnerable','RST001'),(9,'Sara',455.89,'Customer senior we near.','Python',20,'Male','Main degree you list.','2012-08-11','Burmese Python','Endangered','VET001'),(10,'Shawn',370.11,'Dark able attorney occur black.','Zebra',5,'Male','Short radio here bring reality fall player.','2012-03-14','Grant Zebra','Least Concern','VET001'),(11,'David',372.53,'Learn tax attack indicate think concern act.','Python',12,'Male','Ball very almost father life service actually.','2012-03-21','Burmese Python','Endangered','VET001'),(12,'Stephen',371.25,'Make little get so inside law.','Zebra',1,'Female','Dark now reason whether free rich.','2023-11-19','Grant Zebra','Vulnerable','EXH001'),(13,'Anthony',46.92,'First major matter gas them above.','Penguin',14,'Female','Attorney light eye doctor production none adult.','2014-10-23','Emperor Penguin','Vulnerable','EXH001'),(14,'Diane',56.13,'Past appear bank plan could.','Python',20,'Male','Order plan since mouth customer country theory according.','2006-05-30','Burmese Python','Vulnerable','RST001'),(15,'Ronald',185.55,'Visit our risk statement care past north player.','Zebra',2,'Female','Along allow several prevent floor television whether.','2021-11-25','Grant Zebra','Endangered','VET001'),(16,'Michael',437.45,'Ground skin school worker.','Penguin',18,'Female','Ten wonder various mother return.','2023-09-19','Emperor Penguin','Vulnerable','VET001'),(17,'Christopher',75.25,'Could possible thus.','Kangaroo',11,'Male','Born police knowledge that position according.','2019-03-20','Red Kangaroo','Endangered','RST001'),(18,'Kathleen',60.75,'Dream quality ability lose.','Kangaroo',8,'Female','Far establish interesting car will fish body.','2009-07-13','Red Kangaroo','Endangered','VET001'),(19,'Curtis',366.94,'Along hour speak party.','Kangaroo',3,'Male','Democrat your difference man.','2014-01-17','Red Kangaroo','Least Concern','EXH001'),(20,'Ashley',88.12,'Learn view benefit wear.','Giraffe',14,'Female','Cut concern police toward air off listen.','2015-07-03','Masai Giraffe','Vulnerable','EXH001'),(21,'Chad',309.50,'Themselves table last I.','Giraffe',20,'Female','Boy sometimes fill my subject mission.','2020-06-26','Masai Giraffe','Vulnerable','VET001'),(22,'Charlene',392.18,'Sing action goal part method account tough.','Elephant',7,'Female','Religious according room way subject indicate worry.','2010-03-07','Asian Elephant','Vulnerable','VET001'),(23,'Nicole',91.84,'Anything I away side authority success among.','Penguin',19,'Male','Figure remain prove raise need store.','2006-08-15','Emperor Penguin','Endangered','RST001');
/*!40000 ALTER TABLE `Animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `DepartmentHead`
--

DROP TABLE IF EXISTS `DepartmentHead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DepartmentHead` (
  `EmployeeID` int NOT NULL,
  `DepartmentID` varchar(50) DEFAULT NULL,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `DepartmentID` (`DepartmentID`),
  CONSTRAINT `departmenthead_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `Staff` (`EmployeeID`),
  CONSTRAINT `departmenthead_ibfk_2` FOREIGN KEY (`DepartmentID`) REFERENCES `Facilities` (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DepartmentHead`
--

LOCK TABLES `DepartmentHead` WRITE;
/*!40000 ALTER TABLE `DepartmentHead` DISABLE KEYS */;
INSERT INTO `DepartmentHead` VALUES (1003,'RST001','Emma Biologist');
/*!40000 ALTER TABLE `DepartmentHead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Facilities`
--

DROP TABLE IF EXISTS `Facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Facilities` (
  `Type` varchar(50) NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Location` varchar(100) DEFAULT NULL,
  `Description` text,
  PRIMARY KEY (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Facilities`
--

LOCK TABLES `Facilities` WRITE;
/*!40000 ALTER TABLE `Facilities` DISABLE KEYS */;
INSERT INTO `Facilities` VALUES ('EXH001','Savannah Exhibit','Zone A','Open grassland exhibit for lions and zebras'),('GFT001','Gift Shop','Main Gate','Retail area for visitors'),('RPT001','Reptile House','Zone C','Enclosed habitat for snakes and lizards'),('RST001','Rainforest Exhibit','Zone D','Tropical forest for exotic species'),('VET001','Veterinary Clinic','Zone B','Animal health and care facility');
/*!40000 ALTER TABLE `Facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FinancialHead`
--

DROP TABLE IF EXISTS `FinancialHead`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FinancialHead` (
  `EmployeeID` int NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  CONSTRAINT `financialhead_ibfk_1` FOREIGN KEY (`EmployeeID`) REFERENCES `Staff` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FinancialHead`
--

LOCK TABLES `FinancialHead` WRITE;
/*!40000 ALTER TABLE `FinancialHead` DISABLE KEYS */;
INSERT INTO `FinancialHead` VALUES (1004,'Luke Cashier');
/*!40000 ALTER TABLE `FinancialHead` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FinancialTransactions`
--

DROP TABLE IF EXISTS `FinancialTransactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FinancialTransactions` (
  `ItemID` int NOT NULL,
  `Amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  CONSTRAINT `financialtransactions_ibfk_1` FOREIGN KEY (`ItemID`) REFERENCES `FinancialHead` (`EmployeeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FinancialTransactions`
--

LOCK TABLES `FinancialTransactions` WRITE;
/*!40000 ALTER TABLE `FinancialTransactions` DISABLE KEYS */;
INSERT INTO `FinancialTransactions` VALUES (1004,350.00);
/*!40000 ALTER TABLE `FinancialTransactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `Staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staff` (
  `EmployeeID` int NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `Salary` decimal(10,2) DEFAULT NULL,
  `WeeklySchedule` text,
  `DepartmentID` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`EmployeeID`),
  KEY `DepartmentID` (`DepartmentID`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`DepartmentID`) REFERENCES `Facilities` (`Type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Staff`
--

LOCK TABLES `Staff` WRITE;
/*!40000 ALTER TABLE `Staff` DISABLE KEYS */;
INSERT INTO `Staff` VALUES (1001,'Sarah Zookeeper',42000.00,'Mon-Fri 8am-4pm','EXH001'),(1002,'John Vet',65000.00,'Mon-Fri 9am-5pm','VET001'),(1003,'Emma Biologist',55000.00,'Tues-Sat 7am-3pm','RST001'),(1004,'Luke Cashier',32000.00,'Sat-Sun 10am-6pm','GFT001'),(1005,'Anna Maintenance',38000.00,'Mon-Sat 6am-2pm','EXH001'),(1100,'Gregory Pollard',64577.57,'Thu-Sat 8am-4pm','VET001'),(1101,'Mark Lopez',50747.20,'Wed-Fri 8am-4pm','GFT001'),(1102,'Jennifer Banks',78984.39,'Fri-Fri 8am-4pm','RST001'),(1103,'John Ramos',66615.62,'Mon-Sat 8am-4pm','RST001'),(1104,'Christine Scott',35048.33,'Fri-Fri 8am-4pm','VET001'),(1105,'Courtney Pittman',38427.70,'Tue-Fri 8am-4pm','RST001'),(1106,'Steven Escobar',37915.57,'Fri-Fri 8am-4pm','EXH001'),(1107,'Mark Rodriguez',32677.12,'Tue-Sat 8am-4pm','RST001'),(1108,'Kristen Powers',55307.88,'Tue-Sat 8am-4pm','GFT001'),(1109,'Maria Jordan',71419.31,'Tue-Sat 8am-4pm','EXH001'),(1110,'Joshua Atkins',63358.95,'Wed-Fri 8am-4pm','RST001'),(1111,'Jennifer Haynes',40870.74,'Wed-Fri 8am-4pm','RST001'),(1112,'Danny Carson',64460.78,'Thu-Sat 8am-4pm','EXH001'),(1113,'Alicia Rogers',38561.75,'Mon-Sat 8am-4pm','EXH001'),(1114,'Timothy Stephens',31433.30,'Wed-Fri 8am-4pm','VET001'),(1115,'Jacob Pierce',39450.00,'Fri-Sat 8am-4pm','VET001'),(1116,'Juan Phillips',45295.35,'Mon-Fri 8am-4pm','VET001'),(1117,'Ian Hayden',52819.81,'Wed-Fri 8am-4pm','EXH001'),(1118,'Anne Byrd',52832.05,'Fri-Fri 8am-4pm','EXH001'),(1119,'Kenneth Simon',33801.43,'Thu-Fri 8am-4pm','GFT001');
/*!40000 ALTER TABLE `Staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Visitors`
--

DROP TABLE IF EXISTS `Visitors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Visitors` (
  `VisitorID` int NOT NULL,
  `Name` varchar(100) DEFAULT NULL,
  `GroupID` int DEFAULT NULL,
  `DateOfVisit` date DEFAULT NULL,
  `AmountSpent` decimal(10,2) DEFAULT NULL,
  `History` text,
  `MembershipType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`VisitorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Visitors`
--

LOCK TABLES `Visitors` WRITE;
/*!40000 ALTER TABLE `Visitors` DISABLE KEYS */;
INSERT INTO `Visitors` VALUES (1,'Alice Guest',101,'2025-03-15',45.00,'First visit','General'),(2,'Bob Member',102,'2025-03-16',120.00,'Frequent visitor','Premium'),(3,'Cathy Teacher',103,'2025-03-17',300.00,'School field trip','Group'),(4,'Erika George',999,'2024-08-11',29.25,'Most economic thing.','Group'),(5,'Reginald Wong',964,'2024-12-13',28.43,'Still including whether.','General'),(6,'Joseph Morton',442,'2024-09-20',39.34,'National letter magazine size.','Group'),(7,'Chad Hammond',472,'2024-04-11',66.29,'Force author strong week charge.','Premium'),(8,'Dawn Hayes',833,'2024-05-12',179.59,'Owner down ten shake senior fine remember.','General'),(9,'Emily Jones',113,'2024-05-15',39.17,'Wonder tell strategy instead.','Premium'),(10,'Jason Pena',195,'2024-09-29',126.38,'Case situation community store plan area amount.','Premium'),(11,'Aaron Dean',555,'2025-03-21',140.55,'Alone adult land.','Premium'),(12,'Nicholas Pierce DVM',541,'2024-10-10',136.60,'Already fish try tonight assume media detail.','General'),(13,'Tiffany Brown',837,'2025-02-21',84.64,'Congress every bad beautiful.','Premium'),(14,'Brian Thomas',585,'2024-03-27',139.16,'Management service general understand there task tend hear.','Premium'),(15,'Sharon Wilson',491,'2024-12-06',30.16,'Worry establish artist cold other fine.','Group'),(16,'Alice Peterson',706,'2024-11-11',127.06,'Difference data least book own civil cold threat.','General'),(17,'Paul Cooper',188,'2024-10-13',30.18,'Stop reach remain consumer movement manage state win.','Premium'),(18,'Joel Jenkins',776,'2024-12-18',40.61,'Plan nature conference idea bill Mr.','General'),(19,'Lisa Smith',691,'2024-07-21',81.60,'Wait culture late moment state plant.','Premium'),(20,'Judith Matthews',124,'2024-12-21',106.01,'Read race tough onto.','General'),(21,'Jennifer Sherman',438,'2024-11-24',64.89,'Human structure send world strategy usually expert.','Group'),(22,'Lisa White',412,'2025-02-05',71.78,'Industry fire fine operation catch family professor.','Premium'),(23,'Kristen Byrd',118,'2024-10-21',101.97,'Few statement among treatment activity place.','Premium');
/*!40000 ALTER TABLE `Visitors` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-27 18:46:20
