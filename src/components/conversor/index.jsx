import { useState } from "react";
import * as XLSX from "xlsx";
import styles from "./styles.module.css";

export default function Conversor() {
  const [jsonData, setJsonData] = useState(null);
  const [crtValue, setCrtValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = "NCMs_ENCONTRADOS";
      const sheet = workbook.Sheets[sheetName];

      if (!sheet) {
        alert(`A aba '${sheetName}' não foi encontrada no arquivo.`);
        return;
      }
      const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 }).slice(6);
      const formattedData = rawData.map((row) => ({
        NCM: row[0] ? row[0].replace(/\./g, "") : "",
        DESCRICAO: row[1] || "",
        CEST: row[2] || "",
        ALIQUOTA_IPI: row[3] ? row[3].replace(",", ".") : "",
        CST_IPI: row[4] || "",
        EX: row[5] || "",
        CST_PIS_COFINS_ENTRADA: row[6] || "",
        CST_PIS_COFINS_SAIDA: row[7] || "",
        CODIGO_SPED: row[8] || "",
        ALIQUOTA_PIS: row[9] ? row[9].replace(",", ".") : "",
        ALIQUOTA_COFINS: row[10] ? row[10].replace(",", ".") : "",
        CFOP: row[12] ? row[12].slice(-4) : "",
        CST_CSOSN:
          crtValue !== "01" ? (row[13] ? "0" + row[13] : "") : row[13] || "",
        AD_REM_ICMS: row[14] || "",
        ALIQUOTA_ICMS: row[15] ? row[15].replace(",", ".") : "",
        RED_BASE_DE_CALCULO_ICMS: row[16] ? row[16].replace(",", ".") : "",
        RED_BASE_DE_CALCULO_ICMS_ST: row[17] ? row[17].replace(",", ".") : "",
        ALIQUOTA_ICMS_ST: row[18] ? row[18].replace(",", ".") : "",
        ALIQUOTA_RED_BASE_DE_CALCULO_ICMS: row[19]
          ? row[19].replace(",", ".")
          : "",
        MVA: row[20] ? row[20].replace(",", ".") : "",
        FCP: row[21] ? row[21].replace(",", ".") : "",
        COD_BENEFICIO_FISCAL: row[22] || "",
        ANTECIPADO: row[23] || "",
        PERCENTUAL_DIFERIMENTO: row[24] ? row[24].replace(",", ".") : "",
        PERCENTUAL_ISENCAO: row[25] ? row[25].replace(",", ".") : "",
        CODIGO_ANP: row[26] || "",
        CRT: crtValue,
      }));

      setJsonData(formattedData);
      const tamanhoEmMB = (
        JSON.stringify(formattedData).length /
        (1024 * 1024)
      ).toFixed(2);
      console.log(`Tamanho do JSON: ${tamanhoEmMB} MB`);
      sendDataToBackend(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const sendDataToBackend = async (data) => {
    setLoading(true)
    try {
      console.log(data);
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      alert("Dados enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados. Verifique o console para mais detalhes.");
    } finally {
      setLoading(false)
    }
  };

  const clearData = () => {
    setJsonData(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload de Produtos</h1>
      <p className={styles.radioTitle}>Selecione o regime tributário:</p>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="crt"
            value="01"
            onChange={(e) => setCrtValue(e.target.value)}
            required
            className={styles.radioInput}
          />
          Simples Nacional
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="crt"
            value="02"
            onChange={(e) => setCrtValue(e.target.value)}
            required
            className={styles.radioInput}
          />
          Lucro Presumido
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="crt"
            value="03"
            onChange={(e) => setCrtValue(e.target.value)}
            required
            className={styles.radioInput}
          />
          Lucro Real
        </label>
      </div>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={!crtValue}
        className={styles.fileInput}
      />
      {loading && <div className={styles.loader}></div>}
      {jsonData && (
        <>
          <button onClick={clearData} className={styles.clearButton}>
            Limpar Dados
          </button>
          <pre className={styles.jsonOutput}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
