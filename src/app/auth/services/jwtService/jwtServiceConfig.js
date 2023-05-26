const jwtServiceConfig = {
  signIn: " http://localhost:5205/api/Usuarios/Login",
  signUp: " http://localhost:5205/api/Usuarios/Registrar",
  addProyects: " http://localhost:5205/api/Usuarios/AsignarProyecto",
  accessToken: " http://localhost:5205/api/Usuarios",
  editUser: "http://localhost:5205/api/Usuarios/actualizar/",
  addCompany: " http://localhost:5205/api/Empresas/Agregar",
  addNewRol: " http://localhost:5205/api/Rol/Agregar",
  updateUser: "api/auth/user/update",
};

export default jwtServiceConfig;
