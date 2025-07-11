const express = require('express');
require('dotenv').config();
const app = express();
const {PrismaClient} = require('./generated/prisma');
const port = process.env.PORT || 3000;

const prisma = new PrismaClient();
app.use(express.json())

app.get('/mahasiswa', async (req, res) => {
    try{
        const mhs = await prisma.user.findMany();
        res.status(200).json({message: 'Data mahasiswa berhasil diambil!', data: mhs});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.post('/mahasiswa', async (req, res) => {
    try{
        const {nama, nim, email, jurusan} = req.body;
        const result = await prisma.user.create({
            data: {
                nama,
                nim,
                email,
                jurusan
            }
        });
        res.status(200).json({message: "Berhasil menambahkan mahasiswa baru!"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.put('/mahasiswa/:id', async (req,res) => {
    try{
        const {id} = req.params;
        const {nama, nim, email, jurusan} = req.body;
        const updated = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                nama,
                nim,
                email,
                jurusan
            }
        });
        res.status(200).json({message: "Berhasil mengubah data mahasiswa!"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.delete('/mahasiswa/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const deleted = await prisma.user.delete({
            where: {
                id: id
            }
        });
        res.status(200).json({message: "Berhasil menghapus data mahasiswa!"});
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})