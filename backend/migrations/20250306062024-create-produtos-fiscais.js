'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('ProdutosFiscais', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NCM: {
        type: Sequelize.STRING,
        allowNull: false, //
      },
      DESCRICAO: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      CEST: {
        type: Sequelize.STRING,
        allowNull: false, //
      },
      ALIQUOTA_IPI: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      CST_IPI:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      EX:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CST_PIS_COFINS_ENTRADA:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CST_PIS_COFINS_SAIDA:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CODIGO_SPED:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      ALIQUOTA_PIS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      ALIQUOTA_COFINS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      CFOP:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CST_CSOSN:{
        type: Sequelize.STRING,
        allowNull: true, 
      },
      AD_REM_ICMS:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      ALIQUOTA_ICMS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false, //
      },
      RED_BASE_DE_CALCULO_ICMS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      RED_BASE_DE_CALCULO_ICMS_ST:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      ALIQUOTA_ICMS_ST:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      ALIQUOTA_RED_BASE_DE_CALCULO_ICMS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      MVA:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      FCP:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      COD_BENEFICIO_FISCAL:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      ANTECIPADO:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      PERCENTUAL_DIFERIMENTO:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      PERCENTUAL_ISENCAO:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      CODIGO_ANP:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CRT:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      GTIN:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      PRODUTO:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     * 
     */
    await queryInterface.dropTable('ProdutosFiscais');
  }
};
