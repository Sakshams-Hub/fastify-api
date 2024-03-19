# fastify-api
Simple Bike and Car rental API with MySQL database using Fastify
The above code demonstrates simple and basic bike and car rental api using fastify.
Database structure:
-- Table structure for table `cars`
CREATE TABLE IF NOT EXISTS `cars` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `brand` VARCHAR(255),
  `model` VARCHAR(255),
  `color` VARCHAR(255),
  `year` INT,
  `available` BOOLEAN
);

-- Table structure for table `bikes`
CREATE TABLE IF NOT EXISTS `bikes` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `brand` VARCHAR(255),
  `model` VARCHAR(255),
  `color` VARCHAR(255),
  `year` INT,
  `available` BOOLEAN
);

![image](https://github.com/Sakshams-Hub/fastify-api/assets/75479550/7e32c806-261d-4f9e-88f0-18cfe2053554)
