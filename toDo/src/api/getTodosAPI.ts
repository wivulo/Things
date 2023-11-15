//Function to get all todos from the API, http function in ../uutil/http.ts
// Returns a promise of type Todo[]

import { httpGet } from "../util/http";
import { iData } from "../interfaces";

export const getTodosAPI = (): Promise<iData[]> => {
  return new Promise(async (resolve, reject) => {
     try{
      let res = await httpGet("./data.json")
     
      if (res) {
         let todos: iData[] = JSON.parse(res);
         resolve(todos);
      } else {
         reject("Error getting todos");
      }
     } catch (err) {
        //alert(`Error, in getTodosAPI: ${err}`);
        reject(err);
     }
   });
}
