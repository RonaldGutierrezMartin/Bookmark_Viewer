const boton = document.querySelector("button")
const parrafo = document.querySelector("p")
boton.addEventListener("click", () => {
    
  //   chrome.bookmarks.create({
  //     title: "G4",
  //     url: "https://es.wikipedia.org/wiki/Wikipedia:Portada",
  //   });


  

  //El metodo getTree me devuelve una promesa por lo que la almaceno en una variable y la analizo
  miPromesa = chrome.bookmarks.getTree()
  // Ejecutamos la promesa y accedemos al resultado del array
  miPromesa
  .then((resultado) => {
      
      const array = resultado[0]  
      console.log(array.children[0].children[1])    
    })
    .catch((error) => {
      // Manejo de errores si la promesa es rechazada
      console.error(error)
    });

    
});
