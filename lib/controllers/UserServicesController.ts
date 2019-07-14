import { Request, Response } from "express";
import {UserServicesRepository} from "../repositories/UserServicesRepository";
import {UserServices} from "../entity/UserServices";

export class UserServicesController {
    public getAllUserServices = async (req: Request, res: Response) => {
        let userservicesrepository: UserServicesRepository = new UserServicesRepository();
    
        console.log("Received GetAllSgetAllUserServices ==> GET");
        const start = req.query.start;
        const lenghts = req.query.length;
        const orderName = req.query.orderName;
        const orderStatus = req.query.orderStatus;
        userservicesrepository.getAllUserServices(start,lenghts,orderName,orderStatus).then((result: any) => {
            const respon = {
                draw:req.body.draw ? req.body.draw : parseInt(req.query.draw),
                recordsTotal:result.total,
                recordsFiltered:result.total,
                data:result.data
            }
            res.send(respon );
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    
    
    }

    public saveUserServices = async (req: Request, res: Response) => {
        let userservicesrepository: UserServicesRepository = new UserServicesRepository();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: UserServices =  new UserServices();
        emp.name = req.body.name;
        emp.description = req.body.description;
        emp.status = req.body.status ;
        emp.services = req.body.services ;
        emp.dateRegister = req.body.dateRegister ;
        emp.dateExpires = req.body.dateExpires ;
        emp.dateRemind = req.body.dateRemind ;
        emp.clients = req.body.clients ;
        
        if(req.body.id){
            emp.id = parseInt(req.body.id) ; 
        }

    
        userservicesrepository.saveUserServices(emp).then((result: any) => {
            console.log("result",result);
            res.send(result);
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    }

    public deleteUserServices = async (req: Request, res: Response) => {
        let Userservicesrepository: UserServicesRepository = new UserServicesRepository();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: UserServices =  new UserServices();
        if(req.body.id){
            emp.id = parseInt(req.body.id) ; 
        }
  
        Userservicesrepository.deleteUserServices(emp).then((result: any) => {
            res.send(result);
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    }

    
    
}
