"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyNumber = void 0;
const axios_1 = __importDefault(require("axios"));
const classifyNumber = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { number } = req.query;
        const validNumber = /^[0-9]+$/.test(number);
        if (!validNumber) {
            res.status(400).json({ number, error: true });
            return;
        }
        const num = parseInt(number, 10);
        if (isNaN(num)) {
            res.status(400).json({ number, error: true });
            return;
        }
        const isPrime = (n) => {
            if (n < 2)
                return false;
            for (let i = 2; i * i <= n; i++) {
                if (n % i === 0)
                    return false;
            }
            return true;
        };
        const isArmstrong = (n) => {
            const strNum = n.toString();
            const len = strNum.length;
            return strNum.split("").reduce((sum, digit) => sum + Math.pow(parseInt(digit), len), 0) === n;
        };
        const isPerfect = (n) => {
            let sum = 0;
            for (let i = 1; i <= n / 2; i++) {
                if (n % i === 0)
                    sum += i;
            }
            return sum === n;
        };
        const properties = [];
        if (isArmstrong(num))
            properties.push("armstrong");
        properties.push(num % 2 === 0 ? "even" : "odd");
        const { data } = yield axios_1.default.get(`http://numbersapi.com/${num}/math?json`);
        res.json({
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfect(num),
            properties,
            digit_sum: num.toString().split("").reduce((sum, d) => sum + parseInt(d), 0),
            fun_fact: data.text,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching data" });
    }
});
exports.classifyNumber = classifyNumber;
