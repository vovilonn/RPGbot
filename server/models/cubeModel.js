const { model, Schema } = require("mongoose");

const schema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        default: "У куба нет имени",
    },
    level: {
        type: Number,
        default: 1,
    },
    energy: {
        type: Number,
        default: 10,
    },
    inventory: {
        type: Array,
        default: [
            { name: "Что-то", quantity: 0 },
            { name: "Ещё что-то", quantity: 0 },
        ],
    },
    regDate: {
        type: Date,
        default: Date.now(),
    },
    friends: {
        type: Object,
    },
});

module.exports = model("Cube", schema);
