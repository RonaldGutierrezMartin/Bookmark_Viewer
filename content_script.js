const templateBotones = document.querySelector("#templateBotones");
const divBotones = document.querySelector(".botones");
const templatePlantilla = document.querySelector("#templatePlantilla");
const mainContendor = document.querySelector("main");
const cuerpo = document.querySelector("body");
const inputBuscar = document.querySelector(".inputBuscar");
const aTarjeta = document.querySelector(".aTarjeta");
const botonAbajoArriba = document.querySelector("#bajarSubir");

let arrayCarpetas = [];
let arrayCarpetasPendiente = [];
let arrayMarcadores = [];
let abajoArriba = "#arriba";

let BotSelecParaCambio = null;

function insertarMarcadores() {
  const fragmento = document.createDocumentFragment();
  arrayMarcadores.forEach((i) => {
    if (i.hasOwnProperty("url")) {
      
      const templatePlantillaClon = templatePlantilla.content.cloneNode(true);
      
      templatePlantillaClon.querySelector(".tituloTarjeta").textContent = i.title;
      
      
      templatePlantillaClon.querySelector(".aTarjeta").href = i.url;

      //Accedo al favicon de cualquier web
      templatePlantillaClon.querySelector(".tarjetaIMG").src =
        "https://s2.googleusercontent.com/s2/favicons?domain=" +
        i.url +
        "&sz=32";
        if(i.title === "" ||i.title === " "){
          
          templatePlantillaClon.querySelector(".tituloTarjeta").classList.replace("tituloTarjeta","tituloTarjetaVacio")
          
        }

      fragmento.appendChild(templatePlantillaClon);
    }
  });
  arrayMarcadores = [];
  mainContendor.innerHTML = "";
  mainContendor.appendChild(fragmento);
}

function insertarBotones() {
  const fragmento = document.createDocumentFragment();
  arrayCarpetas.forEach((carpeta) => {
    const templateBotonesClon = templateBotones.content.cloneNode(true);
    templateBotonesClon.querySelector(".botonesMenu").textContent =
      carpeta.title;
    templateBotonesClon.querySelector(".botonesMenu").id = carpeta.id;
    fragmento.appendChild(templateBotonesClon);
  });
  divBotones.appendChild(fragmento);
}

function incertarMarcadoresDeCarpeta(carpeta) {
  carpeta.children.forEach((marcador) => {
    arrayMarcadores.push(marcador);
  });

  insertarMarcadores(arrayMarcadores);
}

function peticionAPI() {
  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      //CarpetasPadres.OtrosMarcadores.Tools.ArrayConMarcadoresDeTools

      buscarCarpetasRaiz(resultado);

      // const arrayCarpeta =
      //   resultado[0].children[1].children[indexCarpeta].children;
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });
}

function buscarCarpetasRaiz(resultado) {
  resultado.forEach((nodo) => {
    if (nodo.hasOwnProperty("children")) {
      nodo.children.forEach((carpetaRaiz) => {
        arrayCarpetasPendiente.push(carpetaRaiz);
      });
    }
  });
  buscarCarpetasHijas();
}

function buscarCarpetasHijas() {
  for (
    let carpetaRaiz = 0;
    carpetaRaiz < arrayCarpetasPendiente.length;
    carpetaRaiz++
  ) {
    arrayCarpetasPendiente[carpetaRaiz].children.forEach((nodoHijo) => {
      if (nodoHijo.hasOwnProperty("children")) {
        arrayCarpetasPendiente.push(nodoHijo);
      }
    });
    arrayCarpetas.push(arrayCarpetasPendiente[carpetaRaiz]);
  }

  insertarBotones();
}

function insertarTodosMarcadores() {
  const fragmento = document.createDocumentFragment();

  arrayCarpetas.forEach((carpeta) => {
    carpeta.children.forEach((marcador) => {
      arrayMarcadores.push(marcador);
    });
  });

  insertarMarcadores();
}

function buscar(titulo) {
  arrayCarpetas.forEach((carpeta) => {
    carpeta.children.forEach((marcador) => {
      if (marcador.hasOwnProperty("url")) {
        if (
          marcador.title.toLowerCase().includes(titulo.toLowerCase()) ||
          marcador.url.toLowerCase().includes(titulo.toLowerCase())
        ) {
          arrayMarcadores.push(marcador);
        }
      }
    });
  });

  insertarMarcadores();
}

function seleccionado(carpetaID) {
  document.getElementById(carpetaID).classList.add("seleccionado");
  if (BotSelecParaCambio !== null) {
    document
      .getElementById(BotSelecParaCambio)
      .classList.remove("seleccionado");
  }
  BotSelecParaCambio = carpetaID;
}

//Implemeto la delegacion de eventos
cuerpo.addEventListener("click", (evento) => {
  //BOTONES

  if (evento.target.id === "mostrarTodos") {
    insertarTodosMarcadores();
    seleccionado("mostrarTodos");
  } else if (evento.target.id === "admin") {
    chrome.tabs.create({ url: "chrome://bookmarks/" });
    seleccionado("admin");
  } else {
    arrayCarpetas.forEach((carpeta) => {
      if (carpeta.id === evento.target.id) {
        incertarMarcadoresDeCarpeta(carpeta);
        seleccionado(carpeta.id);
      }
    });
  }

  //ABRIR MARCADOR

  if (evento.target.matches(".aTarjeta")) {
    chrome.tabs.create({ url: evento.target.href });
  }

  if (
    evento.target.matches(".tarjetaIMG") ||
    evento.target.matches(".tituloTarjeta")
  ) {
    chrome.tabs.create({ url: evento.target.parentNode.href });
  }
});

botonAbajoArriba.addEventListener("click", () => {
  if (abajoArriba === "#arriba") {
    abajoArriba = "#abajo";
    botonAbajoArriba.href = abajoArriba;

    
    botonAbajoArriba.classList.add("rotar")
  } else {
    abajoArriba = "#arriba";
    botonAbajoArriba.href = abajoArriba;
    botonAbajoArriba.classList.remove("rotar")
    
    
  }
  
});

//BOTON BUSCAR
inputBuscar.addEventListener("input", () => {
  buscar(inputBuscar.value);
});

window.addEventListener("load", () => {
  document.querySelector(".inputBuscar").focus();
});

peticionAPI();
