const mongoose = require('mongoose')

const connectData = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
  })
  console.log(`mongo connect: ${connection.connection.host}`)
}


module.exports = connectData