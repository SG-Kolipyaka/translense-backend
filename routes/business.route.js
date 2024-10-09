const { Router } = require("express");
const { BusinessModel } = require("../model/business.model");
const multer = require("multer");
const path = require("path");

const businessRouter = Router();


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
    limits: { fileSize: 1024 * 1024 * 20},  
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
        }
    }
});


businessRouter.post('/add', upload.single('image'), async (req, res) => {
    try {
        const { name, country, state, city, address, open_time, closing_time, email, mobile_number, ownerId } = req.body;
        const image = req.file ? req.file.path : null;  

        if (!image) {
            return res.status(400).send({ msg: "Image upload failed" });
        }

        const newBusiness = new BusinessModel({
            name,
            country,
            state,
            city,
            address,
            open_time,
            closing_time,
            email,
            mobile_number,
            image,  
            ownerId
        });

        await newBusiness.save();
        res.status(201).send(newBusiness);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


businessRouter.get('/all', async (req, res) => {
    try {
        const businesses = await BusinessModel.find();
        res.status(200).send(businesses);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


businessRouter.get('/:businessId', async (req, res) => {
    const { businessId } = req.params;
    try {
        const business = await BusinessModel.findById(businessId);
        if (!business) {
            return res.status(404).send({ msg: "Business not found" });
        }
        res.status(200).send(business);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


businessRouter.patch('/update/:businessId', upload.single('image'), async (req, res) => {
    const { businessId } = req.params;
    try {
        const updatedData = req.body;
        if (req.file) {
            updatedData.image = req.file.path;  
        }

        const updatedBusiness = await BusinessModel.findByIdAndUpdate(businessId, updatedData, { new: true });

        if (!updatedBusiness) {
            return res.status(404).send({ msg: "Business not found" });
        }

        res.status(200).send({ msg: "Business updated successfully", updatedBusiness });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


businessRouter.delete('/delete/:businessId', async (req, res) => {
    const { businessId } = req.params;
    try {
        const deletedBusiness = await BusinessModel.findByIdAndDelete(businessId);

        if (!deletedBusiness) {
            return res.status(404).send({ msg: "Business not found" });
        }

        res.status(200).send({ msg: "Business deleted successfully" });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




businessRouter.patch('/add-owner/:businessId', async (req, res) => {
    const { businessId } = req.params;
    const { ownerId } = req.body;  

    if (!ownerId) {
        return res.status(400).send({ msg: "Owner ID is required" });
    }

    try {
        const updatedBusiness = await BusinessModel.findByIdAndUpdate(
            businessId,
            { ownerId },  
            { new: true } 
        );

        if (!updatedBusiness) {
            return res.status(404).send({ msg: "Business not found" });
        }

        res.status(200).send({ msg: "Owner ID added successfully", updatedBusiness });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


module.exports = {
    businessRouter
};
