// Use nanoid version - 3.3.0
const { nanoid } = require("nanoid");
const express = require("express");
const multer = require('multer');
const fs =require('fs');
const path = require('path');
const app = express();
app.use(express.static('templates'));
const storage = multer.diskStorage(
    {
    destination:(req,file,cb)=>
    {
        const sourcedir = path.join(__dirname,'sourcedir');
        if(!fs.existsSync(sourcedir))
        {
            fs.mkdirSync(sourcedir);
        }
        cb(null,sourcedir);
    },
    filename:(req,file,cb)=>
    {
        let uniqueName = nanoid(8) + path.extname(file.originalname);
        cb(null,uniqueName);
    }
})
   
const upload = multer({storage:storage});

app.post("/upload",upload.single('file'),(req,res)=>
{
    if(!req.file)
    {
        console.log("No file Received");
        res.json({ message: 'No File Received' });
        return 1;
    }
    console.log("Received");
    res.json({ message: 'File Received' ,url:"http://localhost:3000/viewer/"+req.file.filename});
    
})
app.get('/viewer/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'sourcedir', filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});
app.listen(3000,()=>{
    console.log("server is listening in http://localhost:3000/");
})