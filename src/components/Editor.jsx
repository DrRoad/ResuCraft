import React, { useState } from 'react';
import Design from './editor/Design';
import PersonalDetails from './editor/PersonalDetails';
import Summary from './editor/Summary';
import ExperienceList from './editor/ExperienceList';
import EducationList from './editor/EducationList';
import SkillsList from './editor/SkillsList';

const Editor = ({ data, onChange }) => {
    const [activeSection, setActiveSection] = useState('design'); // Default to Design to show off feature

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
            <div className="bg-slate-900 text-white p-4 font-bold text-xl sticky top-0 z-10">
                Editor
            </div>
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
                <Design
                    data={data}
                    onChange={onChange}
                    isOpen={activeSection === 'design'}
                    onToggle={() => toggleSection('design')}
                />
                <PersonalDetails
                    data={data}
                    onChange={onChange}
                    isOpen={activeSection === 'personal'}
                    onToggle={() => toggleSection('personal')}
                />

                <Summary
                    data={data}
                    onChange={onChange}
                    isOpen={activeSection === 'summary'}
                    onToggle={() => toggleSection('summary')}
                />

                <ExperienceList
                    data={data}
                    onChange={onChange}
                    isOpen={activeSection === 'experience'}
                    onToggle={() => toggleSection('experience')}
                />

                <EducationList
                    data={data}
                    onChange={onChange}
                    isOpen={activeSection === 'education'}
                    onToggle={() => toggleSection('education')}
                />

                <SkillsList
                    data={data}
                    onChange={onChange}
                    isOpen={activeSection === 'skills'}
                    onToggle={() => toggleSection('skills')}
                />
            </div>
        </div>
    );
};

export default Editor;
