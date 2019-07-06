import { getManager } from "typeorm";
import {Clients} from "../entity/Clients";
export class ClientsRepository {
    async getAllClients(start:number,length:number,orderName:string,orderStatus:string) {
        const starts = Math.ceil(start/length); 
        const order = {}
        const total = await  getManager().getRepository(Clients).find();
        const option = {
            order,skip:starts,take:length
        };
        option.order[orderName] = orderStatus.toUpperCase();
        const data = await getManager().getRepository(Clients).find(option);
        const result = {
            total : total.length,
            data :data 
        }
        return result;

    }

    saveClients(clients: Clients) { 
          return getManager().getRepository(Clients).save(clients);
    }

    deleteClients(clients: Clients) { 
        return getManager().getRepository(Clients).delete(clients);
    }

}