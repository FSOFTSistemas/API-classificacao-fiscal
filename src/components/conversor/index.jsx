import { useState } from "react";
import * as XLSX from "xlsx";

export default function Conversor() {
  const [jsonData, setJsonData] = useState(null);
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
        CST_CSOSN: row[13] || "",
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
      }));

      setJsonData(formattedData);
      sendDataToBackend(formattedData);
    };
    reader.readAsArrayBuffer(file);
  };

  const sendDataToBackend = async (data) => {
    try {
      const response = await fetch("https://localhost:5000/upload", {
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
    }
  };

  const clearData = () => {
    setJsonData(null);
  };

  return (
    <div className="p-4 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Conversor XLSX para JSON</h1>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        className="mb-4"
      />
      {jsonData && (
        <>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto">
            {JSON.stringify(jsonData, null, 2)}
          </pre>
          <button
            onClick={clearData}
            className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4"
          >
            Limpar Dados
          </button>
        </>
      )}
    </div>
  );
}
