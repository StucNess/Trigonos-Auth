import CreateUserAppConfig from "./CreateUser/CreateUserAppConfig";
import EditUserAppConfig from "./EditUser/EditUserAppConfig";
import axios from "axios";
import CreateProfileAppConfig from "./CreateProfile/CreateProfileAppConfig";
let pagina = "";
axios
  .get("https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina")
  .then((response) => {
    pagina = response.data[0].nombrePagina;
  })
  .catch((error) => {});
console.log("AQUI--");
const AdministracionConfig = [
  CreateUserAppConfig,
  EditUserAppConfig,
  CreateProfileAppConfig,
];
export default AdministracionConfig;
