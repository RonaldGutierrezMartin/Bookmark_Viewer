const botonTools = document.querySelector("#botonFav");
const templatePlantilla = document.querySelector("#templatePlantilla");
const templatePlantillaClon = templatePlantilla.cloneNode(true);
const mainContendor = document.querySelector("main");
const cuerpo = document.querySelector("body");

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

//Implemeto la delegacion de eventos
cuerpo.addEventListener("click", (evento) => {
  if (evento.target.id === "botonFav") {
    //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
    miPromesa = chrome.bookmarks.getTree();
    // Ejecutamos la promesa y accedemos al resultado del array
    miPromesa
      .then((resultado) => {
        const templatePlantilla = document.querySelector("#templatePlantilla");
        const fragmento = document.createDocumentFragment();

        resultado.forEach((arrayAbuelo) => {
          arrayAbuelo.children.forEach((arrayHijo) => {
            arrayHijo.children.forEach((i) => {
              // console.log(i)
              const templatePlantillaClon =
                templatePlantilla.content.cloneNode(true);
              templatePlantillaClon.querySelector(
                ".tituloTarjeta"
              ).textContent = i.title;
              templatePlantillaClon.querySelector(".aTarjeta").href = i.url;

              //Accedo al favicon de cualquier web
              templatePlantillaClon.querySelector(".imagen").src =
                "https://s2.googleusercontent.com/s2/favicons?domain=" +
                i.url +
                "&sz=32";

              fragmento.appendChild(templatePlantillaClon);
            });
          });
        });
        mainContendor.innerHTML = "";
        mainContendor.appendChild(fragmento);
      })
      .catch((error) => {
        // Manejo de errores si la promesa es rechazada
        console.error(error);
      });
  }

  //BOTON TOOLS

  if (evento.target.id === "botonTools") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    peticionAPI(0);
  }

  //BOTON LEARNING

  if (evento.target.id === "botonLearning") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    peticionAPI(1);
  }

  //BOTON RESOURCES

  if (evento.target.id === "botonResour") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    peticionAPI(2);
  }

  //BOTON ENTRETENIMIENTO

  if (evento.target.id === "botonEnterta") {
    //Tools:0; Learnig:1; Resources:2; Entertaiment:3
    peticionAPI(3);
  }

  //BOTON ADMIN

  if (evento.target.id === "botonAdmin") {
    chrome.tabs.create({ url: "chrome://bookmarks/" });
  }

  //ESTA FALLANDO AL TOCAR LE LINK PQ EL evento.target.href solo lo
  //tiene el enlace, no la imagen ni el parrafo
  //UNA SOLUCION SERIA AÑADIRLE EL HREF A ELLOS TAMB

  //Uso la api tabs para abrir el enlace en el navegador
  if (
    evento.target.matches(".aTarjeta") ||
    evento.target.matches(".imagen") ||
    evento.target.matches(".tituloTarjeta")
  ) {
    chrome.tabs.create({ url: evento.target.href });
  }
});
