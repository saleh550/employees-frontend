import React from 'react';

const WorkLogsLoadingCards: React.FC = () => {


    return (
        <div className="space-y-3 mx-2">
            {Array.from({ length: 5 }).map((_, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl bg-gray-200 animate-pulse shadow-sm border border-gray-300"
                >
                    {/* Date Circle */}
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-blue-500 to-green-400 text-white text-sm font-bold">
                    
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>

                    {/* Amount */}
                    <div className="text-right">
                        <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
                        <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkLogsLoadingCards;