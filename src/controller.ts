import { Request, Response } from "express";
import axios from "axios";

export const classifyNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const { number } = req.query;

    const validNumber = /^-?[0-9]+$/.test(number as string); 
    if (!validNumber) {
      res.status(400).json({number, error: true });
      return;
    }

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

    const isPerfect = (n: number) => {
        let sum = 0;
        for (let i = 1; i <= n / 2; i++) {
          if (n % i === 0) sum += i;
        }
        return sum === n;
      };

    const properties: string[] = [];
    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    const { data } = await axios.get(`http://numbersapi.com/${num}/math?json`);

    res.json({
      number: num,
      is_prime: isPrime(num),
      is_perfect: isPerfect(num), 
      properties,
      digit_sum: Math.abs(num).toString().split("").reduce((sum, d) => sum + parseInt(d), 0),
      fun_fact: data.text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching data" });
  }
};
