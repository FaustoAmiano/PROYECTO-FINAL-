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
    roomName: document.getElementById("salita").value
  }
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
      nomSala: document.getElementById("salita2").value,
      nmPl:sessionStorage.getItem("userName")
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
    }
    else{
      console.log("Sala encontrada con exito");
      traerJugadores(data);
      joinRoom(data);
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
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  };
};

//UNIRSE A UNA SALA
function joinRoom(data){
  socket.emit('joinRoom', data);
}

//IR A LA PAGINA DE ESPERA
function espera(result){
  //te manda a la sala de espera
  //lista de jugadores
  //boton para que no entren mas jugadores y empezar a jugar
}


/*
HAY Q VACIAR LOS JUGADORES DE LAS SALAS DE LA BASE DE DATOS:)
*/