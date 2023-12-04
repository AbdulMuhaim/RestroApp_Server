// routes.js
const express = require("express");
const router = express.Router();
const controller = require("../controller/controllers");


router.post('/new_lead', controller.addNewLead);
router.get('/fetch_leads', controller.fetchLeads);
router.post('/setStatus',controller.setStatus)
router.get('/fetch_connectedleads',controller.connectedLeads)
router.get('/fetch_notconnectedleads',controller.notConnectedLeads)
router.get('/fetch_followupleads',controller.followUpLeads)
router.post('/set_folowupdate',controller.setFollowupDate)
router.post('/set_callattendant',controller.setCallAttendant)
router.post('/set_ordertype',controller.setOrderType)
router.get('/leadscount',controller.getLeadsCount)



module.exports = router;
