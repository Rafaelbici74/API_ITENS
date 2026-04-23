const express = require('express');
const app = express();
app.use(express.json());

const itensRoutes = require("./routes/itensRoutes.js");

//  http://localhost:3000/

app.use("/itens", itensRoutes);
app.use("/itensId", itensRoutes);
app.use("/postItens", itensRoutes);
app.use("/putItens", itensRoutes);
app.use("/itensStatus", itensRoutes);
app.use("/deleteItem", itensRoutes);

module.exports = app;