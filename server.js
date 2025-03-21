const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");
const fs = require("fs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/gestao-api.dev.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/gestao-api.dev.br/fullchain.pem')
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(5500, (err) => {
    if (err) throw err;
    console.log("Servidor HTTPS rodando em https://localhost:5500");
  });
});
