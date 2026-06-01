import express, { Router } from "express"
import { generateInterViewReportController, generateResumePdfController, getAllInterviewReportsController, getInterviewReportByIdController } from "../controllers/interview.controller.js"
import  upload  from "../middleware/file.middleware.js"
import { authenticateToken } from "../middleware/auth.middleware.js"


const interviewRouter = Router()

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post("/",  authenticateToken, upload.single("resume"), generateInterViewReportController)

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId",  authenticateToken, getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/",  authenticateToken, getAllInterviewReportsController)


/**
 * @route GET /api/interview/resume/pdf
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewReportId",  authenticateToken, generateResumePdfController)


export default interviewRouter