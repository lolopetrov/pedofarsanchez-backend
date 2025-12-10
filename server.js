const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "pedos.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ contador: 7 }));
}

function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}

// ✅ CONTADOR
app.get("/api/contador", (req, res) => {
  const data = loadData();
  res.json({ contador: data.contador });
});

// ✅ SUMAR SIN EMAIL
app.post("/api/pedo", (req, res) => {
  const data = loadData();
  data.contador += 1;
  saveData(data);
  res.json({ ok: true, contador: data.contador });
});

// ✅ PUERTO RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor Pedo activo en puerto", PORT));
