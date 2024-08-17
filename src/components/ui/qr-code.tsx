import {useEffect, useState} from "react";
import QRCodeStyling, {Options} from "qr-code-styling";
import {toDeepLink} from "@/lib/uri.ts";
import {WalletManager} from "@txnlab/use-wallet-react";

type WalletManagerProps = {
    manager: WalletManager
}

export function QRCode({manager}: WalletManagerProps) {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null)
    useEffect(() => {
        if(!manager.activeAddress) return;
        const isDark = document.documentElement.classList.contains('dark')
        const theme: {[k: string]: Options} = {
            dark : {
                backgroundOptions: {
                    color: "#a7d4b3",
                },
                dotsOptions: {
                    type: 'extra-rounded',
                    gradient: {
                        type: 'radial',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: '#000000' },
                            { offset: 1, color: '#1a4027' },
                        ],
                    },
                },
                cornersSquareOptions: {
                    color: '#000000'
                },
                cornersDotOptions: {
                    type: 'dot',
                    color: '#000000'
                },
            },
            light: {
                backgroundOptions: {
                    color: "transparent",
                },
                dotsOptions: {
                    type: 'extra-rounded',
                    gradient: {
                        type: 'radial',
                        rotation: 0,
                        colorStops: [
                            { offset: 0, color: '#a7d4b3' },
                            { offset: 1, color: '#1a4027' },
                        ],
                    },
                },
                cornersSquareOptions: {
                    color: '#000000'
                },
                cornersDotOptions: {
                    type: 'dot',
                    color: '#000000'
                },
            }
        }
        const qr = new QRCodeStyling({
            width: 500,
            height: 500,
            type: 'svg',
            data: toDeepLink({address: manager.activeAddress}),
            margin: 10,
            imageOptions: { hideBackgroundDots: true, imageSize: 0.4, margin: 15 },
            backgroundOptions: isDark ? theme.dark.backgroundOptions : theme.light.backgroundOptions,
            dotsOptions: isDark ? theme.dark.dotsOptions : theme.light.dotsOptions,
            image: '/tauri.svg',
            cornersSquareOptions: isDark ? theme.dark.cornersSquareOptions : theme.light.cornersSquareOptions,
            cornersDotOptions: isDark ? theme.dark.cornersDotOptions : theme.light.cornersDotOptions,
        })
        qr.getRawData('png').then((blob) => {
            if (!blob || !(blob instanceof Blob)) throw new TypeError('Could not get qrcode blob');
            setQrCodeData(URL.createObjectURL(blob));
        }).catch(e=>{console.error(e)})
    }, [manager.activeAccount]);

    if(qrCodeData) {
        return <img src={qrCodeData} alt="Algorand QRCode"/>
    }
    return <></>
}
