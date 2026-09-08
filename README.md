# Trabajo práctico 03 - API de Instrumentos Musicales

## Descripción

Esta aplicación es una API HTTP desarrollada con Express que administra un catálogo de instrumentos musicales. Permite listar instrumentos, filtrarlos, buscar por detalle y crear nuevos recursos en memoria.

## Instalación

Para descargar las dependencias del proyecto, ejecuta:
\`\`\`bash
npm install
\`\`\`

## Ejecución

Para iniciar el servidor en el puerto 3000, utiliza el siguiente comando:
\`\`\`bash
npm start
\`\`\`
Para detener el servidor, debes presionar \`Ctrl + C\` en la terminal donde se está ejecutando.

## Endpoints

- **Bienvenida:** \`GET /\`
- **Listado de instrumentos:** \`GET /api/instrumentos\`
- **Filtro por familia:** \`GET /api/instrumentos?familia=cuerda\`
- **Detalle por ID:** \`GET /api/instrumentos/:id\`
- **Creación de instrumento:** \`POST /api/instrumentos\`

## Ejemplos de solicitudes

Para realizar una solicitud \`POST\` de creación, es necesario enviar el encabezado \`Content-Type: application/json\` y un cuerpo válido como este:
\`\`\`json
{
"nombre": "Piano de cola",
"familia": "Cuerda percutida",
"origen": "Italia",
"descripcion": "Instrumento musical de teclado y cuerdas percutidas.",
"disponible": false
}
\`\`\`

## Códigos de estado

- **200 (OK):** Utilizado cuando una solicitud de lectura (GET) se resuelve con éxito.
- **201 (Created):** Utilizado en el POST cuando el recurso se crea correctamente en la colección.
- **400 (Bad Request):** Utilizado en el POST cuando faltan datos obligatorios en el cuerpo enviado por el cliente.
- **404 (Not Found):** Utilizado en el GET por ID cuando el instrumento solicitado no existe en la colección.

## Persistencia de los datos

**¿Por qué las creaciones desaparecen al reiniciar?**
Cuando el servidor inicia, carga los datos del archivo \`instrumentos.json\` en un arreglo en memoria. El método POST (mediante \`push\`) agrega el nuevo instrumento _solamente a ese arreglo en memoria_, no sobrescribe el archivo original. Al reiniciar el servidor, la memoria se limpia, se vuelve a leer el archivo original y los instrumentos creados se pierden.

---

### Conceptos adicionales

- **¿Qué diferencia existe entre un parámetro de ruta y uno de consulta?**
  El parámetro de ruta (como \`:id\`) se utiliza para identificar un recurso único y específico (ej: buscar el instrumento 3). La consulta (o \`query\`, como \`?familia=viento\`) se utiliza para filtrar o modificar la forma en que se devuelve una colección completa.

- **¿Qué función cumple express.json()?**
  Actúa como un middleware que permite a la aplicación leer, analizar e interpretar el cuerpo (\`body\`) de las solicitudes HTTP que vienen en formato JSON (como en el POST), exponiendo esos datos en \`req.body\`.
