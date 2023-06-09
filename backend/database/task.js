const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    creater:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    name:{
        type: String,
    },
    // the planning day of this task
    day:{
        type: Number,
    },
    month:{
        type: Number,
    },
    year:{
        type: Number,
    },
    schedule:{
        type: Boolean,
    },
    // daily, monthly, year
    hierarchy:{
        type: String,
    },
    // am/pm
    dueTime:{
        type: String,
    },
    // iso string combined day month year and dueTime
    dueDate:{
        type: String,
    },
    hour:{
        type: Number,
    },
    minute:{
        type: Number,
    },
    expectedDuration:{
        type: Number,
    },
    actualDuration:{
        type: Number,
    },
    // record the start time of this task to calculate actualDuration
    start:{
        type: Date,
    },
    notifiable:{
        type: Boolean,
    },
    notifyTime:{
        type: Number,
    },
    isRepeat:{
        type: Boolean,
    },
    dayWeekMonth:{
        type: String,
    },
    frequency:{
        type: String,
    },
    repeatStartDay:{
        type: Date,
    },
    content:{
        type: String,
    },
    tag:{
        type: Schema.Types.ObjectId,
        ref:'Tag',
    },
    color:{
        type: String,
    },
    important:{
        type: Boolean,
    },
    completed:{
        type: Boolean,
    },
    abandoned:{
        type: Boolean,
    },
    // parent or subtask
    identity:{
        type: String,
    },
    subTask:[{
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Task',
        },
        name:{
            type: String,
        }
    }],
    parentTask:{
        _id:{
            type: Schema.Types.ObjectId,
            ref:'Task',
        },
        name:{
            type: String,
        },
    },
    mood:[{
        date:{
            type: Date,
        },
        score:{
            type: Number,
        },
    }],
    difficulty:[{
        date:{
            type: Date,
        },
        score:{
            type: Number,
        },
    }],
    location:{
        type: String,
    },
});
taskSchema.set('timestamps',true);
module.exports = mongoose.model('Task', taskSchema);