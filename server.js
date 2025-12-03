const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const DATA_FILE = "pedos.json";

// Crear archivo inicial si no existe
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ contador: 0, emails: [] }));
}

function loadData() {
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}

// Validar email real
function emailValido(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// Obtener contador global
app.get("/api/contador", (req, res) => {
  const data = loadData();
  res.json({ contador: data.contador });
});

// Registrar un email
app.post("/api/pedo", (req, res) => {
  const email = req.body.email;

  if (!emailValido(email)) {
    return res.status(400).json({ error: "Email no válido" });
  }

  const data = loadData();

  if (data.emails.includes(email)) {
    return res.status(400).json({ error: "Ese email ya participó" });
  }

  data.emails.push(email);
  data.contador += 1;

  saveData(data);

  res.json({ ok: true, contador: data.contador });
});

app.listen(3000, () => console.log("Servidor Pedo activo en puerto 3000"));
