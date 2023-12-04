const lead = require("../model/leadModel");

const addNewLead = async (req, res) => {
  try {
    const { name, city, mobile, status } = req.body;
    const newLead = await lead.findOne({ name: name });
    if (newLead) {
      return res.status(200).json({ message: "lead already exist" });
    } else {
      lead.create({
        name: name,
        city: city,
        mobile: mobile,
        status: status,
      });
      res.status(200).json({ message: "lead added successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const fetchLeads = async (req, res) => {
  try {
    const leads = await lead.find({ status: "Pending" });
    res.json({ leads });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setStatus = async (req, res) => {
  try {
    console.log(req.body);

    const { id, selectedStatus } = req.body;
    await lead.updateOne({ _id: id }, { $set: { status: selectedStatus } });
    res.json({ message: "status updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const connectedLeads = async (req, res) => {
  try {
    const leads = await lead.find({ status: "Connected" });
    res.json({ leads });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const notConnectedLeads = async (req, res) => {
  try {
    const leads = await lead.find({ status: "Not Connected" });
    res.json({ leads });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const followUpLeads = async (req, res) => {
  try {
    const leads = await lead.find({ status: "Followup" });
    res.json({ leads });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setFollowupDate = async (req, res) => {
  try {
    const {id,date} = req.body;
    const dateObject = new Date(date);
    await lead.updateOne({ _id: id }, { $set: { followupDate : dateObject } });
    res.json({ message: "Date updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const setCallAttendant = async (req, res) => {
  try {
    const {id,selectedCallAttendant} = req.body;
    await lead.updateOne({ _id: id }, { $set: { callAttendant : selectedCallAttendant } });
    res.json({ message: "Attendant updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const setOrderType = async (req, res) => {
  try {
    const {id,selectedOrderType} = req.body;
    await lead.updateOne({ _id: id }, { $set: { orderType : selectedOrderType } });
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const getLeadsCount = async (req, res) => {
  try {
    const leadCounts = await lead.aggregate([
      {
        $match: {
          status: { $in: ["Followup", "Connected"] },
        },
      },
      {
        $group: {
          _id: { $toLower: "$status" }, 
          count: { $sum: 1 },
        },
      },
    ]);

    const totalLeadsCount = await lead.countDocuments();

    const leadCountMap = {};
    leadCounts.forEach((result) => {
      leadCountMap[result._id] = result.count;
    });
    leadCountMap.totalLeads = totalLeadsCount
    console.log(leadCountMap)
    res.json({ leadCounts: leadCountMap });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




module.exports = {
  addNewLead,
  fetchLeads,
  setStatus,
  connectedLeads,
  notConnectedLeads,
  followUpLeads,
  setFollowupDate,
  setCallAttendant,
  setOrderType,
  getLeadsCount
};
