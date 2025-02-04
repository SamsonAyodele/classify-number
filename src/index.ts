import express, {Express, Request, Response} from "express"
import cors from "cors"
import {connect} from "mongoose"
import dotenv from "dotenv"
import axios from 'axios';

const port = 5000


dotenv.config()
const app: Express = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    origin: ["http://localhost:5000"],
    methods: "GET",
    allowedHeaders: "Content-Type,Authorization"
}))



const classifyNumber = async (req: Request, res: Response): Promise<void> => {
    try {
      const { number } = req.query;
      const num = parseInt(number as string, 10);
  
      if (isNaN(num)) {
        res.status(400).json({ number, error: true });
        return;
      }
  
      const isPrime = (n: number) => {
        if (n < 2) return false;
        for (let i = 2; i * i <= n; i++) {
          if (n % i === 0) return false;
        }
        return true;
      };
  
      const isArmstrong = (n: number) => {
        const strNum = n.toString();
        const len = strNum.length;
        return strNum.split("").reduce((sum, digit) => sum + Math.pow(parseInt(digit), len), 0) === n;
      };
  
      const properties: string[] = [];
      if (isArmstrong(num)) properties.push("armstrong");
      properties.push(num % 2 === 0 ? "even" : "odd");
  
      const { data } = await axios.get(`http://numbersapi.com/${num}/math?json`);
  
      res.json({
        number: num,
        is_prime: isPrime(num),
        is_perfect: false, // You can implement perfect number logic later
        properties,
        digit_sum: num.toString().split("").reduce((sum, d) => sum + parseInt(d), 0),
        fun_fact: data.text,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching data" });
    }
  };
  
  app.get('/classify-number', classifyNumber);

//   app.get('/', (req: Request, res: Response) => {
//     try {
//         res.status(200).json('welcome to my app')
//     } catch (error) {
//         res.status(500).json('App not found')
//     }
// })


  

app.listen(port, async() => {
  console.log(`server is running on port ${port}`)
    try {
        await connect('mongodb://localhost:27017/classify-number')
        console.log('connected to DB successfully')
    } catch (error) {
        console.log(error)
        throw new Error('Unable to connect to DB')
    }
})

export default app