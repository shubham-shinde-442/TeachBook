import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  getStudentAppointments,
  getTeacherAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controller/appointmentController.js";
import {
  isAdminAuthenticated,
  isStudentAuthenticated,
  isTeacherAuthenticated,
  isAdminOrTeacherAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isStudentAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.get("/my", isStudentAuthenticated, getStudentAppointments);
router.get("/teacher/my", isTeacherAuthenticated, getTeacherAppointments);
router.put(
  "/update/:id",
  isAdminOrTeacherAuthenticated,
  updateAppointmentStatus
);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
