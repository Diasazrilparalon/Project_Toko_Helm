const express = require("express");
const sequelize = require("./config/koneksi");
const middlewareLogRequest = require("./middleware/logs");
const helm = require("./models/helm");
const users = require("./models/users");
const transaksi = require("./models/transaksi");
const helmRoutes = require("./routes/helm");
const usersRoutes = require("./routes/users");
const transaksiRoutes = require("./routes/transaksi");
const authRoutes = require('./routes/login');
const authenticate = require('./middleware/auth');
const uploadRoutes = require('./routes/upload');
const cookieParser = require("cookie-parser");
const path = require('path')
const app = express();

app.use(middlewareLogRequest);
app.use(express.json());
app.use(cookieParser());

app.use('/uploads', express.static(path.join(__dirname,'uploads'))); // Make the 'uploads' folder publicly accessible

app.use('/api/images', uploadRoutes);

app.use('/auth', authRoutes);

app.use("/helm", helmRoutes);
app.use("/users", usersRoutes);
app.use("/transaksi", transaksiRoutes);


sequelize
  .authenticate()
  .then(async () => {
    console.log("Database berhasil konek");
    await helm.sync({ alter: true });
  })
  .catch((err) => console.log("Error: " + err));

app.listen(4000, () => {
  console.log("Server berhasil running di port 4000");
});
