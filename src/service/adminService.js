const administradores = [
  {
    id: 1,
    nombre: "Mauro",
    user: "admin",
    password: "123",
    sector: "Soporte",
  },
  {
    id: 2,
    nombre: "Gabriel",
    user: "gabriel",
    password: "345",
    sector: "Gerencia",
  },
  {
    id: 3,
    nombre: "Erika",
    user: "erika",
    password: "234",
    sector: "Soporte",
  }
];

const login = (nombre, sector) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const encontrado = administradores.find(
        (admin) => admin.nombre.toLowerCase() === nombre.toLowerCase() && admin.sector === sector
      );

      if (encontrado) {
        resolve({
          id: encontrado.id,
          nombre: encontrado.nombre,
          sector: encontrado.sector,
        });
      } else {
        reject(new Error("El nombre o el sector no coinciden. Intente nuevamente."));
      }
    }, 800);
  });
};

export default { login };

