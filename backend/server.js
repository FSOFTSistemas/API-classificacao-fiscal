const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(bodyParser.json());
app.post('https://localhost:5000/upload', async (req, res) => {
  try {
    const data = req.body;
    console.log('Data received:', data);
    res.json({ message: 'Data received successfully!' });
  } catch (error) {
    console.error('Error while receiving data:', error);
    res.status(500).json({ message: 'Error while receiving data' });
  }
});
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});