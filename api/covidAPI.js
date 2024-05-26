const axios = require('axios');

const getCovidStatistics = async () => {
    try {
        const response = await axios.get('https://covid-193.p.rapidapi.com/statistics', {
            headers: {
                'X-RapidAPI-Key': 'd424b724famsh23365f93ce39262p1bfc77jsna608dc5dc945',
                'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
            }
        });

        const countriesData = response.data.response.filter(country => country.country !== 'All'); // Filtrar las estadísticas totales
        const totalData = response.data.response.find(country => country.country === 'All'); // Obtener las estadísticas totales

        return { countriesData, totalData };
    } catch (error) {
        console.error('Error fetching COVID-19 statistics:', error);
        return { error: 'Error fetching COVID-19 statistics' };
    }
};

module.exports = {
    getCovidStatistics,
};
