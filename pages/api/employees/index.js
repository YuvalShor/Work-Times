import dbConnect from "../../../utils/dbConnect";
import EmployeeModel from "../../../models/employeeModel";

export default async (req, res) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      if (req.body.data === "monthlyhours") {
        try {
          const employee = await EmployeeModel.findOne({
            phone: req.body.phone,
          });

          if (!employee) {
            res.status(400).json({ success: false });
          } else {
            res
              .status(201)
              .json({ success: true, data: employee.monthlyhours });
          }
        } catch (error) {
          res.status(400).json({ success: false });
        }
      } else {
        try {
          const employees = await EmployeeModel.find({});

          if (!employees) {
            res.status(400).json({ success: false });
          } else {
            const data = employees.map((item) => {
              return {
                phone: item.phone,
                firstname: item.firstname,
                lastname: item.lastname,
                monthlyhours: item.monthlyhours,
                monthlysessions: item.monthlysessions,
                workingstatus: item.workingstatus,
              };
            });

            res.status(201).json({ data });
          }
        } catch (error) {
          res.status(400).json({ success: false });
        }
      }

      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
