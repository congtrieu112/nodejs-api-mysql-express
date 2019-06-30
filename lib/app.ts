import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import {createConnection} from "typeorm";
// import { Clients } from "./entity/clients";
import { Users } from "./entity/Users";

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://45.63.0.193:27017/CRMdb';  
    // public mongoUrl: string = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';

    constructor() {
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);  
        this.mysqlSetup();   
    }

    private config(): void{
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    }

    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
    }

    private mysqlSetup(): void{
        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "",
            database: "quanly",
            entities: [
                __dirname + "/entity/*.ts"
            ],
            synchronize: true,
            logging: false
        }).then(async connection => {
            console.log('connected',__dirname)
            let user = new Users();
            user.firstName = "dinhcong"; 
            user.lastName = "trieu"; 
            await connection.manager.save(user);
        })
    }

}

export default new App().app;
