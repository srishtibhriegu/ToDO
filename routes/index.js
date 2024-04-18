var express = require("express");
var router = express.Router();
var Task = require("../models/task");

// index page and fetch tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("index", { tasks });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//creating a task
router.post("/tasks", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// deleting a task
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.send("Task deleted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//marking a task as completed
router.put("/tasks/:id/complete", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Task not found");
    }
    task.completed = true;
    await task.save();
    res.send("Task marked as complete");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
