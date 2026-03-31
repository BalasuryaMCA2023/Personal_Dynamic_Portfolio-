import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="p-[1px] rounded-2xl bg-white/5 animate-pulse">
            <div className="bg-gray-900 rounded-2xl overflow-hidden h-full flex flex-col">
                <div className="h-48 bg-white/10 w-full"></div>
                <div className="p-5 flex flex-col flex-grow">
                    <div className="h-6 bg-white/10 rounded-md w-3/4 mb-4"></div>
                    <div className="h-4 bg-white/5 rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-white/5 rounded-md w-full mb-2"></div>
                    <div className="h-4 bg-white/5 rounded-md w-2/3"></div>
                    <div className="mt-auto pt-4">
                        <div className="h-4 bg-white/10 rounded-md w-24"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
