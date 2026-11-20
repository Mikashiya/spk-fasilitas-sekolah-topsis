"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    ChevronDown,
    ChevronRight,
} from "lucide-react"

interface ContainerProps {
    children: React.ReactNode,
}

export default function Container({children}:ContainerProps) {
    const [buttonOne, setButtonOne] = useState(true)

    const pathname = usePathname()

    return (
        <div className="w-full h-full flex flex-row bg-background text-foreground relative">
            <aside className="w-64 h-full fixed overflow-y-auto py-32 md:px-8 shadow-md not-md:w-0 overflow-hidden">
                <nav className="flex flex-col gap-3 text-sm bg-background">
                    <div className="w-full h-auto">
                        <span className="rounded flex items-center">
                            <Link 
                                href={'/#data_provinsi_2025'} 
                                className="w-full font-semibold whitespace-nowrap hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded p-2"
                            >
                                TOPSIS - Data 2025
                            </Link>
                            <button onClick={() => setButtonOne(!buttonOne)} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded p-2">
                                <ChevronDown className={`${buttonOne ? 'rotate-0' : '-rotate-90'} transition-all size-3`} />
                            </button>
                        </span>
                        <div className={`${buttonOne ? 'flex' : 'hidden'} transition-all ml-6 flex-col gap-1.5`}>
                            <Link href={'/#data_provinsi_2025'} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-1 rounded">
                                Data Provinsi
                            </Link>
                            <Link href={'/#data_kriteria_2025'} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-1 rounded">
                                Data Kriteria
                            </Link>
                            <Link href={'/#hasil_perhitungan_2025'} className="hover:bg-zinc-100 dark:hover:bg-zinc-700 p-1 rounded">
                                Hasil Perhitungan
                            </Link>
                        </div>
                    </div>
                </nav>
            </aside>
            <main className="md:pl-64 w-full min-h-screen flex flex-col gap-6 overflow-auto text-sm">
                {children}
            </main>
        </div>
    )
}