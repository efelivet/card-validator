import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
dotenv.config();
import { validateLuhn } from './utils/luhnValidator';

const app = express();
const PORT = process.env.PORT || 5000;
const frontendUrl = 'https://card-validator-client.onrender.com';
// Middleware
app.use(cors({
  origin: frontendUrl, 
  methods: ['POST'], 
  credentials: true
}));
app.use(express.json());


app.post('/api/validate', (req: Request, res: Response) => {
  try {

  
    const { cardNumber } = req.body;

   
    if (!cardNumber || typeof cardNumber !== 'string') {
      return res.status(400).json({
        valid: false,
        message: 'Invalid input. Please provide a card number as a string.'
      });
    }


    const isValid = validateLuhn(cardNumber);

   

    return res.status(200).json({
      valid: isValid,
      
      message: isValid 
        ? 'The card number is valid.' 
        : 'The card number failed validation check.'
    });

  } catch (error) {
    console.error('Validation Error:', error);
    return res.status(500).json({
      valid: false,
      message: 'Internal server error occurred during validation.'
    });
  }
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});