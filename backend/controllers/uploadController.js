const { ProdutosFiscais } = require('../models');

async function uploadData(req, res) {
  try {
    const data = req.body;
    console.log('Data received:', data);

    const uniqueData = [];
    for (const item of data) {
      const existingRecord = await ProdutosFiscais.findOne({
        where: { NCM: item.NCM, CRT: item.CRT }
      });
      if (!existingRecord) {
        uniqueData.push(item);
      } else {
        console.log(`Duplicate NCM with CRT found: ${item.NCM}, ${item.CRT}`);
      }
    }

    console.log('Unique Data:', uniqueData);

    if (uniqueData.length > 0) {
      const result = await ProdutosFiscais.bulkCreate(uniqueData, { validate: true });
      console.log('Result:', result);
    } else {
      console.log('No new records to insert.');
    }

    res.json({
      message: 'Data received and saved successfully!',
      processedData: uniqueData,
    });
  } catch (error) {
    console.error('Error while processing data:', error);
    res.status(500).json({ message: 'Error while processing data' });
  }
}

module.exports = {
  uploadData,
};
