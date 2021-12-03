import dbConnect from "../../../utils/dbConnect";
import EmployeeModel from "../../../models/employeeModel";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const employee = await EmployeeModel.findOne({ phone: req.body.phone });
        console.log("trying to find if the user already exists...");

        if (!employee) {
          console.log("couldn't find user in db, creating...");
          const newEmployee = await EmployeeModel.create(req.body);
          res.status(201).json({ success: true, data: newEmployee });
        } else {
          console.log("user already exists in the database");
          res.status(400).json({ success: false });
        }
      } catch (error) {
        res.status(400).json({ success: false });
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
