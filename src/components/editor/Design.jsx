import React from 'react';
import { Palette } from 'lucide-react';
import { Section } from './Shared';

const Design = ({ data, onChange, isOpen, onToggle }) => {

    const colors = [
        '#0f172a', // Slate - Default
        '#2563eb', // Blue
        '#dc2626', // Red
        '#16a34a', // Green
        '#7c3aed', // Violet
        '#ea580c', // Orange
    ];

    const fonts = [
        { name: 'Serif (Classic)', value: 'font-serif' },
        { name: 'Sans (Modern)', value: 'font-sans' },
        { name: 'Mono (Tech)', value: 'font-mono' },
    ];

    const handleColorChange = (color) => {
        onChange((prev) => ({
            ...prev,
            theme: { ...prev.theme, color }
        }));
    };

    const handleFontChange = (e) => {
        onChange((prev) => ({
            ...prev,
            theme: { ...prev.theme, font: e.target.value }
        }));
    };

    const currentColor = data.theme?.color || '#0f172a';
    const currentFont = data.theme?.font || 'font-serif';

    return (
        <Section title="Design & Appearance" icon={<Palette size={18} />} isOpen={isOpen} onClick={onToggle}>
            <div className="space-y-4">
                {/* Template Selector */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Template</label>
                    <div className="grid grid-cols-2 gap-2">
                        <button
                            onClick={() => onChange(prev => ({ ...prev, theme: { ...prev.theme, template: 'classic' } }))}
                            className={`p-3 border rounded-md text-sm font-medium transition-all ${data.theme?.template === 'classic'
                                    ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-sm'
                                    : 'border-slate-200 hover:border-slate-400 text-slate-600'
                                }`}
                        >
                            Classic
                        </button>
                        <button
                            onClick={() => onChange(prev => ({ ...prev, theme: { ...prev.theme, template: 'modern' } }))}
                            className={`p-3 border rounded-md text-sm font-medium transition-all ${data.theme?.template === 'modern'
                                    ? 'border-slate-900 bg-slate-50 text-slate-900 shadow-sm'
                                    : 'border-slate-200 hover:border-slate-400 text-slate-600'
                                }`}
                        >
                            Modern
                        </button>
                    </div>
                </div>

                <div className="h-px bg-slate-100 my-4"></div>

                {/* Color Picker */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Accent Color</label>
                    <div className="flex gap-3 flex-wrap">
                        {colors.map((c) => (
                            <button
                                key={c}
                                onClick={() => handleColorChange(c)}
                                className={`w-8 h-8 rounded-full border-2 transition-all ${currentColor === c ? 'border-slate-900 scale-110 shadow-sm' : 'border-transparent hover:scale-110'
                                    }`}
                                style={{ backgroundColor: c }}
                                aria-label={`Select color ${c}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Font Selector */}
                <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">Typography</label>
                    <select
                        value={currentFont}
                        onChange={handleFontChange}
                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm bg-white"
                    >
                        {fonts.map((f) => (
                            <option key={f.value} value={f.value}>{f.name}</option>
                        ))}
                    </select>
                </div>
            </div>
        </Section>
    );
};

export default Design;
