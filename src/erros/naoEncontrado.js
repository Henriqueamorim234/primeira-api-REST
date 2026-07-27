import ErroBase from "./erroBase.js";

class naoEncontrado extends ErroBase {
  constructor(message = "pagina não encontrada") {
    super(message, 404);
  }
}

export default naoEncontrado;
