import RequesicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequesicaoIncorreta {
  constructor(erro) {
    const mensagensErros = Object.values(erro.errors)
      .map((erro) => erro.message)
      .join("; ");
    super(`Os sequintes erros foram encontrados: ${mensagensErros}`);
  }
}

export default ErroValidacao;
