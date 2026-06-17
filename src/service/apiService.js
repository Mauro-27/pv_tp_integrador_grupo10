const API_URL = 'https://fakestoreapi.com/users';

const apiService = {
  obtenerClientesAPI: async () => {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error al conectar con el servidor: ${response.status}`);
      }
      
      const usuarios = await response.json();
      return usuarios;

      //PARA EL LOGIN
        // const encontrado = usuarios.find(
        //     u => u.user === user && u.password === password
        // );

        // return{
        //     id:encontrado.id,
        //     nombre:encontrado.name.firstname,
        //     apellido:encontrado.name.lastname,
        // }; 
  }
};

export default apiService;