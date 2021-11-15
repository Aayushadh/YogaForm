import express from 'express'
import { deleteStudents, getStudents, payFees, registerStudent } from '../controllers/studentController.js'

const studentRouter = express.Router()

studentRouter.route('/').post(registerStudent).get(getStudents).delete(deleteStudents).put(payFees)

export default studentRouter
