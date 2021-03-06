import dbConnect from "../../../utils/dbConnect";
import EmployeeModel from "../../../models/employeeModel";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const employee = await EmployeeModel.findOne({ phone: req.body.phone });
        console.log("trying to find if the user exists...");

        const passwordsMatch = await employee.comparePassword(
          req.body.password
        );

        if (!employee) {
          console.log("couldn't find phone number in db");
          res.status(400).json({ success: false });
        } else if (!passwordsMatch) {
          console.log("phone number and password don't match");
          res.status(400).json({ success: false });
        } else {
          console.log("login successfully");
          res.status(201).json({
            success: true,
            type: employee.type,
            phone: employee.phone,
            firstname: employee.firstname,
            lastname: employee.lastname,
          });
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
