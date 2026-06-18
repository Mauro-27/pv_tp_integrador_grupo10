const administradores = [
  {
    id: 1,
    nombre: "Mauro",
    user: "admin", //funciona con Admin
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

const login = (user, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const encontrado = administradores.find(
        (admin) => admin.user.toLowerCase() === user.toLowerCase() && admin.password === password
      );

      if (encontrado) {
        resolve({
          id: encontrado.id,
          nombre: encontrado.nombre,
          sector: encontrado.sector,
        });
      } else {
        reject(new Error("El usuario o la contraseña no coinciden. Intente nuevamente."));
      }
    }, 800);
  });
};

export default { login };
