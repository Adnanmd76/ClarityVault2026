// File Path: src/components/auth/PinVerification.jsx

import React, { useState } from 'react';

// Constants for security parameters
const MAX_ATTEMPTS = 3;
const LOCKOUT_DURATION_MS = 5 * 60 * 1000; // 5 minutes

/**
 * A component for 6-digit PIN verification with attempt limiting and lockout.
 * @param {object} props - The component props.
 * @param {Function} props.onPinSuccess - A callback function to execute upon successful verification.
 */
const PinVerification = ({ onPinSuccess }) => {
  // State hooks for managing the component's internal state
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Ensures only numeric input up to 6 digits is allowed
  const handlePinChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 6) {
      setPin(value);
    }
  };

  // Handles the form submission and PIN validation logic
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLocked) {
      setError('Account is locked. Please try again later.');
      return;
    }

    // IMPORTANT: In a real application, the CORRECT_PIN should not be hardcoded.
    // It should be fetched from a secure store and compared using a hashing algorithm.
    const CORRECT_PIN = '123456';

    if (pin === CORRECT_PIN) {
      console.log('PIN Verified Successfully!');
      setError('');
      setAttempts(0);
      if (onPinSuccess) {
        onPinSuccess();
      }
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Lock the account if max attempts are reached
      if (newAttempts >= MAX_ATTEMPTS) {
        setError(`Too many failed attempts. Account locked for 5 minutes.`);
        setIsLocked(true);
        // Reset the lockout after the specified duration
        setTimeout(() => {
          setIsLocked(false);
          setAttempts(0);
          setError('');
        }, LOCKOUT_DURATION_MS);
      } else {
        setError(`Invalid PIN. You have ${MAX_ATTEMPTS - newAttempts} attempts left.`);
      }
    }
    setPin('');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Enter 6-Digit PIN</h2>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          type="password"
          value={pin}
          onChange={handlePinChange}
          maxLength="6"
          className="w-full px-4 py-3 mb-4 text-center text-2xl tracking-[0.5em] bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          placeholder="●●●●●●"
          disabled={isLocked}
          autoComplete="off"
        />
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          disabled={pin.length !== 6 || isLocked}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {isLocked ? 'Locked' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default PinVerification;
