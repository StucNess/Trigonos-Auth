import CreateUserAppConfig from "./CreateUser/CreateUserAppConfig";
import EditUserAppConfig from "./EditUser/EditUserAppConfig";
import axios from 'axios';
import CreateProfileAppConfig from "./CreateProfile/CreateProfileAppConfig";

axios
.get("https://trigonosapi.azurewebsites.net/api/Rol/listarRolPagina")
.then((response) => {
  console.log(response.data[0].nombreRol);
  

})
.catch((error) => {
   
});
console.log('AQUI--')
const AdministracionConfig = [CreateUserAppConfig,EditUserAppConfig,CreateProfileAppConfig];
export default AdministracionConfig;
