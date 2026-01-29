import React from 'react';
import { GraduationCap, Plus, Trash2, GripVertical } from 'lucide-react';
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

const EducationList = ({ data, onChange, isOpen, onToggle }) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addEducation = () => {
        onChange((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                { id: Date.now(), degree: '', school: '', date: '' },
            ],
        }));
    };

    const removeEducation = (id) => {
        onChange((prev) => ({
            ...prev,
            education: prev.education.filter((edu) => edu.id !== id),
        }));
    };

    const updateEducation = (id, field, value) => {
        onChange((prev) => ({
            ...prev,
            education: prev.education.map((edu) =>
                edu.id === id ? { ...edu, [field]: value } : edu
            ),
        }));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            onChange((prev) => {
                const oldIndex = prev.education.findIndex((edu) => edu.id === active.id);
                const newIndex = prev.education.findIndex((edu) => edu.id === over.id);

                return {
                    ...prev,
                    education: arrayMove(prev.education, oldIndex, newIndex),
                };
            });
        }
    };

    return (
        <Section title="Education" icon={<GraduationCap size={18} />} isOpen={isOpen} onClick={onToggle}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={data.education.map(edu => edu.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {data.education.map((edu) => (
                        <SortableItem key={edu.id} id={edu.id}>
                            <div className="mb-4 p-4 border border-slate-200 rounded relative group bg-white">
                                <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 opacity-60 hover:opacity-100 p-1 z-10">
                                    <Trash2 size={16} />
                                </button>
                                <div className="grid grid-cols-1 gap-3">
                                    <Input label="School / University" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} />
                                    <Input label="Degree / Major" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} />
                                    <Input label="Date / Year" value={edu.date} onChange={(e) => updateEducation(edu.id, 'date', e.target.value)} />
                                </div>
                            </div>
                        </SortableItem>
                    ))}
                </SortableContext>
            </DndContext>
            <button onClick={addEducation} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-slate-900">
                <Plus size={16} /> Add Education
            </button>
        </Section>
    );
};

export default EducationList;
