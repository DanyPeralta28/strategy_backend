-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: scalling_strategy
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
-- Table structure for table `bosses`
--

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS `scalling_strategy` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

-- Usar la base de datos
USE `scalling_strategy`;

DROP TABLE IF EXISTS `bosses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bosses` (
  `id_boss` int DEFAULT NULL,
  `id_userBoss` int DEFAULT NULL,
  `id_userJunior` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `id_entity` int DEFAULT NULL,
  `boss_first_name` varchar(50) DEFAULT NULL,
  `boss_last_name` varchar(50) DEFAULT NULL,
  `jr_first_name` varchar(50) DEFAULT NULL,
  `jr_last_name` varchar(50) DEFAULT NULL,
  `creation_user` varchar(50) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `modification_user` varchar(50) DEFAULT NULL,
  `modification_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash_format_finances`
--

DROP TABLE IF EXISTS `cash_format_finances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_format_finances` (
  `finance_id` int NOT NULL AUTO_INCREMENT,
  `evaluations_list` json DEFAULT NULL,
  `attributes_list` json DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_company` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`finance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash_format_iel`
--

DROP TABLE IF EXISTS `cash_format_iel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_format_iel` (
  `period_id` int NOT NULL AUTO_INCREMENT,
  `periods_list` json DEFAULT NULL,
  `impact_items_list` json DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_company` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`period_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash_format_optcash`
--

DROP TABLE IF EXISTS `cash_format_optcash`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_format_optcash` (
  `idea_id` int NOT NULL AUTO_INCREMENT,
  `idea_a_list` json DEFAULT NULL,
  `idea_b_list` json DEFAULT NULL,
  `idea_c_list` json DEFAULT NULL,
  `idea_d_list` json DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_company` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idea_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cash_format_value`
--

DROP TABLE IF EXISTS `cash_format_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cash_format_value` (
  `value_id` int NOT NULL AUTO_INCREMENT,
  `area_list` json DEFAULT NULL,
  `priority_list` json DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_company` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`value_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `id_company` int DEFAULT NULL,
  `code_company` varchar(50) DEFAULT NULL,
  `name_company` varchar(50) DEFAULT NULL,
  `business_name` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `nit` int DEFAULT NULL,
  `phone_number` int DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `creation_user` varchar(50) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `modification_user` varchar(50) DEFAULT NULL,
  `modification_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `entities`
--

DROP TABLE IF EXISTS `entities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entities` (
  `id_entity` int DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `id_country` int DEFAULT NULL,
  `name_entity` varchar(50) DEFAULT NULL,
  `id_timeZone` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `creation_user` varchar(50) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `modification_user` varchar(50) DEFAULT NULL,
  `modification_date` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `execution_format_face`
--

DROP TABLE IF EXISTS `execution_format_face`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_format_face` (
  `face_id` int NOT NULL AUTO_INCREMENT,
  `function_name` varchar(100) DEFAULT NULL,
  `accountable_name` varchar(250) DEFAULT NULL,
  `kpi_list` json DEFAULT NULL,
  `results_list` json DEFAULT NULL,
  `id_company` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`face_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `execution_format_pace`
--

DROP TABLE IF EXISTS `execution_format_pace`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_format_pace` (
  `pace_id` int NOT NULL AUTO_INCREMENT,
  `process_name` varchar(100) DEFAULT NULL,
  `person_in_charge_name` varchar(250) DEFAULT NULL,
  `kpi_list` json DEFAULT NULL,
  `id_company` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pace_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `execution_format_www`
--

DROP TABLE IF EXISTS `execution_format_www`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_format_www` (
  `www_id` int NOT NULL AUTO_INCREMENT,
  `what` varchar(250) DEFAULT NULL,
  `who` varchar(250) DEFAULT NULL,
  `when` date DEFAULT NULL,
  `www_status` varchar(250) DEFAULT NULL,
  `new_when` date DEFAULT NULL,
  `id_company` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`www_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `execution_survey_answers`
--

DROP TABLE IF EXISTS `execution_survey_answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_survey_answers` (
  `survey_answer_id` int NOT NULL AUTO_INCREMENT,
  `id_campaign` int NOT NULL,
  `segment_1` json DEFAULT NULL,
  `segment_2` json DEFAULT NULL,
  `segment_3` json DEFAULT NULL,
  `segment_4` json DEFAULT NULL,
  `segment_5` json DEFAULT NULL,
  `segment_6` json DEFAULT NULL,
  `segment_7` json DEFAULT NULL,
  `segment_8` json DEFAULT NULL,
  `segment_9` json DEFAULT NULL,
  `segment_10` json DEFAULT NULL,
  `id_company` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_answer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `execution_survey_campaign`
--

DROP TABLE IF EXISTS `execution_survey_campaign`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execution_survey_campaign` (
  `survey_campaign_id` int NOT NULL AUTO_INCREMENT,
  `campaign_name` varchar(250) DEFAULT NULL COMMENT 'Campaign name for filter identifier',
  `id_company` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1' COMMENT '1 (active)\r\n2 (closed)\r\n0(deleted)',
  `created_by` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`survey_campaign_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follow_up_group_control`
--

DROP TABLE IF EXISTS `follow_up_group_control`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_up_group_control` (
  `id_group_control` int NOT NULL AUTO_INCREMENT,
  `game_green_group` varchar(255) DEFAULT NULL,
  `game_lemon_group` varchar(255) DEFAULT NULL,
  `game_yellow_group` varchar(255) DEFAULT NULL,
  `game_red_group` varchar(255) DEFAULT NULL,
  `game_result_group` varchar(255) DEFAULT NULL,
  `game_color_group` varchar(255) DEFAULT NULL,
  `weekly_day` varchar(20) DEFAULT NULL,
  `weekly_time` time DEFAULT NULL,
  `id_company` varchar(50) DEFAULT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_group_control`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follow_up_priority_weeks`
--

DROP TABLE IF EXISTS `follow_up_priority_weeks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_up_priority_weeks` (
  `id_priority_weeks` int NOT NULL AUTO_INCREMENT,
  `priority_list_quality` json DEFAULT NULL,
  `priority_list_quantity` json DEFAULT NULL,
  `game_green_kpi` varchar(255) DEFAULT NULL,
  `game_lemon_kpi` varchar(255) DEFAULT NULL,
  `game_yellow_kpi` varchar(255) DEFAULT NULL,
  `game_red_kpi` varchar(255) DEFAULT NULL,
  `game_result_kpi` varchar(255) DEFAULT NULL,
  `game_color_kpi` varchar(255) DEFAULT NULL,
  `game_green_priority` varchar(255) DEFAULT NULL,
  `game_lemon_priority` varchar(255) DEFAULT NULL,
  `game_yellow_priority` varchar(255) DEFAULT NULL,
  `game_red_priority` varchar(255) DEFAULT NULL,
  `game_result_priority` varchar(255) DEFAULT NULL,
  `game_color_priority` varchar(255) DEFAULT NULL,
  `kpi_list` json DEFAULT NULL,
  `quarter_priority_list` json DEFAULT NULL,
  `id_company` varchar(50) DEFAULT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_priority_weeks`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `follow_up_start_weeks`
--

DROP TABLE IF EXISTS `follow_up_start_weeks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow_up_start_weeks` (
  `id_start_week` int NOT NULL AUTO_INCREMENT,
  `date_start` date DEFAULT NULL,
  `id_view_list` int DEFAULT NULL COMMENT '1 quality 2 quantity',
  `id_company` varchar(50) DEFAULT NULL,
  `id_entity` varchar(50) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` json DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_start_week`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_7_stratas`
--

DROP TABLE IF EXISTS `opsp_format_7_stratas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_7_stratas` (
  `strata_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `own_words` varchar(1000) DEFAULT NULL,
  `products_and_services` varchar(1000) DEFAULT NULL,
  `geographic_area` varchar(500) DEFAULT NULL,
  `brand_promise_guarantee` varchar(1000) DEFAULT NULL,
  `strategy_one_liner` varchar(1000) DEFAULT NULL,
  `diff_acitivities` json DEFAULT NULL,
  `factor_x_advantage` varchar(1000) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`strata_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_bhag`
--

DROP TABLE IF EXISTS `opsp_format_bhag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_bhag` (
  `bhag_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bhag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_brand_promises`
--

DROP TABLE IF EXISTS `opsp_format_brand_promises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_brand_promises` (
  `brand_promise_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `primary_promise` varchar(1000) NOT NULL,
  `secondary_promise` varchar(1000) NOT NULL,
  `tertiary_promise` varchar(1000) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`brand_promise_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_central_clients`
--

DROP TABLE IF EXISTS `opsp_format_central_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_central_clients` (
  `central_client_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `age_gender_education` varchar(500) DEFAULT NULL,
  `appearance_description` varchar(500) DEFAULT NULL,
  `typical_day_description` varchar(1000) DEFAULT NULL,
  `fears_or_concerns` varchar(1000) DEFAULT NULL,
  `client_goals` varchar(1000) DEFAULT NULL,
  `client_challenges` varchar(1000) DEFAULT NULL,
  `life_priorities` varchar(1000) DEFAULT NULL,
  `motivations_or_rewards` varchar(1000) DEFAULT NULL,
  `feelings_of_attractiveness` varchar(500) DEFAULT NULL,
  `feelings_of_discomfort` varchar(1000) DEFAULT NULL,
  `success_metrics` varchar(1000) DEFAULT NULL,
  `key_needs_from_us` varchar(1000) DEFAULT NULL,
  `core_client_summary` varchar(1000) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`central_client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_consistent_actions`
--

DROP TABLE IF EXISTS `opsp_format_consistent_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_consistent_actions` (
  `action_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `action` json DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`action_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_core_values`
--

DROP TABLE IF EXISTS `opsp_format_core_values`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_core_values` (
  `core_value_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `value_title` varchar(150) DEFAULT NULL,
  `short_description` varchar(500) DEFAULT NULL,
  `long_description` varchar(2000) DEFAULT NULL,
  `status` int DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`core_value_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_cultures`
--

DROP TABLE IF EXISTS `opsp_format_cultures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_cultures` (
  `culture_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `culture_name` varchar(150) DEFAULT NULL,
  `culture_description` varchar(2000) DEFAULT NULL,
  `status` int DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`culture_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_factor_x`
--

DROP TABLE IF EXISTS `opsp_format_factor_x`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_factor_x` (
  `factor_x_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `process_flow_steps` json NOT NULL,
  `bottleneck_list` json DEFAULT NULL,
  `trade_action_list` json DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`factor_x_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_fdt`
--

DROP TABLE IF EXISTS `opsp_format_fdt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_fdt` (
  `fdt_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `global_trends_impact` json DEFAULT NULL,
  `core_strengths` json DEFAULT NULL,
  `core_weaknesses` json DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fdt_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_flywheels`
--

DROP TABLE IF EXISTS `opsp_format_flywheels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_flywheels` (
  `fly_wheel_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `code` int DEFAULT NULL,
  `order_item` int DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `kpi_description` varchar(250) DEFAULT NULL,
  `kpi_leader` varchar(150) DEFAULT NULL,
  `status` int DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`fly_wheel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_goals`
--

DROP TABLE IF EXISTS `opsp_format_goals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_goals` (
  `goals_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `three_to_five_years` json DEFAULT NULL,
  `one_year` json DEFAULT NULL,
  `trimester_one` json DEFAULT NULL,
  `trimester_two` json DEFAULT NULL,
  `trimester_three` json DEFAULT NULL,
  `trimester_four` json DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`goals_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_key_competencies`
--

DROP TABLE IF EXISTS `opsp_format_key_competencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_key_competencies` (
  `competencies_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `core_competency` varchar(250) DEFAULT NULL,
  `competency_description` varchar(1000) DEFAULT NULL,
  `competencies_list` json DEFAULT NULL,
  `status` int DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`competencies_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_kpi_balances`
--

DROP TABLE IF EXISTS `opsp_format_kpi_balances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_kpi_balances` (
  `balance_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `employee_balance` json NOT NULL,
  `customer_balance` json DEFAULT NULL,
  `shareholder_balance` json DEFAULT NULL,
  `training_balance` json DEFAULT NULL,
  `sales_marketing_balance` json DEFAULT NULL,
  `administration_balance` json DEFAULT NULL,
  `compliance_date` date DEFAULT NULL,
  `status` int DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`balance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_players_a`
--

DROP TABLE IF EXISTS `opsp_format_players_a`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_players_a` (
  `player_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `reward` varchar(10) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_profit_per_x`
--

DROP TABLE IF EXISTS `opsp_format_profit_per_x`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_profit_per_x` (
  `profit_per_x_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `profit_per_x_definition` varchar(100) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profit_per_x_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_purposes`
--

DROP TABLE IF EXISTS `opsp_format_purposes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_purposes` (
  `purposes_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `purpose_description` varchar(500) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`purposes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_territories`
--

DROP TABLE IF EXISTS `opsp_format_territories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_territories` (
  `territory_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `geographic_location` json DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`territory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_visions`
--

DROP TABLE IF EXISTS `opsp_format_visions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_visions` (
  `vision_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `core_values` varchar(250) NOT NULL,
  `brand_promises` varchar(250) NOT NULL,
  `strategic_priorities_1_year` json DEFAULT NULL,
  `strategic_priorities_3_to_5_years` json DEFAULT NULL,
  `strategic_priorities_trimester` json DEFAULT NULL,
  `user_name` varchar(100) NOT NULL,
  `kpi_list` json DEFAULT NULL,
  `priority_list` json DEFAULT NULL,
  `game_green_1` varchar(100) NOT NULL,
  `game_lemon_1` varchar(100) NOT NULL,
  `game_yellow_1` varchar(100) NOT NULL,
  `game_red_1` varchar(100) NOT NULL,
  `game_green_2` varchar(100) NOT NULL,
  `game_lemon_2` varchar(100) NOT NULL,
  `game_yellow_2` varchar(100) NOT NULL,
  `game_red_2` varchar(100) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`vision_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `opsp_format_win_game_dashboard`
--

DROP TABLE IF EXISTS `opsp_format_win_game_dashboard`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opsp_format_win_game_dashboard` (
  `game_id` int NOT NULL AUTO_INCREMENT,
  `id_company` varchar(50) NOT NULL,
  `deadline` date DEFAULT NULL,
  `team` varchar(255) DEFAULT NULL,
  `game_rules` varchar(255) DEFAULT NULL,
  `scoreboard` varchar(255) DEFAULT NULL,
  `celebration_plan` varchar(255) DEFAULT NULL,
  `reward` varchar(255) DEFAULT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_by` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id_user` int DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `fullname_search` varchar(50) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `level_user` int DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `id_timeZone` varchar(50) DEFAULT NULL,
  `id_company` int DEFAULT NULL,
  `id_entity` int DEFAULT NULL,
  `id_country` int DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `income_year` int DEFAULT NULL,
  `birth_year` int DEFAULT NULL,
  `team` varchar(50) DEFAULT NULL,
  `id_position` int DEFAULT NULL,
  `workplace` varchar(50) DEFAULT NULL,
  `has_noBoss` int DEFAULT NULL,
  `execution_status` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `creation_user` varchar(50) DEFAULT NULL,
  `creation_date` varchar(50) DEFAULT NULL,
  `modification_user` varchar(50) DEFAULT NULL,
  `modification_date` varchar(50) DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Crear el usuario root (si no existe) sin contraseña
CREATE USER IF NOT EXISTS 'root'@'localhost';

-- Darle permisos completos para trabajar con la base de datos 'scalling_strategy'
GRANT ALL PRIVILEGES ON `scalling_strategy`.* TO 'root'@'localhost';

-- Asegurarse de que los cambios de permisos se apliquen
FLUSH PRIVILEGES;


--
-- Dumping routines for database 'scalling_strategy'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-16 18:21:56
