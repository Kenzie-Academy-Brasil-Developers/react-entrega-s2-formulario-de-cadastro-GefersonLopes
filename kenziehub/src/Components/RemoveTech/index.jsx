import axios from "axios";
import { token, url } from "../CreateTecnology";

export function RemoveTech(tech) {

  axios({
    method: "delete",
    url: url + "users/techs/" + tech,
    headers: { Authorization: `Bearer ${token}` }
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}
