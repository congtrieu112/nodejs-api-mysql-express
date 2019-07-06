import { getManager } from "typeorm";
import { UserServices } from "../entity/UserServices";
export class UserServicesRepository {

    async getAllUserServices(start:number,length:number,orderName:string,orderStatus:string) {
        const starts = Math.ceil(start/length); 
        const order = {}
        const total = await  getManager().getRepository(UserServices).find();
        const option = {
            order,skip:starts,take:length
        };
        option.order[orderName] = orderStatus.toUpperCase();
        // const data = await getManager().getRepository(UserServices).find(option);
        const data = await  getManager()
        .createQueryBuilder(UserServices, "UserServices")
        .leftJoinAndSelect("UserServices.clients","clients")
        .leftJoinAndSelect("UserServices.services","services")
        .getMany()
        .then(data=>{
            console.log('dataQuery',data)
            return data;
        })
        const result = {
            total : total.length,
            data :data 
        }
        return result;

    }

    saveUserServices(userservices: UserServices) { 
          return getManager().getRepository(UserServices).save(userservices);
    }

    deleteUserServices(userservices: UserServices) { 
        return getManager().getRepository(UserServices).delete(userservices);
    }

}