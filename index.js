/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session');
const { initializeApp } = require("firebase/app");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
  } = require("firebase/auth");

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

const server = app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

const io = require('socket.io')(server);

const sessionMiddleware = session({
    secret: 'sararasthastka',
    resave: true,
    saveUninitialized: false,
});

app.use(sessionMiddleware);

io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next);
});

const firebaseConfig = {
    apiKey: "AIzaSyAnd3eT_dYP5hQIRp6Yh8e2k6bc7RByh2U",
    authDomain: "proyecto-final-b0b19.firebaseapp.com",
    projectId: "proyecto-final-b0b19",
    storageBucket: "proyecto-final-b0b19.appspot.com",
    messagingSenderId: "176515864772",
    appId: "1:176515864772:web:8466acfbcb26072a729191",
  };
  
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const authService = require("./authService");


/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/

app.get("/", (req, res) => {
    res.render("login");
  });
  
  app.get("/register", (req, res) => {
    res.render("register");
  });
  
  app.post("/register", async (req, res) => {
    const { email, user, password } = req.body;
  
    try {
      await authService.registerUser(auth, { email, user, password });
      res.render("register", {
        message: "Registro exitoso. Puedes iniciar sesión ahora.",
      });
    } catch (error) {
      console.error("Error en el registro:", error);
      res.render("register", {
        message: "Error en el registro: " + error.message,
      });
    }
  });
  

  /*app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
      const userCredential = await authService.loginUser(auth, {
        email,
        password,
      });
      res.redirect("/home");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      res.render("login", {
        message: "Error en el inicio de sesión: " + error.message,
      });
    }
  });*/



  app.get('/registrarse', function(req, res){
    //Petición GET con URL = "/login"
    console.log("Soy un pedido GET", req.query); 
    //En req.query vamos a obtener el objeto con los parámetros enviados desde el frontend por método GET
    res.render('register', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  });
  app.get('/pruebaEntrar', function(req, res){
    console.log("Soy un pedido GET", req.query); 
    res.render('Juego', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  });

  app.get('/pruebaEntrar2', function(req, res){
    console.log("Soy un pedido GET", req.query); 
    res.render('final', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
  });
  app.get("/volver", (req, res) => {
    // Agrega aquí la lógica para mostrar la página del dashboard
    res.render("login", null);
  });
  app.get("/recargar", (req, res) => {
    // Agrega aquí la lógica para mostrar la página del dashboard
    res.render("Salas", null);
  });

  app.put('/login', async function(req, res) {
    //Petición PUT con URL = "/login"
    const  email  = req.body.user;
    const password  = req.body.pass;
    console.log(email, password)
    console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
    console.log(req.body.user)
    let respuesta= await MySQL.realizarQuery(` SELECT * FROM Jugadores WHERE mail= "${req.body.user}"`)
    console.log(respuesta)
    if (respuesta.length > 0) {
      console.log("sql correcto")
      try {
        console.log(req.body.user)
        const userCredential = await authService.loginUser(auth, {
          email,
          password,
        });
        req.session.conectado = req.body.user;
        res.send({validar: true, esadmin:respuesta[0].esadmin})
      } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        console.log("error en firebase")
        /*res.render("login", {
          message: "Error en el inicio de sesión: " + error.message,
        });*/
        res.send({validar:false})    
        }
    
    }
    else{
      console.log("sql error")
      res.send({validar:false})    
    }
});


app.post('/Admin', async function(req, res){
  console.log("Soy un pedido POST", req.query);
  res.render('Admin', null); 

});

app.post('/ingreso', async function(req, res){
  console.log("Soy un pedido GET", req.query);
  console.log("Soy Salas")
  res.render('Salas', null);

});

app.post('/nuevoUsuario', async function(req, res)
{
    let validar = true
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body); 
    let users= await MySQL.realizarQuery("SELECT * FROM Jugadores")
    if (req.body.mail.length == 0 || req.body.user.length == 0 || req.body.pass.length == 0 ){
        validar = false 
    }
    for (let i in users){
        if (req.body.mail == users[i].mail){
            console.log("falso")
            validar = false
        }
    }
    if (validar==true) {
      const email = req.body.mail;
      const user = req.body.user;
      const password  = req.body.pass;
      
      try {
        await authService.registerUser(auth, { email, password });
        await MySQL.realizarQuery (`INSERT INTO Jugadores VALUES("${email}", "${user}", ${false},${0})`)

        res.send({validar:true});
      } 
      catch (error) {
        console.error("Error en el registro:", error);
        res.render("register", {
          message: "Error en el registro: " + error.message,
        });
      }        
         //Renderizo página "home" enviando un objeto de 2 parámetros a Handlebars
    }
    else if (validar==false){
        res.send({validar:false})
    }
    
    //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método POST
    
    //res.render('home', null); //Renderizo página "home" sin pasar ningún objeto a Handlebars
});

app.put('/traerCategorias', async function(req, res){
  
  let vector = await MySQL.realizarQuery(` SELECT * FROM Categorias`)

  res.send({categorias: vector})

});


app.put('/salas', async function(req,res) {

  let vector = [await MySQL.realizarQuery(` Select * From Sala`)]
  console.log(vector)
  if (vector.length > 0) {
    res.send({sala: vector})    
  }
  else{
    res.send({sala:false})    
  }


})

vectorGlobalUsuarios = []
app.post('/newRoom', async function(req, res){
  console.log(req.body.roomName)
  console.log(req.body.nmPl)
  if (vectorGlobalUsuarios.includes(req.body.nmPl) ){
    console.log("usuario ya cargado")
  }else{
    vectorGlobalUsuarios.push(req.body.nmPl)
  }
  req.session.room = req.body.roomName
  req.session.save()
  console.log("req.session:", req.session.room)
  console.log(vectorGlobalUsuarios)
  let x=await MySQL.realizarQuery(` SELECT nombre_sala FROM Sala WHERE nombre_sala like "${req.body.roomName}"`)
  if(x.length ==0){
    await MySQL.realizarQuery(` INSERT INTO Sala(nombre_sala, ronda) VALUES ("${req.body.roomName}", 0)`)
    res.send({validar:true})
  }else{
    res.send({validar:false})
  }
}); 

app.put('/vectores', async function(req, res) {
  //Petición PUT con URL = "/login"
  console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
  let vector = [await MySQL.realizarQuery(` SELECT * FROM Categorias `)]
  let vector2 = [await MySQL.realizarQuery(` SELECT * FROM Jugadores `)]
  console.log(vector)
  console.log(vector2)
  if (vector.length > 0) {
      res.send({categorias: vector, usuarios: vector2})    
  }
  else{
      res.send({palabras:false})    
  }
});
app.post('/traerJugadores', async function(req, res){
  let vectoresUser = await MySQL.realizarQuery(` SELECT * FROM Sala WHERE nombre_sala like "${req.body.roomName}"`)
  console.log(vectoresUser)
  res.send({jugadores:vectoresUser})
});
app.post('/chequearSala', async function(req, res){
  console.log("Sala: ", req.body.roomName)
  if (vectorGlobalUsuarios.includes(req.body.nmPl) ){
    console.log("usuario ya cargado")
  }else{
    vectorGlobalUsuarios.push(req.body.nmPl)
  }
  console.log(vectorGlobalUsuarios)
  let x=await MySQL.realizarQuery(` SELECT nombre_sala FROM Sala WHERE nombre_sala like "${req.body.roomName}"`)
  if(x.length> 0 ){
    res.send({validar:true})
  }else{
    res.send({validar:false})
  }
});
app.put('/eliminarUsuario', async function(req, res){

  let validar = true
  console.log("Soy un pedido PUT", req.body); 
  let usuarios= await MySQL.realizarQuery("SELECT * FROM Jugadores")
  let entre = false
  console.log(req.body.pregunta)
  for (let i in usuarios){
      if (usuarios[i].nom_usuario == req.body.pregunta){
          entre = true
          respuesta = await MySQL.realizarQuery(`DELETE FROM Jugadores WHERE nom_usuario = "${req.body.pregunta}";`)

          res.send({validar: true})    
          
          
      }
  }
  if (entre == false) {
      res.send({validar:false})    
  }
  
});

app.put('/eliminarPuntaje', async function(req, res){

  let validar = true
  console.log("Soy un pedido PUT", req.body); 
  let usuarios= await MySQL.realizarQuery("SELECT * FROM Jugadores")
  let entre = false
  console.log(req.body.pregunta)
  console.log("hi")
  for (let i in usuarios){
      console.log("hola") 
      if (usuarios[i].nom_usuario == req.body.pregunta){
          console.log("hola2")
          entre = true
          respuesta = await MySQL.realizarQuery(`UPDATE Jugadores SET puntaje = ${0} WHERE nom_usuario="${req.body.pregunta}";`);
          let usuario = await MySQL.realizarQuery(`SELECT * FROM Jugadores WHERE mail = "${req.body.pregunta}"`)// traer el puntajer del usuario logeado
          console.log(usuario)
          res.send({validar: true})    
          
          
      }
  }
  if (entre == false) {
      res.send({validar:false})    
  }
  
});

app.get('/volver2', async function(req, res){
  console.log("Soy un pedido POST", req.query);
  res.render('Admin', null); 
});

app.get('/paginadeespera', function(req, res){
  res.render('espera', null)
});

let vectorRespuestas = []

io.on("connection", socket => {

  const req = socket.request;
  socket.on("parar", (data) => {
    console.log(data)
    //io.to(req.session.room).emit("pararTodos", {mensaje: "pararTodos"}) 
    vectorRespuestas = []
    io.emit("pararIntermedio", {mensaje: "pararIntermedio"}) 
  }) ;
  
  socket.on("pararTodos", (data) => {
    console.log(data)
    //io.to(req.session.room).emit("pararTodos", {mensaje: "pararTodos"}) 
    io.emit("pararTodos", {mensaje: "pararTodoss"})   
  }) ;

  socket.on("cargarRespuestas", (data) => {
    if (data.vectorRta[0] == null || data.vectorRta[0] == ""){
      console.log("falla el vector")
    }
    else{
      
      jugador = req.session.conectado
      vectorRespuestas.push({respuestas: data.vectorRta, jugador: jugador})
      console.log("este vector mando", vectorRespuestas)
      io.emit("vectorRespuestas", {respuestas: vectorRespuestas, jugadores: vectorGlobalUsuarios});
      //vectorRespuestas = []
    }
  socket.on("okResponse", async(player) =>{
    console.log("o", player)
    let ol= await MySQL.realizarQuery(`SELECT puntaje FROM Jugadores WHERE mail="${player.player}";`)
    console.log(ol)
    let play = await MySQL.realizarQuery(`UPDATE Jugadores SET puntaje = ${ol[0].puntaje+100} WHERE mail="${player.player}";`)
  })
  socket.on("badResponse", async(player) =>{
    console.log("o", player)
    let al= await MySQL.realizarQuery(`SELECT puntaje FROM Jugadores WHERE mail="${player.player}";`)
    console.log(al)
    let plays = await MySQL.realizarQuery(`UPDATE Jugadores SET puntaje = ${al[0].puntaje-100} WHERE mail="${player.player}";`)
  }) 
  });


  /*socket.on("cargarRespuestas", (data) => {
    let vectorRespuestas = []
    console.log("hola", data)
    console.log(req.session.conectado)
    jugador = req.session.conectado
    vectorRespuestas.push({respuestas: data.vectorRta, jugador: jugador})
    console.log("ayuda",{respuesta:data})
    console.log("rtas3", vectorRespuestas[0].respuesta)
    vectorFinal = [vectorRespuestas[0].respuesta]
    console.log("evento cargarRespuestas", vectorRespuestas,jugador);
    io.emit("vectorRespuestas", {respuestas: vectorRespuestas, jugadores: vectorGlobalUsuarios}); 
    console.log(req.session.room)
    io.to(req.session.room).emit("pararTodos", {}) 
  }) ;*/

  socket.on("joinRoom", async (data) => {
    console.log("joinRoom", data.roomName)
    let a = await MySQL.realizarQuery(` SELECT nombre_sala FROM Sala WHERE nombre_sala like "${data.roomName}"`);

    console.log("aca", a)
    if(data.roomName!=""){
      if(data.createRoom&&a[0].nombre_sala.length != 1){
        console.log("crearsala")
        socket.join(data.roomName);
        console.log("la sala ", data.roomName, " fue creada.");
        socket.emit("returnPlayers",{players:await unirseSala(data)});
      }else if(!data.createRoom&&a.length == 1){

        socket.join(data.roomName);
        socket.emit("returnPlayers",{players:await unirseSala(data)});
        console.log(data.nmPl, "se ha unido a la sala ", data.roomName);
      };
    };
  });

  socket.on("empezar",(data) => {
    console.log("hola")
    console.log(req.session.room)
    txt = "esta en la sala ",req.session.room
    io.emit("empezarTodos", {data})
    //io.to(req.session.room).emit("empezarTodos", {data})    
  })

  socket.on("mandarFinal", () =>{
    console.log("entre al fin")
    io.emit("terminar", {users: vectorGlobalUsuarios})
  })
});

//mete en la BDD al jugador a la sala
async function unirseSala(data){
  let Salaarray=await MySQL.realizarQuery(`SELECT jugadores, ID_sala FROM Sala WHERE nombre_sala LIKE "${data.roomName}"`);
  console.log("a",Salaarray)
  if(Salaarray[0].jugadores!=undefined||Salaarray[0].jugadores!=null){
    Salaarray[0].jugadores=Salaarray[0].jugadores.concat(",",data.nmPl);
    await MySQL.realizarQuery(`UPDATE Sala SET jugadores="${Salaarray[0].jugadores}" WHERE ID_sala LIKE "${Salaarray[0].ID_sala}"`)
  }else{
    await MySQL.realizarQuery(`UPDATE Sala SET jugadores="${data.nmPl}" WHERE ID_sala LIKE "${Salaarray[0].ID_sala}"`)
  }

  console.log(Salaarray)
  return Salaarray;
};


app.put('/logout', async function(req, res){

  req.session.destroy();

  res.send({validar:true})
  
  
});

app.put('/eliminarCategoria', async function(req, res){

  let validar = true
  console.log("Soy un pedido PUT", req.body); 
  let categorias= await MySQL.realizarQuery("SELECT * FROM Categorias")
  let entre = false
  console.log(req.body.borrar)
  for (let i in categorias){
      if (categorias[i].contenido == req.body.borrar){
          entre = true
          respuesta = await MySQL.realizarQuery(`DELETE FROM Categorias WHERE contenido = "${req.body.borrar}";`)
          res.send({validar: true})    
          
          
      }
  }
  if (entre == false) {
      res.send({validar:false})    
  }
  
});


app.post('/randomWord', async function(req, res){
  console.log("Soy un pedido POST", req.body);
  let letras = ["A","B", "C", "D", "E", "F", "G", "H", "I", "J", "K","L","M","N","O","Q","P","R","S","T","U","V"]
  var indiceAleatorio = Math.floor(Math.random() * letras.length)
  var letrasAleatoria = letras[indiceAleatorio]
  console.log(letrasAleatoria)
  res.send({letter: letrasAleatoria})

});

app.put("/sumarCategoria", async function(req, res){
  let x=await MySQL.realizarQuery(` SELECT * FROM Categorias WHERE contenido like "${req.body.nuevaCategoria}"`)
  if(x.length ==0){
    await MySQL.realizarQuery(` INSERT INTO Categorias(contenido) VALUES ("${req.body.nuevaCategoria}")`)
    res.send({validar:true, nombre:req.body.nuevaCategoria})
  }else{
    res.send({validar:false})
  } 
});

app.get('/pruebaEntrar', function(req, res){
  console.log("soy un pediod GET", req.query);
  res.render('final', null);
})

app.get('/terminar', function(req, res){
  console.log("soy un pediod GET", req.query);
  res.render('final', null);
})

app.put('/traerUsuarios', async function(req, res){
  console.log(req.body)
  const dataArray = req.body
  let vector = [];
  for (let i in dataArray){
    console.log(dataArray[0])
    vector.push(await MySQL.realizarQuery(` SELECT * FROM Jugadores WHERE mail like "${dataArray[i]}"  `));
    console.log("explo", vector)
  }
  res.send(vector) 

});