const mongoose = require("mongoose");
// </>
mongoose.set("strictQuery");
mongoose
  .connect(`${process.env.mongo_url}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to dataBase`);
  })
  .catch((error) => {
    console.log(`Error to Connected to dataBase ${error}`);
  });
