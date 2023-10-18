DROP TABLE IF exists Jugadores;
CREATE TABLE IF NOT EXISTS Jugadores (
    mail varchar(100) primary key,
    nom_usuario varchar(30),
    esadmin boolean,
    puntaje int
);
DROP TABLE IF exists Sala;
CREATE TABLE IF NOT EXISTS Sala (
    ID_sala int primary key auto_increment,
    mail varchar(100),
	nombre_sala varchar(100),
	FOREIGN KEY (mail) references Jugadores(mail)
);
DROP TABLE IF exists Lista;
CREATE TABLE IF NOT EXISTS Lista (
   FOREIGN KEY (ID_sala) references Sala(ID_sala),
   FOREIGN KEY (ID_categoria) references Categorias(ID_categoria)
);
DROP TABLE IF exists Categorias;
CREATE TABLE Categorias (
	ID_categoria int primary key //sumar auto_increment en sql,
    contenido varchar(100)
);
INSERT INTO Jugadores (mail, nom_usuario, esadmin, puntaje)
Values ( "famiano@gmail.com", "famiano", true, 0);
INSERT INTO Jugadores (mail, nom_usuario, esadmin, puntaje)
Values ( "Ichu@gmail.com", "Ichu", false, 0);
INSERT INTO Sala (ID_sala, nombre_sala)
Values (1, "Los Pibardos");
INSERT INTO Sala (ID_sala, nombre_sala)
Values (2, "Camioneros");
INSERT INTO Categorias (ID_categoria, contenido)
Values (1, "Lugares del mundo");
INSERT INTO Categorias (ID_categoria, contenido)
Values (2, "Colores");
Select *
From Jugadores
;
delete FROM Jugadores
Where mail="nbasile@pioix.edu.ar"
;
Select *
From Sala
;
Select *
From Lista
;
Select *
From Categorias
;