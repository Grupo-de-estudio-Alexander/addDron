const { connection, connect } = require("mongoose")

function dbConnection () {
    
    const uri = process.env.URLBD
      //setUp of variables
    const options = { 
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex: true,
        useFindAndModify:false
    }

    //connect to database
    connect(uri, options)

    //functions triggered on connection
    connection.once("open", () => console.log("connection to database stablished"))
    connection.on("error", (err) => console.log("connection lost", err))
    
}
module.exports = dbConnection