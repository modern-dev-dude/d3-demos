import * as React from 'react';

interface CardWrapperProps {
    children: React.ReactNode;
}

export default function CardWrapper({children}:CardWrapperProps){
    return(
        <div className="border-2 border-slate-50 rounded shadow-xl p-2">
            {children}
        </div>
    )
}