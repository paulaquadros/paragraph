import http from "http";
import { promises as fs } from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// P/ fins de estudo ;) >>> vou usar depois

const server = http.createServer(async (req, res) => {
  // Async faz com que a função seja assíncrona, permitindo o uso de await
  const { url } = req; // Obtém a URL da requisição

  // Obtém o caminho do arquivo a partir da URL
  const filePath = path.join(
    new URL(".", import.meta.url).pathname,
    url === "/" ? "/index.html" : url
  );

  // Tenta ler o arquivo
  try {
    if (url === "/api/lorem") {
      // Se a URL for /api/lorem
      const x = parseInt(req.headers["x-number"], 10) || 0; // Obtém o valor de x-number do cabeçalho da requisição
      const paragraphs = generateLoremIpsum(x); // Chama a função que gera parágrafos

      res.writeHead(200, { "Content-Type": "application/json" }); // Define o cabeçalho da resposta
      res.end(JSON.stringify({ paragraphs })); // Envia a resposta como JSON, stringify converte o objeto para string
    } else {
      const fileContent = await fs.readFile(filePath, "utf-8"); // await faz com que a execução aguarde a leitura do arquivo

      res.writeHead(200, { "Content-Type": getContentType(filePath) });
      res.end(fileContent); // envia o conteúdo do arquivo como resposta
    }
  } catch (error) {
    // Se o arquivo não for encontrado, retorna 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página não encontrada");
  }
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  // Inicia o servidor na porta
  console.log(`Servidor rodando na porta ${port}`);
});

function generateLoremIpsum(paragraphs) {
  const words = [
    // Palavras aleatórias para gerar o texto :D
    "Lorem",
    "ipsum",
    "dolor",
    "sit",
    "amet",
    "consectetur",
    "adipiscing",
    "elit",
    "sed",
    "do",
    "eiusmod",
    "tempor",
    "incididunt",
    "ut",
    "labore",
    "et",
    "dolore",
    "magna",
    "aliqua",
  ];

  const loremIpsumParagraphs = [];

  for (let i = 0; i < paragraphs; i++) {
    const paragraphLength = Math.floor(Math.random() * 20) + 3; // Gera parágrafos com 3 a 22 palavras aleatórias
    const paragraphWords = []; // Array para armazenar as palavras do parágrafo

    for (let j = 0; j < paragraphLength; j++) {
      const randomIndex = Math.floor(Math.random() * words.length); // Obtendo palavra aleatória
      paragraphWords.push(words[randomIndex]); // Adicionando a palavra ao parágrafo
    }

    const loremIpsumParagraph = paragraphWords.join(" ");
    loremIpsumParagraphs.push(loremIpsumParagraph); // Adicionando o parágrafo ao array de parágrafos
  }

  return loremIpsumParagraphs;
}

function getContentType(filePath) {
  const extname = path.extname(filePath); // Obtém a extensão do arquivo a partir do caminho

  // switch case para retornar o tipo de conteúdo a partir da extensão
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    default:
      return "application/octet-stream";
  }
}
