import mongoose from 'mongoose'

const studentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, 
        },
        DOB:{
            type:Date,
            required:true
        },
        lastlyPaid:{
            type:Number,
            default:-1
        },
        batch: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const Student = mongoose.model('Student', studentSchema)

export default Student
