import express, {Express, Request, Response} from "express"
import cors from "cors"
import {connect} from "mongoose"
import dotenv from "dotenv"
import axios from 'axios';
import router from "./routes";

const port = process.env.PORT ||  5000


dotenv.config()
const app: Express = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: ["http://localhost:5000"],
    methods: "GET",
    allowedHeaders: "Content-Type,Authorization"
}))


app.use("/api/classify-number", router);

app.get('/', (req: Request, res: Response) => {
  try {
      res.status(200).json('welcome to my app')
  } catch (error) {
      res.status(500).json('App not found')
  }
})



app.listen(port, async() => {
  console.log(`server is running on port ${port}`)
    try {
        await connect(process.env.URL || 'mongodb://localhost:27017/classify-number')
        console.log('connected to DB successfully')
    } catch (error) {
        console.log(error)
        throw new Error('Unable to connect to DB')
    }
})

export default app