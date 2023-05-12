const templateBotones = document.querySelector("#templateBotones")
const divBotones  =document.querySelector(".botones")

const templatePlantilla = document.querySelector("#templatePlantilla");

const mainContendor = document.querySelector("main");
const cuerpo = document.querySelector("body");
const inputBuscar = document.querySelector(".inputBuscar")
const aTarjeta  =document.querySelector(".aTarjeta")
 
let arrayCarpetas = []
let arrayCarpetasPendiente = []
let resultadoRequest 

let BotSelecParaCambio = null
let BGIMGBotSelParaCamb = null
let urlGIF
function insertarEnExtension(arrayCarpeta) {
  const fragmento = document.createDocumentFragment();
  arrayCarpeta.forEach((i) => {
    console.log(i);
    const templatePlantillaClon = templatePlantilla.content.cloneNode(true);
    templatePlantillaClon.querySelector(".tituloTarjeta").textContent = i.title;
    templatePlantillaClon.querySelector(".aTarjeta").href = i.url;

    //Accedo al favicon de cualquier web
    templatePlantillaClon.querySelector(".imagen").src =
      "https://s2.googleusercontent.com/s2/favicons?domain=" + i.url + "&sz=32";

    fragmento.appendChild(templatePlantillaClon);
  });
  mainContendor.innerHTML = "";
  mainContendor.appendChild(fragmento);
}

function insertarBotones(){
  console.log("entro en insertar")
  const fragmento = document.createDocumentFragment();
  arrayCarpetas.forEach(carpeta =>{
    console.log("carpeta")
    console.log(carpeta)
    for(let marcador = 0; marcador<carpeta.children.length;marcador++){
      console.log("esto es el for")
      if (carpeta.children[marcador].hasOwnProperty("url")){
        
        const templateBotonesClon = templateBotones.content.cloneNode(true)
        templateBotonesClon.querySelector(".botonesMenu").textContent = carpeta.title
        templateBotonesClon.querySelector(".botonesMenu").id = carpeta.id
        fragmento.appendChild(templateBotonesClon)
        break
      }

    }
  })
  divBotones.appendChild(fragmento)
}

function incertarMarcadores(carpeta){
  const fragmento = document.createDocumentFragment();

  carpeta.children.forEach(marcador =>{
    console.log(marcador)
    const templatePlantillaClon = templatePlantilla.content.cloneNode(true)
    console.log(templatePlantillaClon)
    templatePlantillaClon.querySelector(".tituloTarjeta").textContent = marcador.title
    templatePlantillaClon.querySelector(".aTarjeta").href = marcador.url;

    //Accedo al favicon de cualquier web
    templatePlantillaClon.querySelector(".imagen").src =
      "https://s2.googleusercontent.com/s2/favicons?domain=" + marcador.url + "&sz=32";

    fragmento.appendChild(templatePlantillaClon);

  })

  mainContendor.innerHTML = "";
  mainContendor.appendChild(fragmento);
}

function peticionAPI() {
  //Tools:0; Learnig:1; Resources:2; Entertaiment:3

  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      //CarpetasPadres.OtrosMarcadores.Tools.ArrayConMarcadoresDeTools
      
      buscarCarpetasRaiz(resultado)

      // const arrayCarpeta =
      //   resultado[0].children[1].children[indexCarpeta].children;
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });
}

function buscarCarpetasRaiz(resultado){
  console.log("buscaCarpetaRaiz")
  resultado.forEach(nodo =>{
    
    if(nodo.hasOwnProperty("children")){
      nodo.children.forEach(carpetaRaiz =>{
        
        arrayCarpetasPendiente.push(carpetaRaiz)
        
      })
    }
  })
  buscarCarpetasHijas()
}

function buscarCarpetasHijas(){
  console.log("buscarCarpetasHijas")
  
  for (let carpetaRaiz = 0; carpetaRaiz<arrayCarpetasPendiente.length; carpetaRaiz++){
    arrayCarpetasPendiente[carpetaRaiz].children.forEach(nodoHijo =>{

      
      if(nodoHijo.hasOwnProperty("children")){
        arrayCarpetasPendiente.push(nodoHijo)
        
      }
    })
    arrayCarpetas.push(arrayCarpetasPendiente[carpetaRaiz])
    
  }
  
  insertarBotones()
}

console.log("array de carpetas pendientes")
console.log(arrayCarpetasPendiente)
console.log("array de carpetas")
console.log(arrayCarpetas)



function peticionAPIAll() {
  //Tools:0; Learnig:1; Resources:2; Entertaiment:3

  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      //CarpetasPadres.OtrosMarcadores.Tools.ArrayConMarcadoresDeTools
      let arrayCarpeta = []
      for(i=0;i<=3;i++){
        
        arrayCarpeta = arrayCarpeta.concat(resultado[0].children[1].children[i].children)
      }
      
      insertarEnExtension(arrayCarpeta);
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });
}



function peticionAPISoloFav(){
  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      //CarpetasPadres.OtrosMarcadores.Tools.ArrayConMarcadoresDeTools
      const arrayCarpeta = resultado[0].children[0].children;
      console.log(arrayCarpeta)
      insertarEnExtension(arrayCarpeta);
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });
}



function buscar(titulo){

  //Tools:0; Learnig:1; Resources:2; Entertaiment:3
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      //CarpetasPadres.OtrosMarcadores.Tools.ArrayConMarcadoresDeTools
      let arrayCarpeta = []
      for(i=0;i<=3;i++){
        
        arrayCarpeta = arrayCarpeta.concat(resultado[0].children[1].children[i].children)
      }
      let elementosEncontrados =[]
      arrayCarpeta.forEach(i =>{
        if (i.title.toLowerCase().includes(titulo.toLowerCase())){
          elementosEncontrados.push(i)
        }
      })

      insertarEnExtension(elementosEncontrados);
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });

}

function marcadorDeSeleccionado(botonSelecionado,urlGIF){
  
  if(BotSelecParaCambio!==null){
    
    BotSelecParaCambio.style.backgroundImage = BGIMGBotSelParaCamb
  }
  BotSelecParaCambio = botonSelecionado
  
  botonSelecionado.style.backgroundImage = urlGIF
  

}


//Implemeto la delegacion de eventos
cuerpo.addEventListener("click", (evento) => {

  // //BOTON FAVORITOS

  // if (evento.target.id === "botonFav") {
    
  //   urlGIF = "url(img/latido-del-corazon.gif)"
  //   marcadorDeSeleccionado(evento.target, urlGIF)
  //   peticionAPISoloFav()  
  // }

  //BOTONES

  if(evento.target.matches(".botonesMenu")){
    console.log("Entre en el evento")
    arrayCarpetas.forEach(carpeta =>{
      if(carpeta.id === evento.target.id){
        console.log("Lame a la funcion")
        incertarMarcadores(carpeta)
      }
    })
  }


  //BOTON ALL

  if (evento.target.id === "botonAll") {
    
    urlGIF = "url(img/vegetal.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPIAll()  
  }


  //BOTON ADMIN

  if (evento.target.id === "botonAdmin") {
    
    urlGIF = "url(img/fabrica.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    chrome.tabs.create({ url: "chrome://bookmarks/" });
  }


  //Uso la api tabs para abrir el enlace en el navegador
  
  
  if (evento.target.matches(".aTarjeta")) {
    
    chrome.tabs.create({ url: evento.target.href });
  }

  if (evento.target.matches(".imagen") ||
  evento.target.matches(".tituloTarjeta")){
    
    chrome.tabs.create({ url: evento.target.parentNode.href });
  }

  

  
});


//BOTON BUSCAR

inputBuscar.addEventListener("input", ()=>{

  buscar(inputBuscar.value)
})

window.addEventListener("load", ()=>{
  document.querySelector(".inputBuscar").focus()
});

peticionAPI()
  

console.log("final")