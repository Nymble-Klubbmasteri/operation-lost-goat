'use client';
import { PencilIcon } from '@heroicons/react/24/outline';
import { strecka } from '@/app/lib/actions';
import can from '@/app/icons/favicon-96x96.png'
import Image from 'next/image';
import { useState } from 'react';

export function Strecka({ id, role }: { id: string, role: string}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [amount, setAmount] = useState(1); // Default amount is 1
  
  // This will bind the user ID and amount to the strecka function
  const handleStrecka = async (formData: FormData) => {
    // Get the amount from the form data
    const streckAmount = formData.get('amount') as string;
    // Call your strecka function with the user ID and amount
    setShowConfirmation(false);
    return strecka(id, parseInt(streckAmount));
  };

  if (role === "Killing" || role === "Inaktiv" || role === "Utesluten") {
    return (
      <div>
        Du får tyvärr inte strecka. Skill Issue
      </div>
    )
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    // Ensure amount is between 1 and 1000
    setAmount(Math.max(0, Math.min(1000, value || 1)));
  };

  return (
    <>
      <button 
        onClick={handleButtonClick}
        className='flex h-16 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
      >
        <span className="hidden md:block mr-4 text-lg">Strecka</span>{' '}
        <Image
          src={can}
          className="mr-2 flex"
          width={60}
          height={60}
          alt='.'
        />
      </button>

      {/* Confirmation Modal with Form */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Bekräfta streckning</h3>
            
            <form action={handleStrecka}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Antal streck:
                </label>
                <div className="flex items-center">
                  <button 
                    type="button"
                    onClick={() => setAmount(prev => Math.max(0, prev - 1))}
                    className="px-3 py-1 bg-gray-200 rounded-l-md"
                  >
                    -
                  </button>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    max="10"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-16 text-center border-t border-b border-gray-300 py-1"
                  />
                  <button 
                    type="button"
                    onClick={() => setAmount(prev => Math.min(1000, prev + 1))}
                    className="px-3 py-1 bg-gray-200 rounded-r-md"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <p className="mb-6">Är du säker på att du vill strecka {amount} gång(er)?</p>
              
              <div className="flex justify-end space-x-3">
                <button 
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  Avbryt
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  Bekräfta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}