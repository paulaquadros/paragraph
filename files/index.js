import { createServer } from "http";
import { readdir } from "fs";
import { createLink } from "./utils.js";
import { config } from "dotenv";

config();

const PORT = process.env.PORT || 3333;

const folder = process.argv[2];

const server = createServer((req, res) => {
  if (req.url == "/") {
    readdir(folder, (err, files) => {
      if (err) {
        console.log(`Erro: ${err}`);
      } else {
        res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
        files.forEach((file) => res.write(`${createLink(file)}`));
        res.end();
      }
    });
  } else if (req.url.startsWith("/file/")) {
    const fileName = req.url.substring(6);
    const filePath = `${folder}/${fileName}`;
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write(`Conteúdo do arquivo "${fileName}":\n\n`);
    const fileStream = createReadStream(filePath);
    fileStream.pipe(res);
    res.write("\n\n");
    res.write(`<a href="/">Voltar</a>`);
    fileStream.on("end", () => res.end());
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Página não encontrada");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
