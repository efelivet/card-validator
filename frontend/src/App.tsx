import React, { useState } from 'react';
import './App.css';

interface ValidationResult {
  valid: boolean;
  message: string;
}

const App: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>('');
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const rawValue = e.target.value.replace(/\D/g, '');
    
    // Group digits by 4s for readability
    const formatted = rawValue.match(/.{1,4}/g)?.join(' ') || '';

    if (formatted.length <= 19) {
      setCardNumber(formatted);

  
      if (result) setResult(null);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
   
    const cleanNumber = cardNumber.replace(/\s/g, '');

    
    if (cleanNumber.length < 13) {
      setResult({
        valid: false,
        message: 'Invalid length. Cards must be between 13 and 16 digits.'
      });
      return;
    }

    setLoading(true);

            // Mock API Call 
   try {
      
      const response = await fetch('https://card-validator-zhti.onrender.com/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber: cleanNumber }),
      });

      
      const data: ValidationResult = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setResult({
          valid: false,
          message: data.message || 'Server rejected the request.'
        });
      }
    } catch (error) {
    
      setResult({ 
        valid: false, 
        message: 'Cannot connect to server.' 
      });
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card-box">
        <header>
          <h2 className="title">Card Validator</h2>
          <p className="subtitle">
            Securely verify card numbers using the standard Luhn Algorithm.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="validation-form">
          <input
            type="text"
            className="card-input"
            placeholder="0000 0000 0000 0000"
            value={cardNumber}
            onChange={handleInputChange}
            aria-label="Card Number"
          />
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || !cardNumber}
          >
            {loading ? 'Verifying...' : 'Validate Card'}
          </button>
        </form>

        {result && (
          <div className={`result-message ${result.valid ? 'result-success' : 'result-error'}`}>
            {result.valid ? 'valid card' : 'oops'} {result.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;