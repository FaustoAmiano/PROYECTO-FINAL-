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

PUT  http://localhost:3000/traerCategorías

Una vez que ingresemos, tendremos que traer las categorías para que el usuario las pueda elegir

[
  {
    "ID_categoria": "number",
    "contenido": "string"
  }
]






