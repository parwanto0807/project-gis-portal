'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);
    const [isDismissed, setIsDismissed] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [deviceType, setDeviceType] = useState<"ios" | "android" | "other">("other");

    useEffect(() => {
        // Deteksi apakah aplikasi sudah diinstall (berjalan di mode standalone)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;
        if (isStandalone) {
            setIsInstalled(true);
            return;
        }

        const ua = window.navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(ua);
        const isAndroid = /android/.test(ua);
        if (isIOS) setDeviceType("ios");
        else if (isAndroid) setDeviceType("android");
        
        if (isIOS || isAndroid) {
            setIsMobile(true);
        }

        const handler = (e: any) => {
            // Mencegah Chrome memunculkan mini-infobar bawaan
            e.preventDefault();
            setSupportsPWA(true);
            setPromptInstall(e);
        };
        // Check if the event fired before this component mounted
        if (typeof window !== 'undefined' && (window as any).deferredPrompt) {
            handler((window as any).deferredPrompt);
        }

        const onAppInstalled = () => {
            setIsInstalled(true);
            setSupportsPWA(false);
        };

        window.addEventListener("beforeinstallprompt", handler);
        window.addEventListener("appinstalled", onAppInstalled);

        return () => {
            window.removeEventListener("beforeinstallprompt", handler);
            window.removeEventListener("appinstalled", onAppInstalled);
        };
    }, []);

    const onClickInstall = (e: React.MouseEvent) => {
        e.preventDefault();
        if (promptInstall) {
            promptInstall.prompt();
        } else {
            if (deviceType === "ios") {
                alert("Untuk install di iOS/iPhone:\n\n1. Tap ikon 'Share' (kotak dengan panah ke atas) di bawah layar Safari.\n2. Scroll ke bawah dan pilih 'Add to Home Screen' (Tambahkan ke Layar Utama).");
            } else {
                alert("Untuk install di Android:\n\nTap ikon Menu (titik tiga ⋮) di pojok kanan atas browser Chrome Anda, lalu pilih 'Install App' atau 'Tambahkan ke Layar Utama'.");
            }
        }
    };

    if (isDismissed || isInstalled || (!supportsPWA && !isMobile)) {
        return null;
    }

    return (
        <div className="fixed bottom-20 left-4 right-4 z-50">
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
