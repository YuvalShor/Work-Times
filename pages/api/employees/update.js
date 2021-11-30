import dbConnect from "../../utils/dbConnect";
import Employee from "../../../models/employeeModel";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const employee = await Employee.findOne({ phone: req.body.phone });
        
        if (req.body.hours) {
          const currentMonth = new Date().getMonth();

          if (!employee) {
            res.status(400).json({ success: false });
          } else if (employee.month != currentMonth) {
            employee.month = currentMonth;
            employee.monthlysessions = 1;
            employee.monthlyhours = req.body.hours;
          } else {
            employee.monthlyhours++;
          }
        } else {
            console.log(req.body.newsession);

            if (req.body.newsession) {
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
