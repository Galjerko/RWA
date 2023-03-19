

CREATE TABLE IF NOT EXISTS `korisnik_uloga` (
  `id` INTEGER  PRIMARY KEY NOT NULL,
  `naziv` VARCHAR(45) NOT NULL,
  `opis` TEXT NULL DEFAULT NULL,
  UNIQUE ('id'));


CREATE TABLE IF NOT EXISTS `korisnik` (
  `id` INTEGER  PRIMARY KEY  AUTOINCREMENT NOT NULL,
  `korisnicko_ime` VARCHAR(45) NOT NULL,
  `lozinka` TEXT NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `ime` VARCHAR(45) NULL DEFAULT NULL,
  `prezime` VARCHAR(45) NULL DEFAULT NULL,
  `korisnik_uloga_id` INTEGER NOT NULL,
  `aktiviran` TINYINT NULL DEFAULT NULL,
   UNIQUE(`id`),
   FOREIGN KEY(korisnik_uloga_id) REFERENCES korisnik_uloga(id));



CREATE TABLE IF NOT EXISTS `film` (
  `id` INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
  `time_of_input` DATETIME NULL DEFAULT NULL,
  `approval_status` TINYINT NULL DEFAULT NULL,
  `adult` TINYINT NULL DEFAULT NULL,
  `backdrop_path` VARCHAR(100) NULL DEFAULT NULL,
  `budget` INTEGER NULL DEFAULT NULL,
  `homepage` VARCHAR(100) NULL DEFAULT NULL,
  `imdb_id` VARCHAR(9) NULL DEFAULT NULL,
  `original_language` VARCHAR(100) NULL DEFAULT NULL,
  `original_title` VARCHAR(100) NULL DEFAULT NULL,
  `overview` VARCHAR(1000) NULL DEFAULT NULL,
  `popularity` FLOAT NULL DEFAULT NULL,
  `poster_path` VARCHAR(100) NULL DEFAULT NULL,
  `release_date` DATE NULL DEFAULT NULL,
  `revenue` INTEGER NULL DEFAULT NULL,
  `runtime` INTEGER NULL DEFAULT NULL,
  `status` VARCHAR(100) NULL DEFAULT NULL,
  `tagline` VARCHAR(100) NULL DEFAULT NULL,
  `title` VARCHAR(100) NULL DEFAULT NULL,
  `vote_average` FLOAT NULL DEFAULT NULL,
  `vote_count` INTEGER NULL DEFAULT NULL,
  `korisnik_id` INTEGER NOT NULL,
  UNIQUE('id'),
  FOREIGN KEY (korisnik_id) REFERENCES korisnik(id));




CREATE TABLE IF NOT EXISTS `zanr` (
  `id` INTEGER  PRIMARY KEY AUTOINCREMENT NOT NULL,
  `naziv` VARCHAR(100) NULL DEFAULT NULL,
  UNIQUE ('id'));


CREATE TABLE IF NOT EXISTS `zanr_film` (
  `film_id` INTEGER NOT NULL,
  `zanr_id` INTEGER NOT NULL,
  PRIMARY KEY (`film_id`, `zanr_id`),
  FOREIGN KEY (film_id) REFERENCES film (id) ON UPDATE RESTRICT ON DELETE CASCADE,
  FOREIGN KEY (zanr_id) REFERENCES zanr (id) ON UPDATE RESTRICT ON DELETE CASCADE);
 


INSERT INTO `korisnik` (`korisnicko_ime`, `lozinka`, `email`, `ime`, `prezime`, `korisnik_uloga_id`,  `aktiviran`) VALUES
('obican', 'rwa', 'nav36131@cdfaq.com', 'obican', 'obican', 1, 1),
('administrator', 'rwa', 'gaq65249@xcoxc.com', 'administrator', 'administrator', 2, 1);

INSERT INTO `korisnik_uloga` (`id`, `naziv`, `opis`) VALUES
(1, 'registrirani korisnik', NULL),
(2, 'administrator', NULL);

INSERT INTO film ( title, korisnik_id) VALUES ('GODFATHER', 23);

INSERT INTO zanr (naziv) VALUES ('drama');
  
INSERT INTO zanr_film ('film_id', 'zanr_id') VALUES (5,4);



SELECT * FROM korisnik_uloga;
SELECT * FROM korisnik;


SELECT * FROM film;
SELECT * from zanr;
SELECT * FROM zanr_film;
