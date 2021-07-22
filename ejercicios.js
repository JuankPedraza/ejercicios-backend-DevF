const express = require("express");

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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
