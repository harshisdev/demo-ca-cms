"use client";

export default function SuccessPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-all duration-300">
      <div className="bg-white p-8 rounded-2xl text-center max-w-sm w-full mx-4 animate-scaleIn">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Thank You!</h2>

        <p>Your enquiry has been submitted successfully.</p>

        <button
          onClick={onClose}
          className="mt-6 bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
