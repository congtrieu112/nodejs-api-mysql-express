import { Request, Response } from "express";
import {ClientsRepository} from "../repositories/ClientsRepository";
import {Clients} from "../entity/Clients";
import {generate} from "password-hash";
export class ClientsController {
    public getAllClients = async (req: Request, res: Response) => {
        let cliensrepository: ClientsRepository = new ClientsRepository();
    
        console.log("Received GetAllClients ==> GET");
        const start = req.query.start;
        const lenghts = req.query.length;
        const orderName = req.query.orderName;
        const orderStatus = req.query.orderStatus;
        cliensrepository.getAllClients(start,lenghts,orderName,orderStatus).then((result: any) => {
            const respon = {
                draw:req.body.draw ? req.body.draw : parseInt(req.query.draw) ,
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

    public saveClients = async (req: Request, res: Response) => {
        let cliensrepository: ClientsRepository = new ClientsRepository();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: Clients =  new Clients();
        emp.fullname = req.body.fullname;
        emp.username = req.body.username;
        emp.email = req.body.email;
        emp.phone = req.body.phone;
        emp.description = req.body.description;
        emp.password = req.body.password ? generate(req.body.password) : req.body.password;
        emp.status = req.body.status ;
        emp.birthday = req.body.birthday;
        if(req.body.id){
            emp.id = parseInt(req.body.id) ; 
        }

    
        cliensrepository.saveClients(emp).then((result: any) => {
            res.send(result);
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    }

    public deleteClients = async (req: Request, res: Response) => {
        let cliensrepository: ClientsRepository = new ClientsRepository();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: Clients =  new Clients();
        if(req.body.id){
            emp.id = parseInt(req.body.id) ; 
        }
  
        cliensrepository.deleteClients(emp).then((result: any) => {
            res.send(result);
        })
        .catch(error=>{
            console.log("error",error);
            res.send(error);
        })
    }

    
    
}
