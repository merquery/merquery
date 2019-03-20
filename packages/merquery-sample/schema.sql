CREATE DATABASE IF NOT EXISTS merquerysample;

USE merquerysample;

CREATE TABLE IF NOT EXISTS `user` (
    id VARCHAR(256),
    username VARCHAR(256) NOT NULL,
    last_login BIGINT,
    account_status ENUM("FREE", "PREMIUM", "PREMIUMPLUS") NOT NULL,
    timestamp DATETIME,
    status TEXT,

    PRIMARY KEY (id)
);