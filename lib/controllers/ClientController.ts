import { Request, Response } from "express";
import {ClientRepo} from "../repositories/client-repository";
import {Clients} from "../entity/Clients";

export class ClientController {
    public getAllClients = async (req: Request, res: Response) => {
        let clientRepo: ClientRepo = new ClientRepo();
    
        console.log("Received GetAllClients ==> GET");
        const start = req.query.start;
        const lenghts = req.query.length;
        const orderName = req.query.orderName;
        const orderStatus = req.query.orderStatus;
        clientRepo.getAllClients(start,lenghts,orderName,orderStatus).then((result: any) => {
            const respon = {
                draw:req.body.draw ? req.body.draw : parseInt(req.query.draw) ,
                recordsTotal:result.total,
                recordsFiltered:result.total,
                data:result.data
            }
            res.send(respon );
        });
    
    
    }

    public saveClients = async (req: Request, res: Response) => {
        let empRepo: ClientRepo = new ClientRepo();
    
        console.log("Received SaveClient ==> POST");
        console.log(req.body);
    
        let emp: Clients = new Clients();
        emp.name = req.body.name;
        emp.dateRegister = req.body.dateRegister;
        emp.dateExpires = req.body.dateExpires;
        emp.description = req.body.description;
        emp.author = req.body.author;
        emp.status = req.body.status;
    
        empRepo.saveClients(emp).then((result: any) => {
            console.log("Result : " + result);
            res.send(result);
        });
    }
    
}
