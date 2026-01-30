import React from 'react';
import { Briefcase, Plus, Trash2, GripVertical } from 'lucide-react';
import { Section, Input } from './Shared';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, children }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="flex gap-2">
            <div
                {...attributes}
                {...listeners}
                className="mt-6 text-slate-400 cursor-move hover:text-slate-600 flex flex-col justify-start pt-2"
            >
                <GripVertical size={20} />
            </div>
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
};

const ExperienceList = ({ data, onChange, isOpen, onToggle }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addExperience = () => {
        onChange((prev) => ({
            ...prev,
            experience: [
                ...prev.experience,
                { id: Date.now(), role: '', company: '', date: '', location: '', description: '' },
            ],
        }));
    };

    const removeExperience = (id) => {
        onChange((prev) => ({
            ...prev,
            experience: prev.experience.filter((job) => job.id !== id),
        }));
    };

    const updateExperience = (id, field, value) => {
        onChange((prev) => ({
            ...prev,
            experience: prev.experience.map((job) =>
                job.id === id ? { ...job, [field]: value } : job
            ),
        }));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            onChange((prev) => {
                const oldIndex = prev.experience.findIndex((job) => job.id === active.id);
                const newIndex = prev.experience.findIndex((job) => job.id === over.id);

                return {
                    ...prev,
                    experience: arrayMove(prev.experience, oldIndex, newIndex),
                };
            });
        }
    };

    return (
        <Section title="Experience" icon={<Briefcase size={18} />} isOpen={isOpen} onClick={onToggle}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={data.experience.map(job => job.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {data.experience.map((job) => (
                        <SortableItem key={job.id} id={job.id}>
                            <div className="mb-6 p-4 border border-slate-200 rounded relative group bg-white">
                                <button onClick={() => removeExperience(job.id)} className="absolute top-2 right-2 text-red-500 opacity-60 hover:opacity-100 p-1 z-10">
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 gap-3">
                                    <Input label="Company" value={job.company} onChange={(e) => updateExperience(job.id, 'company', e.target.value)} />
                                    <Input label="Role" value={job.role} onChange={(e) => updateExperience(job.id, 'role', e.target.value)} />
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input label="Location" value={job.location} onChange={(e) => updateExperience(job.id, 'location', e.target.value)} />
                                        <Input label="Date Range" value={job.date} placeholder="e.g. 2020 - Present" onChange={(e) => updateExperience(job.id, 'date', e.target.value)} />
                                    </div>
                                    <textarea
                                        className="w-full p-2 border border-slate-300 rounded focus:ring-2 focus:ring-slate-900 focus:outline-none text-sm"
                                        placeholder="Results and responsibilities..."
                                        value={job.description}
                                        onChange={(e) => updateExperience(job.id, 'description', e.target.value)}
                                    />
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
            <button onClick={addExperience} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900">
                <Plus size={16} /> Add Position
            </button>
        </Section >
    );
};

export default ExperienceList;
