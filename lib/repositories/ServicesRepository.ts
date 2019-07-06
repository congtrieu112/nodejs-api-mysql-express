import { getManager } from "typeorm";
import {Services} from "../entity/Services";
export class ServicesRepository {

    async getAllServices(start:number,length:number,orderName:string,orderStatus:string) {
        const starts = Math.ceil(start/length); 
        const order = {}
        const total = await  getManager().getRepository(Services).find();
        const option = {
            order,skip:starts,take:length
        };
        option.order[orderName] = orderStatus.toUpperCase();
        const data = await getManager().getRepository(Services).find(option);
        const result = {
            total : total.length,
            data :data 
        }
        return result;

    }

    saveServices(services: Services) { 
        return getManager().getRepository(Services).save(services);
    }

    deleteServices(services: Services) { 
        return getManager().getRepository(Services).delete(services);
    }

}