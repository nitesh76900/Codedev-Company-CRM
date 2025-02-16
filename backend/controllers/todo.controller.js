const Todo = require("../models/todo.model");
const { scheduleTaskNotifications } = require("../utils/scheduledNotification");


// ✅ Create a Todo
exports.createTodo = async (req, res) => {
    try {
        const { title, description, dueDate, priority } = req.body;

        if (!title || !description || !dueDate) {
            return res.status(400).json({ message: "Title, description, and dueDate are required" });
        }

        const newTodo = new Todo({
            user: req.user._id,
            company: req.user.company,
            title,
            description,
            dueDate,
            priority,
        });

        // ✅ Save first, then extract `_id`
        const savedTodo = await newTodo.save();

        const task = { 
            dueDate: savedTodo.dueDate, 
            id: savedTodo._id, 
            title: savedTodo.title, 
            user: req.user
        };
        scheduleTaskNotifications(task);

        return res.status(201).json({ message: "Todo created successfully", data: savedTodo });
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};


// ✅ Update a Todo
exports.updateTodo = async (req, res) => {
    try {
        const { todoId } = req.params;
        const { title, description, dueDate, priority, conclusion, remark } = req.body;

        const existingTodo = await Todo.findById(todoId);
        if (!existingTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if(!existingTodo.user.equals(req.user._id)){
            return res.status(403).json({ message: "Access denied: you can not update other user data" })
        }

        // Update the todo
        existingTodo.title = title || existingTodo.title;
        existingTodo.description = description || existingTodo.description;
        existingTodo.dueDate = dueDate || existingTodo.dueDate;
        existingTodo.priority = priority || existingTodo.priority;
        if(conclusion){
            existingTodo.conclusion = conclusion || existingTodo.conclusion;
            existingTodo.conclusionSubmiteTime = new Date();
            existingTodo.status = "Conclusion"
        }
        if(existingTodo.conclusion && remark){
            existingTodo.remark = remark
            existingTodo.status = "Remark"
        }

        const savedTodo = await existingTodo.save();

        // Reschedule notifications based on new dueDate
        const task = { 
            dueDate: savedTodo.dueDate, 
            id: savedTodo._id, 
            title: savedTodo.title, 
            user: req.user
        }
        scheduleTaskNotifications(task);

        return res.status(200).json({ message: "Todo updated successfully", data: existingTodo });
    } catch (error) {
        console.error("Error updating todo:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// ✅ Get All Todos with Filters
exports.getAllTodos = async (req, res) => {
    try {
        const { userId, priority, startDate, endDate } = req.query;
        const filter = { company: req.user.company };

        if (userId) filter.user = userId;
        if (priority) filter.priority = priority;
        if (startDate && endDate) {
            filter.dueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const todos = await Todo.find(filter).populate("user", "name email");

        return res.status(200).json({ message: "Todos fetched successfully", data: todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// ✅ Get All Todos with Filters
exports.getTodos = async (req, res) => {
    try {
        const { priority, startDate, endDate } = req.query;
        const filter = { company: req.user.company, user: req.user._id };

        if (priority) filter.priority = priority;
        if (startDate && endDate) {
            filter.dueDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        const todos = await Todo.find(filter).populate("user", "name email");

        return res.status(200).json({ message: "Todos fetched successfully", data: todos });
    } catch (error) {
        console.error("Error fetching todos:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
