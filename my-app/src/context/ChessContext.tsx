import React, { createContext, ReactNode } from 'react';
import { UserData } from "@/types";

interface ChessContextType {
    stats: UserData | null;
}

const ChessContext = createContext<ChessContextType | null>(null);
export const ChessProvider: React.FC<{ children: ReactNode; stats: UserData }> = ({children, stats}) => {
    return (
        <ChessContext.Provider value={{ stats }}>
            {children}
        </ChessContext.Provider>
    );
};