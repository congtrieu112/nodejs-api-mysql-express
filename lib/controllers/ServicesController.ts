import { Request, Response } from "express";
import {ServicesRepository} from "../repositories/ServicesRepository";
import {Services} from "../entity/Services";

export class ServicesController {
    public getAllServices = async (req: Request, res: Response) => {
        let servicesrepository: ServicesRepository = new ServicesRepository();
    
        console.log("Received GetAllSgetAllServices ==> GET");
        const start = req.query.start;
        const lenghts = req.query.length;
        const orderName = req.query.orderName;
        const orderStatus = req.query.orderStatus;
        servicesrepository.getAllServices(start,lenghts,orderName,orderStatus).then((result: any) => {
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

    public saveServices = async (req: Request, res: Response) => {
        let servicesrepository: ServicesRepository = new ServicesRepository();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: Services =  new Services();
        emp.name = req.body.name;
        emp.description = req.body.description;
        emp.status = req.body.status ;

        if(req.body.id){
            emp.id = parseInt(req.body.id) ; 
        }

    
        servicesrepository.saveServices(emp).then((result: any) => {
            console.log("result",result);
            res.send(result);
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    }

    public deleteServices = async (req: Request, res: Response) => {
        let servicesrepository: ServicesRepository = new ServicesRepository();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: Services =  new Services();
        if(req.body.id){
            emp.id = parseInt(req.body.id) ; 
        }
  
        servicesrepository.deleteServices(emp).then((result: any) => {
            res.send(result);
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    }

    
    
}
