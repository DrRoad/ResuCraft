import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Section = ({ title, icon, isOpen, onClick, children }) => (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
        <button onClick={onClick} className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex items-center gap-3 font-semibold text-slate-700">
                {icon}
                <span>{title}</span>
            </div>
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isOpen && <div className="p-4 bg-white border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200">{children}</div>}
    </div>
);

export const Input = ({ label, name, value, onChange, placeholder }) => (
    <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm"
        />
    </div>
);
