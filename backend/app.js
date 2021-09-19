//configure global variables
require("dotenv").config();

const express       = require('express')
const app           = express();
const rateLimit     = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const helmet        = require('helmet');
const apiRouter     = require("./routes/ApiRoutes");
const cookieParser  = require("cookie-parser");
const cors          = require('cors')

/**
 * DB Connect
*/
const connection = require('./config/DbConnect')();


//Data sanitization against NoSQL query injection
app.use(mongoSanitize());


const limiter = rateLimit({
    windowMs: 2 * 60 * 1000, // 2 minutes
    max: 500, // limit each IP to 500 requests per windowMs
    message: 'Too many requests from this Ip, na wao, please try again after one hour',
});
  
//  apply to all requests
app.use(limiter);


// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// set security HTTP headers
//app.use(helmet())

/* app.use(cors());
app.use((req, res, next) => {
    //allow access from every, elminate CORS
    res.setHeader('Access-Control-Allow-Origin','*');
    res.removeHeader('x-powered-by');
    //set the allowed HTTP methods to be requested
    res.setHeader('Access-Control-Allow-Methods','POST');
    //headers clients can use in their requests
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    //allow request to continue and be handled by routes
    next();
});  */

app.use(cookieParser());


const corsOption = {
  credentials: true,
  origin: ['http://localhost:3000'],
};
app.use(cors(corsOption));

app.use("/v1/", apiRouter);

/* GET Welcome page. */
app.get("/", function(req, res) {
	res.send({ msg: "Welcome to Mern CRM App Node API" });
});

/**
 * Start Express server.
*/
app.listen(process.env.PORT, () => {
    console.log(`Server is stated on http://localhost:${process.env.PORT}`)
});

module.exports = app;