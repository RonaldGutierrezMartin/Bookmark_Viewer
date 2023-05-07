const botonTools = document.querySelector("#botonFav");
const templatePlantilla = document.querySelector("#templatePlantilla");
const templatePlantillaClon = templatePlantilla.cloneNode(true);
const mainContendor = document.querySelector("main");
const cuerpo = document.querySelector("body");
const inputBuscar = document.querySelector(".inputBuscar")
const aTarjeta  =document.querySelector(".aTarjeta")
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

function peticionAPI(indexCarpeta) {
  //Tools:0; Learnig:1; Resources:2; Entertaiment:3

  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      //CarpetasPadres.OtrosMarcadores.Tools.ArrayConMarcadoresDeTools
      const arrayCarpeta =
        resultado[0].children[1].children[indexCarpeta].children;

      insertarEnExtension(arrayCarpeta);
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });
}

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

  //BOTON FAVORITOS

  if (evento.target.id === "botonFav") {
    
    urlGIF = "url(img/latido-del-corazon.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPISoloFav()  
  }

  //BOTON ALL

  if (evento.target.id === "botonAll") {
    
    urlGIF = "url(img/vegetal.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPIAll()  
  }

  //BOTON TOOLS

  if (evento.target.id === "botonTools") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    
    urlGIF = "url(img/herramientas.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPI(0);
  }

  //BOTON LEARNING

  if (evento.target.id === "botonLearning") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    
    urlGIF = "url(img/book.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPI(1);
  }

  //BOTON RESOURCES

  if (evento.target.id === "botonResour") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    
    urlGIF = "url(img/cajas.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPI(2);
  }

  //BOTON ENTRETENIMIENTO

  if (evento.target.id === "botonEnterta") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    
    urlGIF = "url(img/tv.gif)"
    marcadorDeSeleccionado(evento.target, urlGIF)
    peticionAPI(3);
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
  

