function Btn(text, callback_data) {
    this.text = text;
    this.callback_data = callback_data;
}

module.exports = {
    Btn,
    // QUERRY TYPES
    SHOW_INVENTORY: "SHOW_INVENTORY",
    CREATE_CUBE: "CREATE_CUBE",
    SHOW_CUBE: "SHOW_CUBE",
};