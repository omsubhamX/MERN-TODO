const router = require("express").Router();
const User = require("../model/user");
const List = require("../model/list");

// Create Task
router.post("/addTask", async (req, res) => {
  try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("Found user");

      // Create a new List with the ID of the existing user
      const list = new List({ title, body, user: existingUser._id });
      await list.save();

      // Push the ID of the new List into the user's list
      existingUser.list.push(list._id);
      await existingUser.save();

      res.status(200).json({ list });
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error adding task" });
  }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const listId = req.params.id;

    // Update the list by ID
    const updatedList = await List.findByIdAndUpdate(listId, { title, body }, { new: true });

    if (updatedList) {
      // res.status(200).json({ list: updatedList });
      res.status(200).json({message:"Task Updated"});

      // console.log("List Updated");
    } else {
      res.status(400).json({ message: "Task not found" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error updating task" });
  }
});

module.exports = router;
