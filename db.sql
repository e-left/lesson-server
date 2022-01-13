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
    title VARCHAR(50) NOT NULL,
    category VARCHAR(15) NOT NULL,

    ermhneia VARCHAR(100) NOT NULL,
    etumologia VARCHAR(100) NOT NULL,

    vommoriza VARCHAR(150),
    vsunonima VARCHAR(150),
    vantonima VARCHAR(150),
    vfoni VARCHAR(50),

    venor VARCHAR(50),
    venup VARCHAR(50),
    veneu VARCHAR(50),
    venpr VARCHAR(50),
    venap VARCHAR(50),
    venme VARCHAR(50),

    vparatatikosor VARCHAR(50),
    vparatatikosup VARCHAR(50),
    vparatatikoseu VARCHAR(50),
    vparatatikospr VARCHAR(50),
    vparatatikosap VARCHAR(50),
    vparatatikosme VARCHAR(50),

    vmeor VARCHAR(50),
    vmeup VARCHAR(50),
    vmeeu VARCHAR(50),
    vmepr VARCHAR(50),
    vmeap VARCHAR(50),
    vmeme VARCHAR(50),

    vpmeaor VARCHAR(50),
    vpmeaeu VARCHAR(50),
    vpmeaap VARCHAR(50),
    vpmeame VARCHAR(50),

    vpmebor VARCHAR(50),
    vpmebeu VARCHAR(50),
    vpmebap VARCHAR(50),
    vpmebme VARCHAR(50),

    vaoror VARCHAR(50),
    vaorup VARCHAR(50),
    vaoreu VARCHAR(50),
    vaorpr VARCHAR(50),
    vaorap VARCHAR(50),
    vaorme VARCHAR(50),

    vaorbor VARCHAR(50),
    vaorbup VARCHAR(50),
    vaorbeu VARCHAR(50),
    vaorbpr VARCHAR(50),
    vaorbap VARCHAR(50),
    vaorbme VARCHAR(50),

    vpaoraor VARCHAR(50),
    vpaoraup VARCHAR(50),
    vpaoraeu VARCHAR(50),
    vpaorapr VARCHAR(50),
    vpaoraap VARCHAR(50),
    vpaorame VARCHAR(50),

    vpaorbor VARCHAR(50),
    vpaorbup VARCHAR(50),
    vpaorbeu VARCHAR(50),
    vpaorbpr VARCHAR(50),
    vpaorbap VARCHAR(50),
    vpaorbme VARCHAR(50),

    vparakor VARCHAR(50),
    vparakup VARCHAR(50),
    vparakeu VARCHAR(50),
    vparakpr VARCHAR(50),
    vparakap VARCHAR(50),
    vparakme VARCHAR(50),

    vparakbor VARCHAR(50),
    vparakbup VARCHAR(50),
    vparakbeu VARCHAR(50),
    vparakbpr VARCHAR(50),
    vparakbap VARCHAR(50),
    vparakbme VARCHAR(50),

    vupor VARCHAR(50),
    vupup VARCHAR(50),
    vupeu VARCHAR(50),
    vuppr VARCHAR(50),
    vupap VARCHAR(50),
    vupme VARCHAR(50),

    vsmeor VARCHAR(50),
    vsmeup VARCHAR(50),
    vsmeeu VARCHAR(50),
    vsmepr VARCHAR(50),
    vsmeap VARCHAR(50),
    vsmeme VARCHAR(50),

    ogenos VARCHAR(50),
    oenikos VARCHAR(50),
    opluthintikos VARCHAR(50),

    eklisi VARCHAR(50),
    eenikosar VARCHAR(50),
    eenikosth VARCHAR(50),
    eenikosou VARCHAR(50),
    eplithintikosar VARCHAR(50),
    eplithintikosth VARCHAR(50),
    eplithintikosou VARCHAR(50),
    ethetikos VARCHAR(50),
    esugkritikos VARCHAR(50),
    euperthetikos VARCHAR(50),

    aeidos VARCHAR(50),
    aenikosar VARCHAR(50),
    aenikosth VARCHAR(50),
    aenikosou VARCHAR(50),
    aplithintikosar VARCHAR(50),
    aplithintikosth VARCHAR(50),
    aplithintikosou VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS ancient_translations (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    stamp_updated TIMESTAMP DEFAULT NOW() ON UPDATE NOW() NOT NULL,
    chapter VARCHAR(25) NOT NULL,
    order_number INT NOT NULL,
    original_text VARCHAR(250) NOT NULL,
    translated_text VARCHAR(250) NOT NULL,
    syntactic_analysis VARCHAR(300) NOT NULL
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
