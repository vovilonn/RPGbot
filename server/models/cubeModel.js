const { model, Schema } = require("mongoose");

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        default: "У куба нет имени",
    },
    id: {
        type: Number,
        required: true,
    },
    regDate: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = model("Cube", schema);
