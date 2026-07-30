import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro é obrigatorio"],
    },
    editora: { type: String },
    preco: { type: Number },
    numeroPaginas: {
      type: Number,
      min: [
        10,
        "O número de paginas deve estar entre 10 e 5000. valor fornecido: {VALUE}",
      ],
      max: [
        5000,
        "O número de paginas deve estar entre 10 e 5000. valor fornecido: {VALUE}",
      ],
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "o autor do livro é obrigatorio"],
    },
  },
  { versionKey: false },
);

const livro = mongoose.model("livros", livroSchema);

export default livro;
