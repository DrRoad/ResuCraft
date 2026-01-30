import React from 'react';


const ModernTemplate = ({ data }) => {
    const { personalInfo, summary, experience, education, skills, theme } = data;
    const { color } = theme || { color: '#0f172a' };
    const font = theme?.font || 'font-sans';

    return (
        <div className={`w-full max-w-[210mm] bg-white shadow-lg min-h-[29.7cm] mx-auto text-slate-800 flex ${font}`} style={{ minHeight: '297mm' }}>
            {/* Left Sidebar */}
            <div className="w-[30%] bg-slate-50 border-r border-slate-200 p-6 flex flex-col gap-6" style={{ backgroundColor: `${color}10` }}>

                {/* Contact Info */}
                <div className="text-center">
                    {personalInfo.photo ? (
                        <img
                            src={personalInfo.photo}
                            alt={personalInfo.fullName}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                            style={{ borderColor: `${color}40` }}
                        />
                    ) : (
                        <div className="w-24 h-24 bg-slate-200 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-slate-400 font-bold overflow-hidden" style={{ backgroundColor: `${color}20`, color: color }}>
                            {personalInfo.fullName ? personalInfo.fullName[0] : 'U'}
                        </div>
                    )}
                </div>

                <div className="text-sm space-y-3">
                    <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color, borderColor: `${color}40` }}>Contact</h3>
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.email && <div className="break-words">{personalInfo.email}</div>}
                    {personalInfo.linkedin && <div><a href={personalInfo.linkedin} className="hover:underline text-blue-600">LinkedIn</a></div>}
                </div>

                {/* Education */}
                {education.length > 0 && (
                    <div className="text-sm">
                        <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color, borderColor: `${color}40` }}>Education</h3>
                        <div className="space-y-3">
                            {education.map((edu) => (
                                <div key={edu.id}>
                                    <div className="font-semibold">{edu.school}</div>
                                    <div className="italic text-xs mb-1">{edu.degree}</div>
                                    <div className="text-xs text-slate-500">{edu.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {skills.length > 0 && (
                    <div className="text-sm">
                        <h3 className="font-bold uppercase tracking-wider border-b pb-1 mb-2" style={{ color, borderColor: `${color}40` }}>Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <span key={index} className="bg-white px-2 py-1 rounded border text-xs" style={{ borderColor: `${color}40` }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Right Main Content */}
            <div className="w-[70%] p-8 flex flex-col gap-6">

                {/* Header Name/Role */}
                <div className="border-b-2 pb-6" style={{ borderColor: color }}>
                    <h1 className="text-4xl font-bold uppercase tracking-tight mb-2" style={{ color }}>{personalInfo.fullName || 'Your Name'}</h1>
                    <div className="text-xl font-medium text-slate-500">{personalInfo.role}</div>
                </div>

                {/* Summary */}
                {summary && (
                    <div>
                        <h2 className="text-xl font-bold uppercase mb-3 flex items-center gap-2" style={{ color }}>
                            <span className="w-2 h-8 rounded-sm" style={{ backgroundColor: color }}></span>
                            Summary
                        </h2>
                        <p className="text-sm leading-relaxed text-justify text-slate-700">{summary}</p>
                    </div>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <div>
                        <h2 className="text-xl font-bold uppercase mb-4 flex items-center gap-2" style={{ color }}>
                            <span className="w-2 h-8 rounded-sm" style={{ backgroundColor: color }}></span>
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map((job) => (
                                <div key={job.id} className="relative pl-4 border-l-2 border-slate-100">
                                    <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg text-slate-800">{job.company}</h3>
                                        <span className="text-sm font-medium px-2 py-1 rounded bg-slate-100 text-slate-600">{job.date}</span>
                                    </div>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <span className="font-semibold text-slate-600" style={{ color: `${color}CC` }}>{job.role}</span>
                                        <span className="text-sm text-slate-400">{job.location}</span>
                                    </div>
                                    <p className="text-sm whitespace-pre-wrap text-slate-600 leading-relaxed">{job.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ModernTemplate;
