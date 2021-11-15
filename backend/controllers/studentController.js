import Student from "../models/studentModel.js";
import asyncHandler from "express-async-handler";

const getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find({});
  res.json(students);
});

function calculateAge(birthday) {
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

function getDatefromString(dob) {
  var parts = dob.split("-");
  var ans = new Date(parts[0], parts[1] - 1, parts[2]);
  return ans;
}

const deleteStudents = asyncHandler(async (req, res) => {
  await Student.deleteMany({});
  res.send({ message: "deleted successfully" });
});

const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, batch, dob } = req.body;

  // get date from string
  const DOB = getDatefromString(dob);

  const studentExists = await Student.findOne({ email });
  const age = calculateAge(DOB);

  // check whether already enrolled or not

  if (studentExists) {
    res.status(400).send({ message: "Already Enrolled !!" });
    throw new Error("Already Enrolled!!");
  }

  if (age < 18 || age > 65) {
    res.status(400).json({ message: "Not Eligible(Age must be between 18-65)" });
    throw new Error("Not Eligible(Age must be between 18-65)");
  }

  const student = await Student.create({ name, email, batch, DOB });

  if (student) {
    res.status(201).send({
      _id: student._id,
      name: student.name,
      email: student.email,
      lastlyPaid: student.lastlyPaid,
      DOB: student.DOB,
    });
  } else {
    res.status(404);
    throw new Error("Something Went Wrong !!");
  }
});


const payFees = asyncHandler(async(req,res)=>{

  const {email,month,batch}=req.body

  const student = await Student.findOne({email})

  if(!student)
  {
    res.status(400).send({message:"You have to enroll first !!"})
    throw new Error("You have to enroll first !!")
  }

  const curr = student.lastlyPaid

  if(curr == month)
  {
    res.status(400).send({message:"You have already paid your fees for this month!!"})
    throw new Error("Fees Already Paid")
  }
  if(batch)
  student.batch = batch
  student.lastlyPaid=month

  await student.save()

  res.status(201).send({message:"Paid SuccessFully"})

})

export {
  registerStudent,
  getStudents,
  deleteStudents,
  payFees,
};
