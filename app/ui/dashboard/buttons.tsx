'use client';
import { PencilIcon } from '@heroicons/react/24/outline';
import { strecka } from '@/app/lib/actions';
import flattis from '@/app/icons/favicon.ico'
import Image from 'next/image';
import { useState } from 'react';

export function Strecka({ id, role }: { id: string, role: string}) {
  const streckaID = strecka.bind(null, id);
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (role === "Killing" || role === "Inaktiv") {
    return (
      <div>
        Du har inte rätt att strecka
      </div>
    )
  }

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Properly cast the element to HTMLFormElement
    const form = document.getElementById('strecka-form') as HTMLFormElement;
    if (form) {
      form.requestSubmit(); // Use regular submit instead of requestSubmit
    }
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <>
      <form id="strecka-form" action={streckaID}>
        <button 
          onClick={handleButtonClick}
          className='flex h-16 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        >
          <span className="hidden md:block mr-4 text-lg">Strecka</span>{' '}
          <Image
            src={flattis}
            className="mr-2 flex"
            width={60}
            height={60}
            alt='.'
          />
        </button>
      </form>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4">Bekräfta streckning</h3>
            <p className="mb-6">Är du säker på att du vill strecka?</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              >
                Avbryt
              </button>
              <button 
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
              >
                Bekräfta
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}