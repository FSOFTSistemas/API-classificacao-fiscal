const { ProdutosFiscais } = require('../models');
const { Op } = require('sequelize');


async function uploadData(req, res) {
  try {
    const data = req.body;
    console.log('Data received:', data);

    const ncmCrtPares = data.map(item => ({
      NCM: item.NCM,
      CRT: item.CRT,
    }));

    const registroExistente = await ProdutosFiscais.findAll({
      where: {
        [Op.or]: ncmCrtPares,
      },
    });

    const conjuntoExistente = new Set(
      registroExistente.map(record => `${record.NCM}-${record.CRT}`)
    );

    const uniqueData = data.filter(
      item => !conjuntoExistente.has(`${item.NCM}-${item.CRT}`)
    );

    console.log('Unique Data:', uniqueData);

    if (uniqueData.length > 0) {
      const result = await ProdutosFiscais.bulkCreate(uniqueData, { validate: true });
      console.log('Result:', result);
    } else {
      console.log('Sem novos registros para inserir');
    }

    res.json({
      message: 'Data received and saved successfully!',
      processedData: uniqueData,
    });
  } catch (error) {
    console.error('Error while processing data:', error.message, error.stack);
    res.status(500).json({ message: 'Error while processing data' });
  }
}

module.exports = {
  uploadData,
};
