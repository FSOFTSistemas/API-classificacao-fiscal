const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize , ProdutosFiscais } = require('./models');
const { uploadData } = require('./controllers/uploadController');
const https = require('https');
const fs = require('fs');


const app = express();

app.use(cors({
  origin: 'https://localhost:5500',
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.post('/upload', uploadData);

sequelize
  .authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao conectar ao banco de dados:', err);
  });

app.get('/', (req, res) => {
  res.send('Back-end está funcionando!');
});

app.get('/api/produto/:codigo', async (req, res) => { // /api/produto/84831019?crt=01
  const codigo = req.params.codigo;
  const crt = req.query.crt;

  try {
    let produtoFiscal;

    if (crt !== '01' && crt !== '02' && crt !== '03') {
      return res.status(400).json({ message: 'CRT inválido. Deve ser 01, 02 ou 03.' });
    }

    if (/^\d{8}$/.test(codigo) && !codigo.startsWith('789')) {
      produtoFiscal = await ProdutosFiscais.findOne({ where: { NCM: codigo, CRT: crt } });
    } else if (/^789\d{5}$/.test(codigo) || /^789\d{10}$/.test(codigo)) {
      produtoFiscal = await ProdutosFiscais.findOne({ where: { GTIN: codigo, CRT: crt } });
    } else {
      return res.status(400).json({ message: 'Código inválido.' });
    }

    if (produtoFiscal) {
      res.json(produtoFiscal);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/gestao-api.dev.br/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/gestao-api.dev.br/fullchain.pem')
};

const PORT_HTTPS = 5501;

https.createServer(options, app).listen(PORT_HTTPS, () => {
  console.log(`Servidor HTTPS no ar na porta ${PORT_HTTPS}`);
});

// const PORT = 5501;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });
