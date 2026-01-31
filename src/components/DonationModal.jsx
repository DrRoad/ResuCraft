import React, { useState } from 'react';
import { Coffee, X, Heart } from 'lucide-react';

const DonationModal = ({ isOpen, onClose }) => {
    const [selectedAmount, setSelectedAmount] = useState(5);
    const [customAmount, setCustomAmount] = useState('');
    const [showThankYou, setShowThankYou] = useState(false);

    if (!isOpen) return null;

    const presetAmounts = [2, 5, 10];

    const handleDonate = () => {
        const amount = customAmount || selectedAmount;
        // In a real implementation, this would integrate with a payment processor
        // For now, we'll open Buy Me a Coffee link
        const buyMeACoffeeUrl = `https://www.buymeacoffee.com/drroad?amount=${amount}`;

        // Show thank you message
        setShowThankYou(true);

        // Open payment link in new tab
        window.open(buyMeACoffeeUrl, '_blank');

        // Reset after 2 seconds
        setTimeout(() => {
            setShowThankYou(false);
            onClose();
        }, 2000);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-fadeIn">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Close"
                >
                    <X size={24} />
                </button>

                {!showThankYou ? (
                    <>
                        {/* Header */}
                        <div className="text-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
                                <Coffee size={32} className="text-amber-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-2">Support ResuCraft</h2>
                            <p className="text-slate-600">
                                Help keep this tool free and ad-free for everyone! Your support means the world.
                            </p>
                        </div>

                        {/* Preset amounts */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                Choose an amount:
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {presetAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => {
                                            setSelectedAmount(amount);
                                            setCustomAmount('');
                                        }}
                                        className={`py-3 px-4 rounded-lg font-semibold transition-all ${selectedAmount === amount && !customAmount
                                            ? 'bg-amber-500 text-white shadow-md scale-105'
                                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        ${amount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom amount */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Or enter a custom amount ($2-$10):
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
                                    $
                                </span>
                                <input
                                    type="number"
                                    min="2"
                                    max="10"
                                    step="1"
                                    value={customAmount}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '' || (Number(value) >= 2 && Number(value) <= 10)) {
                                            setCustomAmount(value);
                                            setSelectedAmount(null);
                                        }
                                    }}
                                    placeholder="Enter amount"
                                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                                />
                            </div>
                        </div>

                        {/* Donate button */}
                        <button
                            onClick={handleDonate}
                            disabled={!selectedAmount && !customAmount}
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Coffee size={20} />
                            Buy Me a Coffee - ${customAmount || selectedAmount}
                        </button>

                        {/* Privacy note */}
                        <p className="text-xs text-slate-500 text-center mt-4">
                            You'll be redirected to a secure payment page. ResuCraft doesn't store any payment information.
                        </p>
                    </>
                ) : (
                    /* Thank you message */
                    <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                            <Heart size={40} className="text-green-600 animate-pulse" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You! ❤️</h3>
                        <p className="text-slate-600">
                            Your support helps keep ResuCraft free for everyone!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DonationModal;
