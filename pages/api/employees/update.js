import dbConnect from "../../../utils/dbConnect";
import EmployeeModel from "../../../models/employeeModel";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const employee = await EmployeeModel.findOne({ phone: req.body.phone });

        if (req.body.hours) {
          const currentMonth = new Date().getMonth();

          if (!employee) {
            res.status(400).json({ success: false });
          } else if (employee.month != currentMonth) {
            employee.month = currentMonth;
            employee.monthlysessions = 1;
            employee.monthlyhours = 0;
          }

          employee.monthlyhours++;
        } else {
          if (req.body.newsession && req.body.hours > 0) {
            employee.monthlysessions++;
          }
        }

        if (employee.save()) {
          res.status(201).json({ success: true });
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
