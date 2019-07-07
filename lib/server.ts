import app from './app';
// import * as https from 'https';
import * as http from 'http';
// import * as fs from 'fs';
const PORT = 999;

// const httpsOptions = {
//     key: fs.readFileSync('./config/key.pem'),
//     cert: fs.readFileSync('./config/cert.pem')
// }

http.createServer(app).listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
})