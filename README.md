# PROYECTO-FINAL-

GET http://localhost:3000/register

Entrar a la página de registro

POST http://localhost:3000/register

Registrar un usuario nuevo

POST http://localhost:3000/login

Ahora vamos a loguearnos. Para eso debemos consultar el vector de usuarios, lo que nos devolvera.

[
  {
    "mail": "string",
    "nom_usuario": "string",
    "esadmin": "boolean",
    "puntaje": "number"
  }
]

Luego será comparado con el objeto data que enviamos desde el fetch.

data = {
    mail: 
    contraseña:
}

La constraseña será comparada desde el firebase.

GET  http://localhost:3000/users

Obtiene los datos de los usuarios

[
  {
    "mail": "string",
    "nom_usuario": "string"
    "esadmin": "boolean",
    "puntaje": "number",
    "ID_sala": "number",
  }
]
( "mail": "texto que describe el mail del usuario",
    "nom_usuario": "texto del nombre del usuario"
    "esadmin": "si es administrador o no",
    "puntaje": "el rango de puntaje que obtuvo el usuario",
    "ID_sala": "el id de la sala",)

GET  http://localhost:3000/salas

Obtiene los datos de las salas

[
  {
    "ID_sala": "number",
    "nombre_sala": "string"
  }
]
  ("ID_sala": "el id de la sala",
    "nombre_sala": "el texto que describe el nombre de la sala")




GET  http://localhost:3000/categorias

Obtiene los datos de las categorias

[
  {
    "ID_Categoria": "number",
    "contenido": "string"
  }
]
  ("ID_categoria": "el id de la categoria seleccionada",
    "contenido": "el texto que describe la categoria")


POST http://localhost:3000/Admin

Responde con los usuarios que son administradores, seleccionando dentro de los datos de cada usuario los que dicen "true" en "esadmin"

[
  {
    "esadmin": "boolean",
  }
]
("es admin": "verdadero o falso")

POST  http://localhost:3000/nuevoUsuario

Obtiene los datos para el nuevo usuario:

[
  {
    "mail": "string",
    "nom_usuario": "string"
    "esadmin": "boolean",
    "puntaje": "number",
    "ID_sala": "number",
  }
]

PUT  http://localhost:3000/traerCategorías

Una vez que ingresemos, tendremos que traer las categorías para que el usuario las pueda elegir

[
  {
    "ID_categoria": "number",
    "contenido": "string"
  }
]

PUT  http://localhost:3000/traerSalas

Una vez que ingresemos, tendremos que traer las salas a las que se quiere unir el usuario

[
  {
    "ID_sala": "number",
    "nombre_sala": "string"
  }
]

PUT http://localhost:3000/eliminarUsuario

Debemos ingresar a la tabla de usuarios para seleccionar uno y borrar sus datos:

[
  {
    "mail": "string",
    "nom_usuario": "string"
    "esadmin": "boolean",
    "puntaje": "number",
    "ID_sala": "number",
  }
]

PUT http://localhost:3000/eliminarPuntaje

Debemos entrar a los datos del usuario para convertir el dato "puntaje" a 0

[
  {
    "puntaje": "number"
  }
]






