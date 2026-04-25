"use server";

import fs from "fs";
import path from "path";

// Archivo donde guardaremos los datos de Anxo en el servidor
const dataFilePath = path.join(process.cwd(), "anxo_data.json");

export async function loadAnxoData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(fileData);
    }
  } catch (error) {
    console.error("Erro ao ler os datos de Anxo:", error);
  }
  return null;
}

export async function saveAnxoData(menu: any, marcados: string[]) {
  try {
    const dataToSave = JSON.stringify({ menu, marcados });
    fs.writeFileSync(dataFilePath, dataToSave, "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Erro ao gardar os datos de Anxo:", error);
    return { success: false };
  }
}
