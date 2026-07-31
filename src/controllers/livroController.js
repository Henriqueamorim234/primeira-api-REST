import naoEncontrado from "../erros/naoEncontrado.js";
import { livro, autores } from "../models/index.js";

class LivroController {
  static async listarLivros(req, res, next) {
    try {
      const buscaLista = livro.find({});

      req.resultado = buscaLista;
      next();
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
      const autorEncontrado = await autores.findById(novoLivro.autor);
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

  static async listarLivrosPorFiltro(req, res, next) {
    const busca = await processaBusca(req.query);

    try {
      if (busca != null) {
        const livroResultado = livro.find(busca).populate("autor");

        req.resultado = livroResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  }
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  if (minPaginas) busca.numeroPaginas.$gte = Number(minPaginas);
  if (maxPaginas) busca.numeroPaginas.$lte = Number(maxPaginas);
  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if (!autor) {
      busca = null;
    } else {
      busca.autor = autor._id;
    }
  }
  return busca;
}

export default LivroController;
