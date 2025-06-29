const prisma = require('../config/prisma');
const { formDate } = require('../helpers/formDate');


exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.json(users.map(u => ({
            ...u,
            createdAt: formDate(u.created_at)
        })));
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}