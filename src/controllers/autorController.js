import naoEncontrado from "../erros/naoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {
  static async listarAutor(req, res, next) {
    try {
      const autorLivros = await autor.find({});
      res.status(200).json(autorLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarAutorPorID(req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new naoEncontrado(`id do autor não localizado`));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarAutor(req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", Autor: novoAutor });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndUpdate(id, req.body);
      if (autorResultado != null) {
        res.status(200).json({ message: "Autor atualizado" });
      } else {
        next(new naoEncontrado(`id do autor não localizado`));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id);
      if (autorResultado != null) {
        res.status(200).json({ message: "Autor Deletado" });
      } else {
        next(new naoEncontrado(`id do autor não localizado`));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default AutorController;
