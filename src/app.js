import express from "express";
import conectaNaDataBase from "./config/dbconect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("conexão com o banco feita com sucesso");
});

const app = express();
routes(app);

app.use(manipulador404);

app.use(manipuladorDeErros);

export default app;
