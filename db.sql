CREATE DATABASE IF NOT EXISTS lessondb;
USE lessondb;

CREATE TABLE IF NOT EXISTS user (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    permissions VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS ancient_words (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stamp_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NOT NULL,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(15) NOT NULL,

    ermhneia TEXT NOT NULL,
    etumologia TEXT NOT NULL,

    vommoriza TEXT,
    vsunonima TEXT,
    vantonima TEXT,
    vfoni TEXT,

    venor TEXT,
    venup TEXT,
    veneu TEXT,
    venpr TEXT,
    venap TEXT,
    venme TEXT,

    vparatatikosor TEXT,
    vparatatikosup TEXT,
    vparatatikoseu TEXT,
    vparatatikospr TEXT,
    vparatatikosap TEXT,
    vparatatikosme TEXT,

    vmeor TEXT,
    vmeup TEXT,
    vmeeu TEXT,
    vmepr TEXT,
    vmeap TEXT,
    vmeme TEXT,

    vpmeaor TEXT,
    vpmeaeu TEXT,
    vpmeaap TEXT,
    vpmeame TEXT,

    vpmebor TEXT,
    vpmebeu TEXT,
    vpmebap TEXT,
    vpmebme TEXT,

    vaoror TEXT,
    vaorup TEXT,
    vaoreu TEXT,
    vaorpr TEXT,
    vaorap TEXT,
    vaorme TEXT,

    vaorbor TEXT,
    vaorbup TEXT,
    vaorbeu TEXT,
    vaorbpr TEXT,
    vaorbap TEXT,
    vaorbme TEXT,

    vpaoraor TEXT,
    vpaoraup TEXT,
    vpaoraeu TEXT,
    vpaorapr TEXT,
    vpaoraap TEXT,
    vpaorame TEXT,

    vpaorbor TEXT,
    vpaorbup TEXT,
    vpaorbeu TEXT,
    vpaorbpr TEXT,
    vpaorbap TEXT,
    vpaorbme TEXT,

    vparakor TEXT,
    vparakup TEXT,
    vparakeu TEXT,
    vparakpr TEXT,
    vparakap TEXT,
    vparakme TEXT,

    vparakbor TEXT,
    vparakbup TEXT,
    vparakbeu TEXT,
    vparakbpr TEXT,
    vparakbap TEXT,
    vparakbme TEXT,

    vupor TEXT,
    vupup TEXT,
    vupeu TEXT,
    vuppr TEXT,
    vupap TEXT,
    vupme TEXT,

    vsmeor TEXT,
    vsmeup TEXT,
    vsmeeu TEXT,
    vsmepr TEXT,
    vsmeap TEXT,
    vsmeme TEXT,

    ogenos TEXT,
    oenikos TEXT,
    opluthintikos TEXT,

    eklisi TEXT,
    eenikosar TEXT,
    eenikosth TEXT,
    eenikosou TEXT,
    eplithintikosar TEXT,
    eplithintikosth TEXT,
    eplithintikosou TEXT,
    ethetikos TEXT,
    esugkritikos TEXT,
    euperthetikos TEXT,

    aeidos TEXT,
    aenikosar TEXT,
    aenikosth TEXT,
    aenikosou TEXT,
    aplithintikosar TEXT,
    aplithintikosth TEXT,
    aplithintikosou TEXT,
    -- ADDED FIELDS
    aenikosa TEXT,
    aenikosb TEXT,
    aenikosg TEXT,
    aplithintikosa TEXT,
    aplithintikosb TEXT,
    aplithintikosg TEXT
);

CREATE TABLE IF NOT EXISTS ancient_translations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stamp_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NOT NULL,
    title VARCHAR(50) NOT NULL,
    chapter VARCHAR(25) NOT NULL,
    original_text MEDIUMTEXT NOT NULL,
    translated_text MEDIUMTEXT NOT NULL,
    syntactic_analysis MEDIUMTEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ancient_book_exercises (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stamp_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NOT NULL,
    chapter VARCHAR(25) NOT NULL,
    ex_number INT NOT NULL,
    solution_path VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS ancient_old_ex (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stamp_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NOT NULL,
    ex_year YEAR NOT NULL,
    ex_path VARCHAR(128) NOT NULL,    
    solutions_path VARCHAR(128) NOT NULL
);
