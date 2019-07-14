import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";
import {ClientsController} from "../controllers/ClientsController";
import {ServicesController} from "../controllers/ServicesController";
import {UserServicesController} from "../controllers/UserServicesController";
import {MailController} from "../controllers/MailController";
export class Routes { 
    
    public contactController: ContactController = new ContactController() ;
    public clientsContrller: ClientsController = new ClientsController(); 
    public servicesController: ServicesController = new ServicesController(); 
    public userServicesController: UserServicesController = new UserServicesController();   
    public mailController: MailController = new MailController();

    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        //send-main
        app.route('/send-mails')
        .post(this.mailController.sendMail)

        //clients
        app.route('/clients')
        .get(this.clientsContrller.getAllClients)
        .post(this.clientsContrller.saveClients)
        .delete(this.clientsContrller.deleteClients)

        //services
        app.route('/services')
        .get(this.servicesController.getAllServices)
        .post(this.servicesController.saveServices)
        .delete(this.servicesController.deleteServices)

        //user-services
        app.route('/user-services')
        .get(this.userServicesController.getAllUserServices)
        .post(this.userServicesController.saveUserServices)
        .delete(this.userServicesController.deleteUserServices)
        
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