DROP TABLE IF exists Jugadores;
CREATE TABLE IF NOT EXISTS Jugadores (
    mail varchar(100) primary key,
    nom_usuario varchar(30),
    esadmin boolean,
    puntaje int,
    ID_sala int,
	FOREIGN KEY (ID_sala) references Sala(ID_sala)
);
DROP TABLE IF exists Sala;
CREATE TABLE IF NOT EXISTS Sala (
    ID_sala int primary key auto_increment,
	nombre_sala varchar(100),
    jugadores text,
);
DROP TABLE IF exists Lista;
CREATE TABLE IF NOT EXISTS Lista (
	ID_categoria int,
    ID_sala int,
   FOREIGN KEY (ID_categoria) references Categorias(ID_categoria),
   FOREIGN KEY (ID_sala) references Sala(ID_sala)
);
DROP TABLE IF exists Categorias;
CREATE TABLE Categorias (
	ID_categoria int primary key auto_increment,
    contenido varchar(100)
);
INSERT INTO Jugadores (mail, nom_usuario, esadmin, puntaje, ID_sala)
Values ( "famiano@gmail.com", "famiano", true, 0, -1);
INSERT INTO Jugadores (mail, nom_usuario, esadmin, puntaje, ID_sala)
Values ( "cirorosenthal@pioix.edu.ar", "ciro",false, 0, -1);
INSERT INTO Jugadores (mail, nom_usuario, esadmin, puntaje, ID_sala)
Values ( "martin@rivasgarcia.com.ar", "Rivas",true, 0, -1);
INSERT INTO Jugadores (mail, nom_usuario, esadmin, puntaje, ID_sala)
Values ( "nbasile@pioix.edu.ar", "nbasile",false, 0, -1);



INSERT INTO Sala (ID_sala, nombre_sala)
Values (-1, "Los Pibardos");
INSERT INTO Sala (nombre_sala)
Values ("Camioneros");

INSERT INTO Categorias (ID_categoria, contenido)
Values (1, "Lugares del mundo");
INSERT INTO Categorias (ID_categoria, contenido)
Values (2, "Colores");

INSERT INTO Lista (ID_sala, ID_categoria)
Values (1, 1);


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