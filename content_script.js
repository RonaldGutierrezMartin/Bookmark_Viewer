const boton = document.querySelector("button");
const botonTools = document.querySelector("#botonTools");
const templatePlantilla = document.querySelector("#templatePlantilla");
const fragmento = document.createDocumentFragment();
const templatePlantillaClon = templatePlantilla.cloneNode(true);
const mainContendor = document.querySelector("main");
botonTools.addEventListener("click", () => {
  //   chrome.bookmarks.create({
  //     title: "G4",
  //     url: "https://es.wikipedia.org/wiki/Wikipedia:Portada",
  //   });

  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree();
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
    .then((resultado) => {
      const templatePlantilla = document.querySelector("#templatePlantilla");
      const fragmento = document.createDocumentFragment();
      

      // console.log(templatePlantillaClon);

      // const array = resultado[0];
      // console.log(resultado);
      // console.log(array.children[0].children[20].title);
      // const objetoWeb = array.children[0].children[20];
      // console.log(objetoWeb);

      resultado.forEach((arrayAbuelo) => {
        arrayAbuelo.children.forEach((arrayHijo) => {
          arrayHijo.children.forEach((i) => {
            console.log(i);
            const templatePlantillaClon = templatePlantilla.content.cloneNode(true);
            templatePlantillaClon.querySelector(".tituloTarjeta").textContent =
              i.title;
            fragmento.appendChild(templatePlantillaClon);
            
          });
        });
      });

      mainContendor.appendChild(fragmento);
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error);
    });
});
