CREATE DATABASE `node-test`;

CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `path` varchar(100) NOT NULL,
  `folder_id` int NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `folder` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `sub_folder` (
  `parent_id` int NOT NULL,
  `chiled_id` int NOT NULL
)

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) 

CREATE TABLE `user_folders` (
  `user_id` int NOT NULL,
  `folder_id` int NOT NULL
)