import naoEncontrado from "../erros/naoEncontrado.js";
import { autor } from "../models/Autor.js";
import livro from "../models/livro.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivroPorID(req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if (livroEncontrado != null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new naoEncontrado("id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async cadastrarLivro(req, res, next) {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto =
        autorEncontrado == null
          ? { ...novoLivro, autor: null }
          : { ...novoLivro, autor: { ...autorEncontrado._doc } };

      const livroCriado = await livro.create(livroCompleto);
      res
        .status(201)
        .json({ message: "criado com sucesso", livro: livroCriado });
    } catch (erro) {
      next(erro);
    }
  }

  static async atualizarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);
      if (livroResultado != null) {
        res.status(200).json({ message: "Livro atualizado" });
      } else {
        next(new naoEncontrado("id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async deletarLivro(req, res, next) {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndDelete(id);
      if (livroResultado != null) {
        res.status(200).json({ message: "Livro Deletado" });
      } else {
        next(new naoEncontrado("id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  }

  static async listarLivrosPorEditora(req, res, next) {
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      if (livrosPorEditora != null) {
        res.status(200).json(livrosPorEditora);
      } else {
        next(new naoEncontrado("editora não encontrada para buscar os livros"));
      }
    } catch (erro) {
      next(erro);
    }
  }
}

export default LivroController;
