const jwtServiceConfig = {
  signIn: "https://trigonosapi.azurewebsites.net/api/Usuarios/Login",
  signUp: "https://trigonosapi.azurewebsites.net/api/Usuarios/Registrar",
  addProyects: "https://trigonosapi.azurewebsites.net/api/Usuarios/AsignarProyecto",
  accessToken: "https://trigonosapi.azurewebsites.net/api/Usuarios",
  addCompany: "http://localhost:5205/Empresas/Agregar",
  addNewRol: "http://localhost:5205/Rol/Agregar",
  updateUser: "api/auth/user/update",
};

export default jwtServiceConfig;
