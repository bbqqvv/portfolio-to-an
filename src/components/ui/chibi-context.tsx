"use client"

import React, { createContext, useContext } from "react"
import { useTheme } from "next-themes"
import { ChibiBackground } from "./chibi-background"

interface ChibiContextType {
    theme: string | undefined
}

const ChibiContext = createContext<ChibiContextType | undefined>(undefined)

export function useChibi() {
    const context = useContext(ChibiContext)
    if (!context) throw new Error("useChibi must be used within a ChibiProvider")
    return context
}

interface ChibiProviderProps {
    children: React.ReactNode
}

export function ChibiProvider({ children }: ChibiProviderProps) {
    const { theme } = useTheme()

    return (
        <ChibiContext.Provider value={{ theme }}>
            <ChibiBackground />
            {children}
        </ChibiContext.Provider>
    )
}
