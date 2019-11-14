-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: tcc_matheus
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ingrediente`
--

DROP TABLE IF EXISTS `ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ingrediente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(150) NOT NULL,
  `cal_p_und` float NOT NULL,
  `tipo_und` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingrediente`
--

LOCK TABLES `ingrediente` WRITE;
/*!40000 ALTER TABLE `ingrediente` DISABLE KEYS */;
INSERT INTO `ingrediente` VALUES (1,'Coxa de Frango',144,'100g'),(2,'Salsicha',120,'30g'),(3,'Extrato de Tomate',14,'20g'),(5,'Óleo',90,'10g'),(6,'Arroz',41,'25g'),(8,'Alho',7,'1 Dente'),(9,'Pimenta do Reino',1,'6g'),(10,'Cebola',32,'70g'),(23,'ovo',78,'ovo');
/*!40000 ALTER TABLE `ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `integrante`
--

DROP TABLE IF EXISTS `integrante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `integrante` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iduser` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `data_nasc` date NOT NULL,
  `peso` int(11) NOT NULL,
  `altura` int(11) NOT NULL,
  `imc` float NOT NULL,
  `classificacao` varchar(100) NOT NULL,
  `objetivo` varchar(100) NOT NULL,
  `sexo` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `iduser_idx` (`iduser`),
  CONSTRAINT `iduser` FOREIGN KEY (`iduser`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `integrante`
--

LOCK TABLES `integrante` WRITE;
/*!40000 ALTER TABLE `integrante` DISABLE KEYS */;
INSERT INTO `integrante` VALUES (4,10,'Matheus Julio Ribeiro','2002-10-14',82,177,26.1738,'Acima do peso','Perder peso','Masculino'),(5,10,'Renato Valim','2002-05-03',55,165,20.202,'Peso normal','Manter peso','Masculino'),(6,10,'Marcos Ota','2001-09-22',87,183,25.9787,'Acima do peso','Perder peso','Masculino'),(8,10,'Gilberto Junior Ferreira','2001-12-03',78,175,25.4694,'Acima do peso','Perder peso','Masculino'),(9,10,'Katia Fernanda','2002-01-29',53,153,22.6409,'Peso normal','Manter peso','Feminino'),(10,10,'Gustavo Melo','1995-07-18',95,184,28.06,'Acima do peso','Perder peso','Masculino'),(11,10,'Ricardo Massaru','2000-10-08',80,165,29.3848,'Acima do peso','Perder peso','Masculino'),(12,10,'Davi Corazza','2001-07-23',57,174,18.8268,'Peso normal','Manter peso','Masculino'),(13,12,'Davi Corazza','2001-07-23',57,174,18.8268,'Peso normal','Manter peso','Masculino');
/*!40000 ALTER TABLE `integrante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receita`
--

DROP TABLE IF EXISTS `receita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receita` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(100) NOT NULL,
  `modo_preparo` varchar(1000) NOT NULL,
  `calorias` int(11) DEFAULT NULL,
  `porcoes` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receita`
--

LOCK TABLES `receita` WRITE;
/*!40000 ALTER TABLE `receita` DISABLE KEYS */;
INSERT INTO `receita` VALUES (1,'Risoto Simples de Frango','Em uma panela, em fogo médio, frite o alho e a cebola no óleo.\r Acrescente o arroz, tempere com sal e pimenta e continue fritando.\r Coloque o frango, a água e o extrato de tomate.\r Abaixe o fogo e deixe cozinhar até secar a água, com a panela semi tampada.\r Desligue o fogo, misture as salsichas, deixe descansar por 15 minutos e sirva.\r ',1500,5);
/*!40000 ALTER TABLE `receita` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receita_aux`
--

DROP TABLE IF EXISTS `receita_aux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `receita_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_receita` int(11) NOT NULL,
  `id_ingrediente` int(11) NOT NULL,
  `qtde` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `receita_aux_idx` (`id_receita`),
  KEY `ingrediente_aux_idx` (`id_ingrediente`),
  CONSTRAINT `ingrediente_aux` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingrediente` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `receita_aux` FOREIGN KEY (`id_receita`) REFERENCES `receita` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receita_aux`
--

LOCK TABLES `receita_aux` WRITE;
/*!40000 ALTER TABLE `receita_aux` DISABLE KEYS */;
INSERT INTO `receita_aux` VALUES (1,1,8,3),(2,1,10,1),(3,1,5,1),(4,1,6,1),(5,1,1,3),(6,1,2,200),(7,1,3,2);
/*!40000 ALTER TABLE `receita_aux` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(250) NOT NULL,
  `usuario` varchar(50) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `senha` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (10,'Matheus Julio Ribeiro','math','ummathairibeiro@gmail.com','8a691a17ecc3fd28664e30ec65aef13790b8a95e0a18f829624466f7aa9646d27beae6e86ff9c98716a7aaf1699db55f2ac015259908bcdb826b07c7a3aada4c'),(11,'Matheus Julio Ribeiro','math','111111111','b0412597dcea813655574dc54a5b74967cf85317f0332a2591be7953a016f8de56200eb37d5ba593b1e4aa27cea5ca27100f94dccd5b04bae5cadd4454dba67d'),(12,'Davi Corazza','VelozzXD','davicorazza@gmail.com','386aed82bcae79f11b37e790e0d65fa677f94058f2befbdede91317575370211961964873838300f2499c92a7cb86a9b180b58b44b63a00f99a8b0e9243abb0c');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-14 12:50:13
