const fs = require('fs');
const path = require('path');

// Leer el archivo JSON
const dbPath = path.join(__dirname, 'db', 'db.json');
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Función para generar número aleatorio de huéspedes (entre 1 y 10)
function getRandomGuests() {
    return Math.floor(Math.random() * 10) + 1;
}

// Agregar campo guests a objetos que no lo tienen
data.forEach(property => {
    if (!property.hasOwnProperty('guests')) {
        property.guests = getRandomGuests();
    }
});

// Escribir el archivo actualizado
fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));

console.log('✅ Campo "guests" agregado a todas las propiedades');
console.log(`Total de propiedades procesadas: ${data.length}`);
