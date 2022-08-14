import { config, token, url } from "../CreateTecnology";
import axios from "axios";

export function RequestTechs() {

    axios
      .get(url + "profile", config)
      .then(function (response) {
        const data = response.data.techs;
        localStorage.setItem("@Techs", JSON.stringify(data));
    })
    .catch(function (error) {
        console.log(error);
    })
    
}
