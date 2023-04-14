import { Tasks } from "../models/tasks.js";

export const newTask = async (req,res) => {
    const {title,description} = req.body;

    const tasks = await Tasks.findById(req.user._id);

    if(!tasks){
        var myObj = [{
            title,
            description,
        }]
        await Tasks.create({
            _id: req.user._id,
            EachTask: myObj
        });
        res.status(201).json({
            success: true,
            message: "First new task added",
        });

    } else {
        var myObj = {
            title,
            description,
        }
        await Tasks.findOneAndUpdate({_id: req.user._id},{$push: { EachTask: myObj}},{
            upsert: true
        });
        res.status(201).json({
            success: true,
            message: `Task added to ${req.user.name} `,
        });

    }
    

};

export const getMyTasks = async (req,res) => {
    const tasks = await Tasks.findById(req.user._id);

    if(!tasks)
        return res.status(404).json({
            status: false,
            message: `No task found for user ${req.user.name}`
        });
    res.status(200).json({
        status: true,
        tasks,
    });
    
};

export const ChangeCompletedStatus = async (req,res) => {
    const {id,taskCompleted} = req.params;
    const user_id = req.user._id;

    // const task = await Tasks.findById(id);
    // task.isCompleted = !task.isCompleted;
    // await task.save();


    if (taskCompleted == "yes") {
        await Tasks.updateOne(
            { '_id': user_id, 'EachTask': { $elemMatch: { '_id': id, 'isCompleted': false } } },
            { $set: { 'EachTask.$.isCompleted': true  } } 
            );
        res.status(200).json({
            status: true,
            message: `task ${id} is marked as completed`
        });
    } else if (taskCompleted == "no") {
        await Tasks.updateOne(
            { '_id': user_id, 'EachTask': { $elemMatch: { '_id': id, 'isCompleted': true } } },
            { $set: { 'EachTask.$.isCompleted': false  } } 
            );
        res.status(200).json({
            status: true,
            message: `task ${id} is marked as incmoplete`
        });      
    }
};

export const DeleteTask = async (req,res) => {
    const {id,taskCompleted} = req.params;
    const user_id = req.user._id;

    //const task = await Tasks.findById(id);

    // if(!task)
    //     return res.status(404).json({
    //         status: false,
    //         message: "invalidID",
    //     });
    //await task.deleteOne();

    await Tasks.updateOne(
        { '_id': user_id, 'EachTask': { $elemMatch: { '_id': id } } },
        { $pull: { 'EachTask': {'_id': id} } });
    res.status(200).json({
        status: true,
        message: `task ${id} is deleted`
    });  

};