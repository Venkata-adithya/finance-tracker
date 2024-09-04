const express = require("express");
const router = express.Router();
const {
  getAllByUserId,
  getAllRecords,
  createRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/financeControllers");

router.route("/").get(getAllRecords).post(createRecord);

router.get("/getAllByUserId/:userId", getAllByUserId);

router.route("/:id").put(updateRecord).delete(deleteRecord);

module.exports = router;
