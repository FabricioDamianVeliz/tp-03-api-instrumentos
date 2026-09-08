const express = require('express');
const path = require('node:path');
const { leerInstrumentos } = require('./archivos.js');

const PORT = 3000;
const rutaDatos = path.join(__dirname, '..', 'datos', 'instrumentos.json');

async function main() {
    try {
        // 1. Cargar datos iniciales antes de iniciar el servidor
        const instrumentos = await leerInstrumentos(rutaDatos);
        
        const app = express();
        
        // Middleware necesario para leer el cuerpo JSON en POST
        app.use(express.json());

        // 2. Bienvenida
        app.get('/', (req, res) => {
            res.status(200).json({ mensaje: "¡Bienvenido a la API de Instrumentos Musicales!" });
        });

        // 3 y 4. Listado y filtro opcional por familia
        app.get('/api/instrumentos', (req, res) => {
            const familia = req.query.familia;
            
            if (!familia) {
                return res.status(200).json(instrumentos);
            }

            const resultado = instrumentos.filter(
                (inst) => inst.familia.toLowerCase() === String(familia).toLowerCase()
            );
            
            res.status(200).json(resultado);
        });

        // 5. Detalle de un instrumento por id
        app.get('/api/instrumentos/:id', (req, res) => {
            const id = Number(req.params.id);
            const instrumento = instrumentos.find((inst) => inst.id === id);

            if (!instrumento) {
                return res.status(404).json({ error: "Instrumento no encontrado" });
            }
            
            res.status(200).json(instrumento);
        });

        // 6. Creación en memoria
        app.post('/api/instrumentos', (req, res) => {
            const { nombre, familia, origen, descripcion, disponible } = req.body;

            // Validación estricta (disponible se valida contra undefined porque false es válido)
            if (!nombre || !familia || !origen || !descripcion || disponible === undefined) {
                return res.status(400).json({ 
                    error: "Los campos nombre, familia, origen, descripcion y disponible son obligatorios." 
                });
            }

            const ultimoId = instrumentos.length === 0 ? 0 : instrumentos[instrumentos.length - 1].id;
            
            const nuevoInstrumento = {
                id: ultimoId + 1,
                nombre,
                familia,
                origen,
                descripcion,
                disponible
            };

            instrumentos.push(nuevoInstrumento);
            res.status(201).json(nuevoInstrumento);
        });

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor de instrumentos escuchando en http://localhost:${PORT}`);
        });

    } catch (error) {
        // Informar error si falla la lectura del archivo
        console.error("No se pudo iniciar el servidor:", error.message);
        process.exitCode = 1;
    }
}

main();