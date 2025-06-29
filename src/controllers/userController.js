const prisma = require('../config/prisma');
const bcrypt = require('bcryptjs');
const { formDate } = require('../helpers/formDate');
const { nanoid } = require('nanoid');

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

exports.register = async (req, res) => {
    try {
       const { fullname, email, password } = req.body;
       const userId = `UID${new Date().toLocaleDateString.replace(/\//g, '') + nanoid(10)}`

        const existingEmail = await prisma.users.findUnique({
            where: { email },
        });

        if (existingEmail) return res.status(400).json({ message: "Email already exist!" });

        const hashedPw = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: {
                id: userId,
                fullname: fullname,
                email: email,
                password: hashedPw
            }
        });

        res.status(200).json({ message: "Register success", user: { id: user.id, fullname: user.fullname, email: user.email } });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error!" });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user) return res.status(404).json({ message: "User not found!" });

        const validPw = await bcrypt.compare(password, user.password);

        if(!valid) return res.status(401).json({ message: "Invalid" });

        res.status(200).json({ message: "Login success", user: { id: user.id } });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Internal server error!" });
    }
}