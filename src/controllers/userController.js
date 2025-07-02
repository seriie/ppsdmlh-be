const prisma = require('../config/prisma');
const hashPw = require('../utils/hashPw');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
    console.log(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.updateUsers = async (req, res) => {
  const userId = req.params.id;
  const { fullname, email, password, role } = req.body;

  try {
    const updateData = {};

    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    if (password) {
      updateData.password = await hashPw(password);
    }

    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: updateData,
    });

    res.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
