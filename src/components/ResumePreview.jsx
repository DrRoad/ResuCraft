import React, { forwardRef } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';

const ResumePreview = forwardRef(({ data }, ref) => {
    const { theme } = data;
    const Template = theme?.template === 'modern' ? ModernTemplate : ClassicTemplate;

    return (
        <div ref={ref} style={{ width: '210mm', minHeight: '297mm' }}>
            <Template data={data} />
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
