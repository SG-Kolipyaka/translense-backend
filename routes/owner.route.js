const { Router } = require("express");
const { OwnerModel } = require("../model/owner.model");
const multer = require("multer");
const path = require("path");

const ownerRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');  
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 },  
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
        }
    }
});


ownerRouter.post('/add', upload.single('profile_image'), async (req, res) => {
    try {
        const { full_name, state, city, country, address, email, mobile_number } = req.body;
        const profile_image = req.file ? req.file.path : null;  

        if (!profile_image) {
            return res.status(400).send({ msg: "Image upload failed" });
        }

        const newOwner = new OwnerModel({
            full_name,
            profile_image,
            state,
            city,
            country,
            address,
            email,
            mobile_number: Number(mobile_number)  
        });

        await newOwner.save();
        res.status(201).send(newOwner);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


ownerRouter.get('/all', async (req, res) => {
    try {
        const owners = await OwnerModel.find();
        res.status(200).send(owners);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


ownerRouter.get('/:ownerId', async (req, res) => {
    const { ownerId } = req.params;
    try {
        const owner = await OwnerModel.findById(ownerId);
        if (!owner) {
            return res.status(404).send({ msg: "Owner not found" });
        }
        res.status(200).send(owner);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


ownerRouter.patch('/update/:ownerId', upload.single('profile_image'), async (req, res) => {
    const { ownerId } = req.params;
    try {
        const updatedData = req.body;
        if (req.file) {
            updatedData.profile_image = req.file.path;  
        }

        if (updatedData.mobile_number) {
            updatedData.mobile_number = Number(updatedData.mobile_number); 
        }

        const updatedOwner = await OwnerModel.findByIdAndUpdate(ownerId, updatedData, { new: true });

        if (!updatedOwner) {
            return res.status(404).send({ msg: "Owner not found" });
        }

        res.status(200).send({ msg: "Owner updated successfully", updatedOwner });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


ownerRouter.delete('/delete/:ownerId', async (req, res) => {
    const { ownerId } = req.params;
    try {
        const deletedOwner = await OwnerModel.findByIdAndDelete(ownerId);

        if (!deletedOwner) {
            return res.status(404).send({ msg: "Owner not found" });
        }

        res.status(200).send({ msg: "Owner deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = {
    ownerRouter
};
