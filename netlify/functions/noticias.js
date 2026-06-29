exports.handler = async function(event, context) {
  // Atrapamos los parámetros que envíe Angular (ej. country, category, page)
  const queryString = event.rawQuery ? `?${event.rawQuery}` : '';
  const path = event.path.replace('/api/news', '');

  const apiKey = '1fcff3ee17a147fdbfb249871d59953f'; // Tu llave va segura en el servidor
  const url = `https://newsapi.org/v2${path}${queryString}&apiKey=${apiKey}`;

  try {
    // El servidor hace la petición, evitando el CORS del navegador
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Le damos permiso a tu app web
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' })
    };
  }
}
