const express = require('express');
const app = express();
const axios = require('axios');
const { getCovidStatistics } = require('./api/covidAPI');

const port = 3000
app.listen(port, () => {
    console.log(`Servidor Express iniciado en el puerto ${3000}`);
  });

app.use(express.static('public'));


// Ruta GET para la página de inicio
app.get("/", async (req, res) => {
    try {
        const { countriesData, totalData } = await getCovidStatistics(); // Obtener los datos de getCovidStatistics
        // Ordenar la lista alfabéticamente por el nombre del país
        countriesData.sort((a, b) => a.country.localeCompare(b.country));
        // Pasar los datos ordenados y las estadísticas totales a la plantilla index.ejs
        res.render("index.ejs", { data: countriesData, totalData: totalData });
    } catch (error) {
        console.error('Error fetching COVID-19 statistics:', error);
        res.status(500).json({ error: 'Error fetching COVID-19 statistics' });
    }
});






