const botonTools = document.querySelector("#botonAll");
const templatePlantilla = document.querySelector("#templatePlantilla");
const fragmento = document.createDocumentFragment();
const templatePlantillaClon = templatePlantilla.cloneNode(true);
const mainContendor = document.querySelector("main");
const cuerpo = document.querySelector("body");

//Implemeto la delegacion de eventos
cuerpo.addEventListener("click", (evento) => {

  if (evento.target.id === "botonAll") {
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
              // console.log(i)
              const templatePlantillaClon =
                templatePlantilla.content.cloneNode(true);
              templatePlantillaClon.querySelector(
                ".tituloTarjeta"
              ).textContent = i.title;
              templatePlantillaClon.querySelector(".aTarjeta").href=i.url

              //Accedo al favicon de cualquier web
              templatePlantillaClon.querySelector(".imagen").src ="https://s2.googleusercontent.com/s2/favicons?domain="+i.url+"&sz=32"

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
  }




  if(evento.target.matches(".aTarjeta")){
    chrome.tabs.create({url:evento.target.href})
  }
});
