'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };

        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("transitionend", handler);
    }, []);

    const onClickInstall = (e: React.MouseEvent) => {
        e.preventDefault();
        if (!promptInstall) {
            return;
        }
        promptInstall.prompt();
    };

    if (!supportsPWA || isDismissed) {
        return null;
    }

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50 md:hidden">
            <div className="bg-blue-600 rounded-xl p-4 shadow-lg text-white flex items-center justify-between animate-in slide-in-from-bottom-5">
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Download className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">Install App GIS Portal</h4>
                        <p className="text-xs text-blue-100 mt-0.5">Akses lebih cepat & mudah</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={onClickInstall}
                        className="bg-white text-blue-600 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm"
                    >
                        Install
                    </button>
                    <button 
                        onClick={() => setIsDismissed(true)}
                        className="p-1.5 text-blue-200 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
