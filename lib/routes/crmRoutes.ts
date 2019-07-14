import {Request, Response, NextFunction} from "express";
import { ContactController } from "../controllers/crmController";
import {ClientsController} from "../controllers/ClientsController";
import {ServicesController} from "../controllers/ServicesController";
import {UserServicesController} from "../controllers/UserServicesController";
import * as nodemailer from "nodemailer";
export class Routes { 
    
    public contactController: ContactController = new ContactController() ;
    public clientsContrller: ClientsController = new ClientsController(); 
    public servicesController: ServicesController = new ServicesController(); 
    public userServicesController: UserServicesController = new UserServicesController();   

    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })

        //send-main
        app.route('/send-mails')
        .get((req: Request, res: Response) => { 
            var transporter =  nodemailer.createTransport({ // config mail server
                // service: 'Gmail',
                // auth: {
                //     user: 'congtac.net@gmail.com',
                //     pass: 'Myle@9012'
                // }
                host: 'smtp.zoho.com',
                port: 465,
                secure: true, //ssl
                auth: {
                        user:'thanhtoan@sanphamweb.com',
                        pass:'AuS7MMZq8Iwt'//app 1- 1pz0vyNePHmT app 2- AuS7MMZq8Iwt  - default 'JcD2HRwN'
                }
            });
            var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
                from: 'Sanphamweb.com <thanhtoan@sanphamweb.com>',
                to: 'ittrjeu@gmail.com',
                subject: 'Test Nodemailer',
                text: 'You recieved message from ' ,
                html: '<p>You have got a new message</b><ul><li>Username:' +  '</li><li>Email:'  + '</li><li>Username:' + '</li></ul>'
            }
            transporter.sendMail(mainOptions, function(err, info){
                if (err) {
                    console.log(err);
                    res.status(200).send({
                        message: err
                    })
                } else {
                    console.log('Message sent: ' +  info.response);
                    res.status(200).send({
                        message: info.response
                    })
                }
            });
            // res.status(200).send({
            //     message: 'GET request send mail successfulll!!!!'
            // })
        })

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