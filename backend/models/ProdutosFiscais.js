const { loadGetInitialProps } = require("next/dist/shared/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const ProdutosFiscais = sequelize.define('ProdutosFiscais', {
    NCM: { type: DataTypes.STRING },
    DESCRICAO: { type: DataTypes.STRING },
    CEST: { type: DataTypes.STRING },
    ALIQUOTA_IPI: { type: DataTypes.STRING },
    CST_IPI: { type: DataTypes.STRING },
    EX: { type: DataTypes.STRING },
    CST_PIS_COFINS_ENTRADA: { type: DataTypes.STRING },
    CST_PIS_COFINS_SAIDA: { type: DataTypes.STRING },
    CODIGO_SPED: { type: DataTypes.STRING },
    ALIQUOTA_PIS: { type: DataTypes.STRING },
    ALIQUOTA_COFINS: { type: DataTypes.STRING },
    CFOP: { type: DataTypes.STRING },
    CST_CSOSN: { type: DataTypes.STRING },
    AD_REM_ICMS: { type: DataTypes.STRING },
    ALIQUOTA_ICMS: { type: DataTypes.STRING },
    RED_BASE_DE_CALCULO_ICMS: { type: DataTypes.STRING },
    RED_BASE_DE_CALCULO_ICMS_ST: { type: DataTypes.STRING },
    ALIQUOTA_ICMS_ST: { type: DataTypes.STRING },
    ALIQUOTA_RED_BASE_DE_CALCULO_ICMS: { type: DataTypes.STRING },
    MVA: { type: DataTypes.STRING },
    FCP: { type: DataTypes.STRING },
    COD_BENEFICIO_FISCAL: { type: DataTypes.STRING },
    ANTECIPADO: { type: DataTypes.STRING },
    PERCENTUAL_DIFERIMENTO: { type: DataTypes.STRING },
    PERCENTUAL_ISENCAO: { type: DataTypes.STRING },
    CODIGO_ANP: { type: DataTypes.STRING },
    CRT: { type: DataTypes.STRING },
    GTIN: { type: DataTypes.STRING },
    PRODUTO: { type: DataTypes.STRING },
  }, {
    tableName: 'produtosfiscais',
    timestamps: true,
  });

  return ProdutosFiscais;
};
