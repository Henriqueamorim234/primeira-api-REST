import ErroBase from "./erroBase.js";

class RequesicaoIncorreta extends ErroBase {
  constructor(message = "Um ou mais dados fornecidos estão incorretos") {
    super(message, 400);
  }
}

export default RequesicaoIncorreta;
