const API_URL = 'https://fakestoreapi.com/users';

const apiService = {
  obtenerClientesAPI: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error al conectar con el servidor: ${response.status}`);
    return await response.json();
  },

  agregarClienteAPI: async (nuevoCliente) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    });
    if (!response.ok) throw new Error('No se pudo guardar el cliente en el servidor.');
    return await response.json();
  },

  eliminarClienteAPI: async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('No se pudo eliminar el cliente del servidor.');
    return await response.json();
  }
};

export default apiService;