import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highestLowercase', label: 'Highest lowercase alphabet' },
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: JSON.parse(input) }),
      });
      const data = await response.json();
      setApiResponse(data);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid JSON or API error');
    }
  };

  const handleSelectChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions.map(option => option.value));
  };

  const renderResponse = () => {
    if (!apiResponse) return null;
    return (
      <>
        {selectedOptions.includes('alphabets') && <div>Alphabets: {apiResponse.alphabets.join(', ')}</div>}
        {selectedOptions.includes('numbers') && <div>Numbers: {apiResponse.numbers.join(', ')}</div>}
        {selectedOptions.includes('highestLowercase') && <div>Highest Lowercase Alphabet: {apiResponse.highest_lowercase_alphabet.join(', ')}</div>}
      </>
    );
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1> {/* Replace with your actual roll number */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON here'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apiResponse && (
        <>
          <Select
            options={options}
            isMulti
            onChange={handleSelectChange}
          />
          <div>{renderResponse()}</div>
        </>
      )}
    </div>
  );
}

export default App;
