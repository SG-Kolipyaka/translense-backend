const mongoose = require("mongoose");

const OwnerSchema = mongoose.Schema({
    full_name: { type: String, required: true },
    profile_image: { type: String, required: true }, 
    state: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    mobile_number: { type: Number, required: true } 
}, {
    versionKey: false
});

const OwnerModel = mongoose.model("owner", OwnerSchema);

module.exports = {
    OwnerModel
};
