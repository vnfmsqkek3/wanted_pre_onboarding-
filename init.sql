# 데이터베이스 조회
SHOW DATABASES;

# 데이터베이스 생성
CREATE DATABASE "데이터베이스명";

# 데이터베이스 삭제
DROP DATABASE "삭제 할 데이터베이스 명"

# 데이터베이스 선택
USE "데이터베이스명";

# 테이블 보이기
SHOW TABLES;

# 특정 테이블 삭제
DROP TABLE "삭제할 테이블명";

CREATE TABLE IF NOT EXISTS `company` (
    `회사_id` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `채용포지션` varchar(200)  NOT NULL ,
    `채용보상금` varchar(200)  NOT NULL ,
    `채용내용` varchar(200)  NOT NULL ,
    `사용기술` varchar(200)  NOT NULL,
    CONSTRAINT UC_company UNIQUE (회사_id)
);
