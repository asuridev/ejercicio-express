const express =  require('express');
const {config} = require('./config/config');
const cors = require('cors');
const {controller} = require('./routes');
const {logErrors,duplicateFieldErrors,validationsErrors,conrolledErrors,serverErrors} = require('./middleware/errors.handler')

const app = express();
app.use(express.json());
app.use(cors());
require('./utils/auth');


controller(app);

app.use(logErrors);
app.use(conrolledErrors);
app.use(duplicateFieldErrors);
app.use(validationsErrors);
app.use(serverErrors);

app.listen(config.serverPort, ()=>{
  console.log('listen port: ', config.serverPort)
})