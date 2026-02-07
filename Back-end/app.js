const express=require("express");
const cors=require(`cors`);
const mongoose=require(`mongoose`);
require(`dotenv`).config();

const PORT=process.env.PORT||5000;

const app=express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

//Routes
app.use("/api/auth", require(`./routes/authRoutes`));

app.listen(PORT,()=>
{
    console.log(`Server is running on port ${PORT}`);
});
