const mongoose = require("mongoose");

const BusinessSchema = mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    open_time: { type: String, required: true },
    closing_time: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    mobile_number: { type: Number, required: true },
    image: { type: String, required: true }, 
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: false }
}, {
    versionKey: false
});

const BusinessModel = mongoose.model("business", BusinessSchema);

module.exports = {
    BusinessModel
};
