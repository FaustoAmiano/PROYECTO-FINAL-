const IP = "ws://localhost:3000";
const socket = io(IP);
let room;

socket.on("connect", () => {
    console.log("Me conecté a WS");
});


function funcionPrueba() {
    textoEnviado= document.getElementById("msj").value
    if (textoEnviado==""){
      console.log("No escribio nada")
    }else{
      data={
          mensaje: textoEnviado
      }
      socket.emit("incoming-message", { mensaje: textoEnviado });
      document.getElementById("msj").value="";
    }
}
socket.on("server-message", data => {
    
    console.log("Me llego del servidor", data);
    document.getElementById("nuewvoMensaje").innerHTML += `
    <div class="chat-panel">
    <div class="row no-gutters">
      <div class="col-md-3 offset-md-9">
        <div class="chat-bubble chat-bubble--right">
          ${data.mensaje}
        </div>
      </div>
    </div>
    `; 
    
    
});

socket.emit("room", "Robocop")

socket.on("room", data => {
  room=data;
})
function entrarchats(){
  backChats()  
}

async function backChats(){
  try {
    const response = await fetch("/buscarChat", {
      method: "POST", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    
  } catch (error) {
    console.error("Error:", error);
  }
}


function createRoom(){
  document.getElementById("pedilo").innerHTML += `
    <h5 class="card-title">Ingresar</h5>
    <div class="mb-3 form-group">
      <input type="email" name="email" placeholder="Nombre Sala" id="salita" required />
      <button class="btn btn-primary" type="button" onclick="newRoom()">Crear</button>
    </div>
    `; 
}
function join(){
  document.getElementById("unirse").innerHTML += `
  <div class="mb-3 form-group">
    <input type="email" name="email" placeholder="Nombre Sala" id="salita2" required />
    <button class="btn btn-primary" type="button" onclick="chequearSala()">Unirse</button>
  </div>
  `; 
}
//CREAR UNA SALA

function newRoom(){
  let data={
    roomName: document.getElementById("salita").value,
    nmPl:sessionStorage.getItem("userName"),
    createRoom:true
  };
  if (data.roomName==""){
    alert("Le falta completar el nombre de la sala")
  }else{
    newRoomFetch(data);
  }
}
async function newRoomFetch(data){
  try {
  const response = await fetch("/newRoom", {
    method: "POST", // or 'POST'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    });
  
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);
    if (result.validar == false) {
      alert("Ya existe una sala con ese nombre");
    }else{
      console.log("Sala creada con exito")
      sessionStorage.setItem("categories", validaCheckbox());
      sessionStorage.setItem("rounds", validaRadio());
      joinRoom(data);
      location.href='/paginadeespera'
      espera()
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
//REVISAR SI EXISTE UNA SALA

async function chequearSala(){
  try {
    data={
      roomName: document.getElementById("salita2").value,
      nmPl:sessionStorage.getItem("userName"),
      createRoom:false
    };
    const response = await fetch("/chequearSala", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success:", result);
    if (result.validar == false) {
      alert("No existe una sala con ese nombre");
    }else{
      console.log("Sala encontrada con exito");
      await traerJugadores(data);
      joinRoom(data);
      location.href='/paginadeespera'
      espera()
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//PEDIR LOS JUGADORES DE UNA SALA
async function traerJugadores(data){
  try {
    const response = await fetch("/traerJugadores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log("Success: traer players", result);
  } catch (error) {
    console.error("Error:", error);
  };
};

//UNIRSE A UNA SALA
function joinRoom(data){
  console.log("algo así", data)
  socket.emit('joinRoom', data);
}

//IR A LA PAGINA DE ESPERA
function espera(){
  console.log("hika")
  let vectorJugadores=sessionStorage.players.split(",")
  console.log("hello ciro", vectorJugadores)
  for(let i in vectorJugadores){
    document.getElementById("esperaUsersList").innerHTML+=`
    <div class="card" id="esperaUsersList" style="width: 28rem; float:center; display:block" >
    <div class="card-body">
      <center>
        <table>
          <tr>
            <th>${vectorJugadores[i]}</th>
          </tr>
        </table>
      </center>
    </div>
  </div>
    `;
  }

  
}



/*
HAY Q VACIAR LOS JUGADORES DE LAS SALAS DE LA BASE DE DATOS:)
*/


function basta() {
    
  socket.emit("parar", {})

}

socket.on("pararIntermedio",() => {
  let a=document.getElementsByClassName("x");
  for(let x in a){
    a[x].disabled=true
  }
  socket.emit("pararTodos")
});


socket.on("pararTodos", (data) => {
    console.log(data);
    let vectorRta = []
    for(i in listaEjemplo){
      vectorRta.push(document.getElementById(listaEjemplo[i]).value)
    }
    
    categoriesBasta = sessionStorage.categoriasFinal.split(",")
    console.log(categoriesBasta)
    let html = `
        <div style="padding-right: 120px" class="contenedor">
            <h4 id="listo">¡Se ha agotado el tiempo!</h4>`
    for (let i in categoriesBasta){
      html +=`
        <h4 id="${categoriesBasta[i]}">${categoriesBasta[i]}</h4>
        <div id="respuestasJugadores" class="respuestasJugadores"> </div>
        `
    document.getElementById("juego").innerHTML = html
    } 
    socket.emit("cargarRespuestas", {vectorRta: vectorRta})    
  });

socket.on("vectorRespuestas", (data) => {
  console.log("adios", data)
  console.log(data.respuestas.length)
  console.log(data.jugadores.length)
  console.log("jiji", data.respuestas[0].jugador)

  if(data.respuestas.length <= data.jugadores.length) {
    let divsRtas = document.getElementsByClassName("respuestasJugadores");
    console.log(divsRtas.length)
    for(let i = 0; i < divsRtas.length; i++) {
      let rtas = "";
      for(let player = 0; player < data.respuestas.length; player++) {
        rtas += `${data.respuestas[player].jugador}: ${data.respuestas[player].respuestas[i]}
        <div style="padding-right: 120px" class="contenedor">
          <div class="cd-switch">
          <button class="btn btn-primary" id="success-outlined" type="button">Bien</button>
          <button class="btn btn-primary" id="danger-outlined" type="button">Mal</button>
      </div> 
      </div>
      <br>`;
      }
      divsRtas[i].innerHTML = rtas;
    }
    let html = `<div class="mb-3 form-check" div="admin" id="siguiente">
      <center><button class="btn btn-primary" id="avanzar" type="button" onclick="final()">Siguiente Ronda</button></center>
      </div> `
      document.getElementById("basta").innerHTML = html;

  }
      });


socket.on("returnPlayers", (data)=>{
  console.log("players",data);
})
  
function votar(){
  let bien = document.getElementById("success-outlined")
  let mal = document.getElementById("danger-outlined")
  let contadorBien=0
  bien.addEventListener('click', ()=>{
    contadorBien+=100
    console.log(contadorBien)
  })
  let contadorMal=0
  mal.addEventListener('click', ()=>{
    contadorMal-=100
    console.log(contadorMal)
  })
  console.log("4hola", contadorMal)
}

function entrarJuego(){
  data = {
    cat: sessionStorage.categories,
    ronda: sessionStorage.rounds,
    letra: sessionStorage.letra
  }
  console.log(data)
  socket.emit("empezar", data)
}
socket.on("empezarTodos", (data) =>{
  console.log("esto es data", data.a)
  const myJSON = JSON.stringify(data);
  sessionStorage.setItem("testJSON", myJSON);
  irAlJuego()
})
function irAlJuego(){
  location.href = '/pruebaEntrar'
}

function final(){
  socket.emit("mandarFinal", {})
}
socket.on("terminar", (data) => {
  console.log(data.users)
  data = {
    users: data.users
  }
  const myJson2 = JSON.stringify(data)
  sessionStorage.setItem("testJSON2", myJson2);
  location.href = '/terminar'
})


//location.href = '/terminar'



