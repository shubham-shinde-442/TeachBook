import mongoose from "mongoose";

export const dbConnection = ()=> {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "MERN_STACK_APPOINTMENT_SYSTEM"
    }).then(()=> {
        console.log("Connected to DB")
    }).catch(err=> {
        console.log(`Some error occured: ${err}`)
    })
}