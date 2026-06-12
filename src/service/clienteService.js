export const clienteService = (() => {
  const clientesPorDefecto = [
    {
        id: 1,
        Nombre: "Campos Mauro",
        Email: "Mauro@gmail.com",
        Telefono: "3884556115",
        Ciudad: "San Salvador de Jujuy",
        disponibilidad: true
    },
    {
        id: 2,
        Nombre: "Chauque Gabriel",
        Email: "Gabriel@gmail.com",
        Telefono: "3886830884",
        Ciudad: "San Salvador de Jujuy",
        disponibilidad: true
    },
   {
        id: 3,
        Nombre: "Rocha Erika",
        Email: "Erika@gmail.com",
        Telefono: "3884567536",
        Ciudad: "San Salvador de Jujuy",
        disponibilidad: true
    }
  ];

  const clientesGuardados = localStorage.getItem('clientes_data');
  let clientes = clientesGuardados ? JSON.parse(clientesGuardados) : clientesPorDefecto;

  const guardarEnStorage = () => {
    localStorage.setItem('clientes_data', JSON.stringify(clientes));
  };

  const obtenerClientes = () => {
    return clientes.filter((c) => c.disponibilidad === true);
  };

  const agregarCliente = (nuevoCliente) => {
    const nuevoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    clientes.push({ ...nuevoCliente, id: nuevoId, disponibilidad: true });
    
    guardarEnStorage(); 
  };

  const eliminarCliente = (id) => {
    clientes = clientes.map((c) => {
      if (c.id === id) {
        return { ...c, disponibilidad: false };
      }
      return c;
    });
    
    guardarEnStorage(); 
  };

  const buscarCliente = (texto) => {
    return clientes.filter((c) => 
      c.disponibilidad === true && 
      c.Nombre.toLowerCase().includes(texto.toLowerCase())
    );
  };

  const obtenerClientePorId = (id) => {
    return clientes.find((c) => c.id === parseInt(id));
  };

  return {
    obtenerClientes, 
    agregarCliente,
    eliminarCliente,
    buscarCliente,
    obtenerClientePorId
  };
})();