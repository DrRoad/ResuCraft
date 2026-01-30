import React from 'react';
import { FileText } from 'lucide-react';
import { Section } from './Shared';


const Summary = ({ data, onChange, isOpen, onToggle }) => {
    const handleChange = (e) => {
        onChange((prev) => ({ ...prev, summary: e.target.value }));
    };

    return (
        <Section title="Professional Summary" icon={<FileText size={18} />} isOpen={isOpen} onClick={onToggle}>
            <textarea
                className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none min-h-[120px]"
                placeholder="Write a brief professional summary..."
                value={data.summary}
                onChange={handleChange}
            />
        </Section>
    );
};

export default Summary;
