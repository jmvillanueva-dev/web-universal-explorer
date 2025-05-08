const API_KEY = '8omTV7cYbcqcCb6rd04qTTig8oACpIY4kqU4PdZJ'; // En producción, usa una variable de entorno

export async function fetchRandomAPOD(count = 6) {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&count=${count}`);
  if (!response.ok) throw new Error('Error al obtener datos');
  return response.json();
}

export async function fetchAPODByDate(date) {
  const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&date=${date}`);
  if (!response.ok) throw new Error('Error al obtener datos');
  return response.json();
}

export async function fetchTodaysAPOD() {
  const today = new Date().toISOString().split('T')[0];
  return fetchAPODByDate(today);
}