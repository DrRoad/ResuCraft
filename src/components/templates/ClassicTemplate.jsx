import React from 'react';

const ClassicTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, theme } = data;
    const { color } = theme || { color: '#0f172a' };

    return (
        <div className={`w-full bg-white p-8 md:p-12 shadow-lg min-h-[29.7cm] mx-auto text-slate-900 leading-relaxed ${theme?.font || 'font-serif'}`}>
            {/* Header */}
            <header className="text-center border-b-2 pb-4 mb-4" style={{ borderColor: color }}>
                <h1 className="text-3xl font-bold uppercase tracking-wide mb-2" style={{ color }}>{personalInfo.fullName || 'Your Name'}</h1>
                <div className="flex justify-center flex-wrap gap-3 text-sm">
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                    {personalInfo.phone && <span>• {personalInfo.phone}</span>}
                    {personalInfo.email && <span>• {personalInfo.email}</span>}
                    {personalInfo.linkedin && <span>• <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold uppercase border-b mb-2" style={{ borderColor: '#e2e8f0', color }}>Professional Summary</h2>
                    <p className="text-sm text-justify">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold uppercase border-b mb-2" style={{ borderColor: '#e2e8f0', color }}>Experience</h2>
                    <div className="space-y-4">
                        {experience.map((job) => (
                            <div key={job.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{job.company}</h3>
                                    <span className="text-sm italic">{job.date}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="italic text-sm font-semibold">{job.role}</span>
                                    <span className="text-sm">{job.location}</span>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{job.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold uppercase border-b mb-2" style={{ borderColor: '#e2e8f0', color }}>Education</h2>
                    <div className="space-y-4">
                        {education.map((edu) => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-md">{edu.school}</h3>
                                    <span className="text-sm italic">{edu.date}</span>
                                </div>
                                <div className="flex justify-between items-baseline">
                                    <span className="italic text-sm">{edu.degree}</span>
                                    {/* <span className="text-sm">{edu.location}</span> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section className="mb-4">
                    <h2 className="text-lg font-bold uppercase border-b mb-2" style={{ borderColor: '#e2e8f0', color }}>Skills</h2>
                    <div className="text-sm">
                        {skills.join(' • ')}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ClassicTemplate;
