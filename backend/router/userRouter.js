import express from "express";
import {
  studentRegister,
  addNewAdmin,
  addNewTeacher,
  getAllTeachers,
  getUserDetails,
  login,
  logoutTeacher,
  logoutStudent,
  logoutUser,
} from "../controller/userController.js";
import {
  isAdminAuthenticated,
  isStudentAuthenticated,
  isTeacherAuthenticated,
  isAdminOrTeacherAuthenticated,
} from "../middlewares/auth.js";
const router = express.Router();

router.post("/student/register", studentRegister);
router.post("/login", login);
router.post("/admin/addnew", isAdminAuthenticated, addNewAdmin);
router.get("/teachers", getAllTeachers);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/me", isStudentAuthenticated, getUserDetails);
router.get("/teacher/me", isTeacherAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminOrTeacherAuthenticated, logoutUser);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
router.get("/teacher/logout", isTeacherAuthenticated, logoutTeacher);
router.post("/teacher/addnew", isAdminAuthenticated, addNewTeacher);

export default router;
