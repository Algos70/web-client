import React from 'react';

interface ClearCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isClearing: boolean;
}

export default function ClearCartModal({
  isOpen,
  onClose,
  onConfirm,
  isClearing
}: ClearCartModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Clear Cart</h3>
            <p className="text-sm text-gray-500">This action cannot be undone</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700">
            Are you sure you want to clear your cart? All items will be removed.
          </p>
        </div>

        <div className="flex space-x-3 justify-end">
          <button
            onClick={onClose}
            disabled={isClearing}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 hover:cursor-pointer rounded-lg transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isClearing}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 hover:cursor-pointer rounded-lg transition-colors disabled:opacity-50 flex items-center"
          >
            {isClearing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Clearing...
              </>
            ) : (
              'Clear Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}