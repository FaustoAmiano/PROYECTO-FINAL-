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
function newRoom(){
  let al=document.getElementById("salita").value
  let data={
    nom_sala: al
  }
  newRoomFetch(data)
  joinRoom(al)
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
    alert("Ya existe una sala con ese nombre")
    
  }
  else{
    console.log("Sala creada con exito")
  }
} catch (error) {
  console.error("Error:", error);
}
}
async function joinRoom(al){
  data={
    roomName:al,
    categories:x
  }
  socket.emit('joinRoom', data);
}


function basta() {
  let a=document.getElementsByClassName("x");
  for(let x in a){
    a[x].disabled=true
  }
  /*for(i in listaEjemplo){
    let vectorRta=[document.getElementById(listaEjemplo[i]).value]
    console.log(vectorRta)
  }*/
  /*data = {
    respuestas: vectorRta
  }*/
  socket.emit("parar", {})

}
function vote(){
  let counter=0
  if(document.getElementById("success-outlined").checked==true){
    counter = counter+ 100
    console.log(counter)
  }else if(document.getElementById("danger-outlined").checked==true){
    counter = counter-50
    console.log(counter)
  }

}
socket.on("pararTodos", (data) => {
    console.log(data);
    let vectorRta = []
    for(i in listaEjemplo){
      vectorRta.push(document.getElementById(listaEjemplo[i]).value)
      console.log(vectorRta)
    }
    document.getElementById("juego").innerHTML = `
       <div style="padding-right: 120px" class="contenedor">
          <h4 id="listo">¡Se ha agotado el tiempo!</h4>
          <div class="cd-switch">
          <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" onclick="vote()">
          <label class="btn btn-outline-success" for="success-outlined">Good</label>
          <input type="radio" class="btn-check" name="options-outlined" id="danger-outlined" autocomplete="off" onclick="vote()">
          <label class="btn btn-outline-danger" for="danger-outlined">Bad</label>
      </div> 
      </div>`
      ; 

    socket.emit("cargarRespuestas", {vectorRta: vectorRta})
    
    
    
  });

socket.on("vectorRespuestas", (data) => {
  console.log("sa", data)
});