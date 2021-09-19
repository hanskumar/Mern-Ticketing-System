/**
 * Load Depandancies
*/
const express = require("express");
const router  = express.Router();

const AuthController        = require("../controllers/AuthController");
const DashboardController   = require('../controllers/DashboardController');
const TicketController      = require('../controllers/TicketController');

const checkAuth = require('../middlewares/auth-Middleware');
/**
 * ==================  Define All API End Points Here========================
*/

router.post("/login",AuthController.login);

router.post("/signup",AuthController.register);

router.get("/dashboard",checkAuth,DashboardController.dashboard);

router.post("/add-ticket",checkAuth,TicketController.addTicket);

router.get("/get-tickets",checkAuth,TicketController.getTickets);

//router.post("/refreshToken",AuthController.refreshToken);

module.exports = router;