CREATE DATABASE IF NOT EXISTS merquerysample;

USE merquerysample;

CREATE TABLE IF NOT EXISTS `user` (
    id VARCHAR(256),
    username VARCHAR(256),
    last_login BIGINT,
    status TEXT,

    PRIMARY KEY (id)
);