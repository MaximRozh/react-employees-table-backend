import EmployeesModel from "../models/Employees.js";

export const createEmployee = async (req, res) => {
  const { firstName, lastName, fullName, birthYear, salary, position } =
    req.body;
  try {
    const doc = new EmployeesModel({
      firstName,
      lastName,
      fullName,
      birthYear,
      salary,
      position,
    });
    const employee = await doc.save();
    const total = await EmployeesModel.countDocuments({});

    res.json({ employee, total });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getAllEmployees = async (req, res) => {
  const { page, perPage, search, sortBy, order } = req.query;
  try {
    const fullName = new RegExp(search, "i");
    const sortParam = sortBy && order ? { [sortBy]: order } : { fullName: 1 };

    const pageNumber = parseInt(page) || 0;
    const startIndex = Number(pageNumber) * perPage;
    const total = await EmployeesModel.countDocuments({});

    const employees = await EmployeesModel.find({
      $or: [{ fullName }],
    })
      .sort(sortParam)
      .limit(perPage)
      .skip(startIndex);

    res.json({
      employees: employees,
      currentPage: Number(pageNumber),
      numberOfPages: Math.ceil(total / perPage),
      total: total,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateEmployee = async (req, res) => {
  const { id: employeeId } = req.params;
  const { firstName, lastName, fullName, birthYear, salary, position } =
    req.body;
  try {
    const updated = await EmployeesModel.findByIdAndUpdate(
      { _id: employeeId },
      {
        firstName,
        lastName,
        fullName,
        birthYear,
        salary,
        position,
      },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteEmployee = async (req, res) => {
  const { id: employeeId } = req.params;
  try {
    const deletedEmployee = await EmployeesModel.findByIdAndDelete({
      _id: employeeId,
    });
    const total = await EmployeesModel.countDocuments({});

    return res.json({
      success: true,
      total,
      deletedId: deletedEmployee._id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
