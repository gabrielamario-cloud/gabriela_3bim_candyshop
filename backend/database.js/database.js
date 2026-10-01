const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const caminhosEnv = [
    path.resolve(__dirname, '..', '..', '.env'),
    path.resolve(__dirname, '..', '.env', 'env.txt'),
    path.resolve(__dirname, '..', '.env')
];

const envPath = caminhosEnv.find((caminho) => fs.existsSync(caminho));
if (envPath) {
    require('dotenv').config({ path: envPath });
} else {
    require('dotenv').config();
}

// Lista de variáveis obrigatórias
const variaveisObrigatorias = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];

for (const variavel of variaveisObrigatorias) {
    if (!process.env[variavel]) {
        throw new Error(`❌ A variável de ambiente '${variavel}' não está definida no arquivo .env`);
    }
}

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};