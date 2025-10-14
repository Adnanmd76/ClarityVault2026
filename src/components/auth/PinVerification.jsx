// File Path: src/components/auth/PinVerification.jsx

import React, { useState } from 'react';

/**
 * A secure component for 6-digit PIN verification.
 * It delegates all authentication logic to a secure backend API endpoint,
 * resolving critical client-side vulnerabilities.
 * It also provides clear user feedback with a loading state.
 *
 * @param {object} props - The component props.
 * @param {Function} props.onPinSuccess - Callback function executed on successful verification.
 */
const PinVerification = ({ onPinSuccess }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handles pin input change. The maxLength attribute on the input element
  // makes an additional length check here redundant.
  const handlePinChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPin(value);
  };

  // Handles form submission by calling the backend API.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Send the PIN to the secure backend for validation.
      const response = await fetch('/api/auth/verify-pin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin, userId: 'current-user-id' }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: The server confirmed the PIN is correct.
        if (onPinSuccess) {
          onPinSuccess();
        }
      } else {
        // Failure: The server provides the error message.
        setError(data.message || 'Invalid PIN or server error.');
      }
    } catch (err) {
      console.error('API call failed:', err);
      setError('Cannot connect to the server. Please check your network.');
    } finally {
      setIsLoading(false);
      setPin(''); // Clear the PIN input for security.
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Enter 6-Digit PIN</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          maxLength="6" // This attribute enforces the 6-digit limit.
          className="w-full px-4 py-3 mb-4 text-center text-2xl tracking-[0.5em] bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          placeholder="●●●●●●"
          disabled={isLoading}
          autoComplete="off"
        />
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={pin.length !== 6 || isLoading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default PinVerification;
