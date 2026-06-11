'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
    const [supportsPWA, setSupportsPWA] = useState(false);
    const [promptInstall, setPromptInstall] = useState<any>(null);
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

    if (isInstalled || (!supportsPWA && !isMobile)) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-sm p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                    <Download className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-lg">Install Aplikasi GIS Portal</h4>
                    <p className="text-sm text-blue-100">Akses lebih cepat & mudah layaknya aplikasi Native di perangkat Anda.</p>
                </div>
            </div>
            <button 
                onClick={onClickInstall}
                className="bg-white text-blue-600 hover:bg-gray-50 px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors w-full sm:w-auto text-sm"
            >
                Install Sekarang
            </button>
        </div>
    );
}
