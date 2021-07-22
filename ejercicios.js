const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());

const port = 3000;

// 2.	Agrega un endpoint '/api/suma' que responda a una petición de tipo GET con la suma de dos números que reciba mediante las querys num1 y num2.
// El servidor debe responder con un código de estado 200 y un json como el siguiente: { 'resultado': 7 }

app.get("/api/suma/:num1/:num2", (req, res) => {
  var numero1 = parseInt(req.params.num1);
  var numero2 = parseInt(req.params.num2);
  var resultado = numero1 + numero2;

  res.status(200).send({ resultado: resultado });
});

// 3.	Agrega un endpoint '/api/usuario/' que responda a una petición de tipo GET con el nombre que sea recibido a través de params.
// El servidor debe responder con un código de estado 200 y un json como este: { 'usuario': 'Edwin' }

app.get("/api/usuario/:nombre", (req, res) => {
  var nombre = req.params.nombre;

  res.status(200).send({ usuario: nombre });
});

// 4.	Agrega un endpoint '/api/swapi' que responda a una petición de tipo GET con el personaje solicitado de https://swapi.dev/.
// El cliente debe mandar el número de personaje mediante params. La respuesta del servidor debe lucir algo así
//             { 'personaje': {
//             	'name': 'Luke Skywalker',
//                         ...,
// } }

app.get("/api/swapi/:personaje/:pagina", (req, res) => {
  var nombrePersonaje = req.params.personaje;
  var paginaPersonaje = parseInt(req.params.pagina);
  const url = "https://swapi.dev/api/people/?page=";

  fetch(url + paginaPersonaje)
    .then((response) => response.json())
    .then((data) => {
      if (data.detail !== "Not found") {
        var resultado = data.results.find(
          (personaje) => personaje.name == nombrePersonaje
        );
        var paginaSiguiente = paginaPersonaje + 1;

        if (resultado !== undefined) {
          res.status(200).send(resultado);
        } else {
          res.status(404).send({
            mensaje:
              "No se encontro personaje, intente cambiando a la pagina numero" +
              " " +
              paginaSiguiente,
          });
        }
      } else {
        res.status(404).send({
          mensaje: "No se encontro la pagina ingresada",
        });
      }
    });
});

app.get("/api/swapi/:personaje", (req, res) => {
  var idPersonaje = req.params.personaje;
  const url = "https://swapi.dev/api/people/";

  fetch(url + idPersonaje)
    .then((response) => response.json())
    .then((data) => {
      if (data !== undefined) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          mensaje: "No se encontro personaje",
        });
      }
    });
});

// 5.	Agrega un endpoint '/api/body que responda a una petición de tipo PUT con el body que el cliente envíe al hacer la petición.
// Ejemplo: cliente envía un body desde postman o insomnia que luce como este:
// { “nombre”: “Maui”, “ocupacion”: “Sensei” }
// Entonces, el servidor debe responder con un objeto idéntico al que envía el cliente, junto con un status de respuesta 200.

app.put("/api/body", (req, res) => {
  var body = req.body;

  res.status(200).send(body);
});

// 6.	Vuelve a hacer el ejercicio 2 pero enviando num1 y num2 desde el body, a través de una petición POST que responda con el status 200

app.post("/api/suma", (req, res) => {
  var numero1 = parseInt(req.body.num1);
  var numero2 = parseInt(req.body.num2);
  var resultado = numero1 + numero2;

  res.status(200).send({ resultado: resultado });
});

// 7.	Crea un endpoint para una petición de tipo DELETE donde envíes un ID (un número cualquiera) a través de params.
// Si el param contiene el ID 3, entonces responde con un status 200 y el mensaje “se ha eliminado el objeto con ID 3”, de lo contrario,
// si envían cualquier otro número como ID, responde con un status 404 y el mensaje “No se encontró el objeto con el ID especificado”.

app.delete("/api/eliminar/:id", (req, res) => {
  var id = parseInt(req.params.id);

  if (id === 3) {
    res.status(200).send("se ha eliminado el objeto con ID 3");
  } else {
    res.status(404).send("No se encontró el objeto con el ID especificado");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
