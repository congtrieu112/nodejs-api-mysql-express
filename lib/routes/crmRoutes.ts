import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";
import {ClientController} from "../controllers/ClientController";
export class Routes { 
    
    public contactController: ContactController = new ContactController() ;
    public clientContrller: ClientController = new ClientController();    

    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        //clients
        app.route('/clients')
        .get(this.clientContrller.getAllClients)
        .post(this.clientContrller.saveClients)
        
        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.contactController.getContacts)        

        // POST endpoint
        .post(this.contactController.addNewContact);

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.contactController.getContactWithID)
        .put(this.contactController.updateContact)
        .delete(this.contactController.deleteContact)

    }
}