'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable('planilha', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NCM: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      DESCRICAO: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      CEST: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ALIQUOTA_IPI: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      CST_IPI:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      EX:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      CST_PIS_COFINS_ENTRADA:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      CST_PIS_COFINS_SAIDA:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      CODIGO_SPED:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      ALIQUOTA_PIS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      ALIQUOTA_COFINS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      CFOP:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      CST_CSOSN:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      AD_REM_ICMS:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      ALIQUOTA_ICMS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
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
        allowNull: false,
      },
      ALIQUOTA_RED_BASE_DE_CALCULO_ICMS:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      MVA:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      FCP:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      COD_BENEFICIO_FISCAL:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      ANTECIPADO:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      PERCENTUAL_DIFERIMENTO:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      PERCENTUAL_ISENCAO:{
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      CODIGO_ANP:{
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
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
    await queryInterface.dropTable('planilha');
  }
};
