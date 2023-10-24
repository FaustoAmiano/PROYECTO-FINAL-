async function entrar(data) {
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
    
    try {
      const response = await fetch("/login", {
        method: "PUT", // or 'POST'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);

      console.log("hola")
  
      if (result.validar == false) {
        alert("Los datos son incorrectos")
      } else {
        
        //Envio el formularia desde dom para cambiar de pagina
        //Podria usar tambien un changeScreen()

        console.log(result.esadmin)
        if (result.esadmin == true){
          document.getElementById("administrador").submit()  
          }  else 
          {document.getElementById("loguearse").submit()}
       
        }
  
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  //Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick
  function login() {
    //Leo los datos del input
    let usuario = document.getElementById("usuarioId").value
    let contraseña = document.getElementById("passwordId").value
  
    //Creo un objeto de forma instantanea
    let data = {
        user: usuario,
        pass: contraseña
    }

  
    //data es el objeto que le paso al back
    entrar(data)
  }
  function nuevoUsuario(){
    let mail = document.getElementById("mail").value
    let usuario = document.getElementById("usuarioId").value
    let contraseña = document.getElementById("passwordId").value
  
    let data = {
      mail: mail,
      user: usuario,
      pass: contraseña
    }
      registrarse(data)
  
  }
  async function registrarse(data){
    try {
    const response = await fetch("/nuevoUsuario", {
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
      alert("El usuario no se puede crear")
      location.href = '/register'
    }
    else{
      console.log("Usuario creado con exito")
      location.href = '/volver'
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

 async function traerCategorias(){
  try {
    const response = await fetch("/traerCategorias", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success Categorias:", result);
    let categorias = result.categorias
    console.log(categorias)
    //falta el inner HTML con las categorias que existen y el tipo de boton para poder seleccionarlas (estilo true/false)
  } catch (error) {
    console.error("Error:", error);
  }
 }

 function addCategory(){
  let text = document.getElementById("inputCategory").value
  console.log(text)
  data = {
    txt: text
  }
  category(data)
}
async function category(data){
  try {
    const response = await fetch("/category", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success Categorias:", result);
    if(result.validar==true){
      alert("Se agregó correctamente")
    }else{
      alert("Hubo un problema al agregar la categoria")
    }
    //falta el inner HTML con las categorias que existen y el tipo de boton para poder seleccionarlas (estilo true/false)
  } catch (error) {
    console.error("Error:", error);
  }
 }


 async function traerSalas(){
  try {
    const response = await fetch("/salas", {
      method: "PUT", // or 'POST'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const result = await response.json();

    console.log("Success:", result);
    let vector = result
    console.log(vector)

    //falta terminar
  }
  catch (error) {
    console.error("Error:", error);
  }
 }

 async function API(){
  try {
    const response = await fetch("https://dolarapi.com/v1/dolares", {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    const result = await response.json();
    console.log("Success API:", result);

    dolarOFicial = result[0]
    dolarBlue = result[1]
    dolarBolsa = result[2]
    dolarLiqui = result[3]
    dolarSolidario = result[4]
    dolarMayorista = result[5]

    console.log(dolarOFicial.venta)
    console.log(dolarBlue.venta)

    let html =  ` <marquee id= dolar> Valor actual del dolar: oficial: $${dolarOFicial.venta} - Blue: $${dolarBlue.venta}- Contado con Liqui: $${dolarLiqui.venta} - Solidario: $${dolarSolidario.venta} - Mayorista: $${dolarMayorista.venta}</marquee>`
    document.getElementById("header").innerHTML = html

    
  }
  catch (error) {
    console.error("Error:", error);
  }
 }