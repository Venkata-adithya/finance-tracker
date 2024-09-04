/* eslint-disable react/prop-types */
import { useState } from "react";
import { useContext } from "react";
import { RecordsContext } from "../../App";
import axios from "axios";

function FinancialRecordForm() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const { records, updateRecords } = useContext(RecordsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecord = {
      userId: "123",
      description: description,
      amount: amount,
      category: category,
      paymentMethod: paymentMethod,
      date: new Date().toLocaleString(),
    };
    try {
      // Send the new record to the server
      const response = await axios.post(
        "http://localhost:3001/Records",
        newRecord
      );

      if (response.status === 201) {
        updateRecords([...records, response.data]);
        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
      } else {
        console.error("Failed to save record:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  return (
    <form className="financial-record-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Food">Food</option>
          <option value="Transportation">Transportation</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select a Payment Method</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="UPI">UPI</option>
        </select>
      </div>

      <button type="submit" className="addBtn">
        Add Record
      </button>
    </form>
  );
}

export default FinancialRecordForm;
