const RecordModel = require("../models/financialRecordsModel");

const getAllRecords = async (req, res) => {
  try {
    const records = await RecordModel.find();
    if (records.length === 0) {
      return res.status(404).send("No records found");
    }

    return res.status(200).json(records);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const getAllByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log(req.params);

    console.log(userId);

    const records = await RecordModel.find({ userId: userId });
    console.log(records);

    if (records.length === 0) {
      return res.status(404).send("No records found for the given user");
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).send(error);
  }
};
const createRecord = async (req, res) => {
  try {
    const { userId, description, amount, category, paymentMethod, date } =
      req.body;

    const newRecordBody = {
      userId: userId,
      description: description,
      amount: amount,
      category: category,
      paymentMethod: paymentMethod,
      date: new Date(),
    };
    console.log(newRecordBody);
    const newRecord = new RecordModel(newRecordBody);
    const savedRecord = await newRecord.save();

    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).send(error);
  }
};
const updateRecord = async (req, res) => {
  try {
    const id = req.params.id;
    const newRecordBody = req.body;
    const record = await RecordModel.findByIdAndUpdate(id, newRecordBody, {
      new: true,
    });

    if (!record) return res.status(404).send("Not Found");
    res.status(200).json(record);
  } catch (error) {
    res.status(500).send(error);
  }
};
const deleteRecord = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const record = await RecordModel.findByIdAndDelete(id);
    if (!record) return res.status(404).send("Not Found");

    res.status(200).json(record);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllByUserId,
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
};
