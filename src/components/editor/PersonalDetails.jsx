import React from 'react';
import { User } from 'lucide-react';
import { Section, Input } from './Shared';

const PersonalDetails = ({ data, onChange, isOpen, onToggle }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange((prev) => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value },
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onChange((prev) => ({
                    ...prev,
                    personalInfo: { ...prev.personalInfo, photo: reader.result },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Section title="Personal Details" icon={<User size={18} />} isOpen={isOpen} onClick={onToggle}>
            <div className="grid grid-cols-1 gap-4 mb-4">
                <div className="flex items-center gap-4">
                    {data.personalInfo.photo && (
                        <img src={data.personalInfo.photo} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-slate-200" />
                    )}
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded text-sm font-medium transition-colors">
                        {data.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
                        <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                    </label>
                    {data.personalInfo.photo && (
                        <button
                            onClick={() => onChange(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, photo: null } }))}
                            className="text-sm text-red-500 hover:text-red-700"
                        >
                            Remove
                        </button>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Full Name" name="fullName" value={data.personalInfo.fullName} onChange={handleChange} />
                <Input label="Role / Title" name="role" value={data.personalInfo.role} onChange={handleChange} />
                <Input label="Email" name="email" value={data.personalInfo.email} onChange={handleChange} />
                <Input label="Phone" name="phone" value={data.personalInfo.phone} onChange={handleChange} />
                <Input label="LinkedIn URL" name="linkedin" value={data.personalInfo.linkedin} onChange={handleChange} />
                <Input label="Location" name="location" value={data.personalInfo.location} onChange={handleChange} />
            </div>
        </Section>
    );
};

export default PersonalDetails;
