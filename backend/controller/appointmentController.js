import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    appointment_time, 
    department,
    teacher_firstName,
    teacher_lastName,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !appointment_time || 
    !department ||
    !teacher_firstName ||
    !teacher_lastName ||
    !address
  ) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const isConflict = await User.find({
    firstName: teacher_firstName,
    lastName: teacher_lastName,
    role: "Teacher",
    teacherDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(new ErrorHandler("teacher not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      new ErrorHandler(
        "teacher Conflict! Please Contact Through Email Or Phone!",
        400
      )
    );
  }
  const teacherId = isConflict[0]._id;
  const studentId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    appointment_time,
    department,
    teacher: {
      firstName: teacher_firstName,
      lastName: teacher_lastName,
    },
    address,
    teacherId,
    studentId: req.user._id, 
  });
  res.status(200).json({
    success: true,
    appointment,
    message: "Appointment Send!",
  });
});

export const getAllAppointments = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  res.status(200).json({
    success: true,
    appointments,
  });
});
export const updateAppointmentStatus = catchAsyncErrors(
  async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);
    if (!appointment) {
      return next(new ErrorHandler("Appointment not found!", 404));
    }
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Appointment Status Updated!",
    });
  }
);

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Appointment Not Found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Appointment Deleted!",
  });
});

export const getStudentAppointments = catchAsyncErrors(async (req, res, next) => {
  const studentId = req.user._id;
  const appointments = await Appointment.find({ studentId: req.user._id })
      .populate("teacherId", "name department")  // teacher info
    .populate("studentId", "name email"); 
  res.status(200).json({
    success: true,
    appointments,
  });
});

export const getTeacherAppointments = catchAsyncErrors(async (req, res, next) => {
  const teacherId = req.user._id;

  const appointments = await Appointment.find({ teacherId })
    .populate("studentId", "firstName lastName email")
    .sort({ appointment_date: 1, appointment_time: 1 });

  res.status(200).json({
    success: true,
    appointments,
  });
});

