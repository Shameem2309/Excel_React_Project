import * as XLSX from 'xlsx';

const readExcelFile = async (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Assuming your Excel has headers, modify this accordingly if your data has no headers
      const headers = Array.isArray(jsonData[0]) ? jsonData[0] : [];
      const formattedData = jsonData.slice(1).map((row: any) => {
        const formattedRow: any = {};
        headers.forEach((header: any, index: number) => {
          formattedRow[header] = row[index];
        });
        return formattedRow;
      });

      resolve(formattedData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsBinaryString(file);
  });
};

export { readExcelFile };
