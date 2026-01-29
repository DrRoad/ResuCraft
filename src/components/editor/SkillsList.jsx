import React, { useState } from 'react';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import { Section } from './Shared';

const SkillsList = ({ data, onChange, isOpen, onToggle }) => {
    const [skillInput, setSkillInput] = useState('');

    const addSkill = () => {
        if (skillInput.trim()) {
            onChange((prev) => ({
                ...prev,
                skills: [...prev.skills, skillInput.trim()],
            }));
            setSkillInput('');
        }
    };

    const removeSkill = (skillToRemove) => {
        onChange((prev) => ({
            ...prev,
            skills: prev.skills.filter((skill) => skill !== skillToRemove),
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    }

    return (
        <Section title="Skills" icon={<Wrench size={18} />} isOpen={isOpen} onClick={onToggle}>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="flex-1 p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none"
                    placeholder="Add a skill..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={addSkill} className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800">
                    <Plus size={20} />
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {data.skills.map((skill, index) => (
                    <span key={index} className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-slate-200">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="hover:text-red-500"><Trash2 size={14} /></button>
                    </span>
                ))}
            </div>
        </Section>
    );
};

export default SkillsList;
