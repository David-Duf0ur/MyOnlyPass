import { useEffect, useState } from "react";
import Button from "../globalcomponents/Button";

interface StockProps {
    setShowModalStock: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Stock({ setShowModalStock }: StockProps) {
    const [reload, setReload] = useState(false);
    const [btcValue, setBtcValue] = useState<number | null>(null);
    const [ethValue, setEthValue] = useState<number | null>(null);
    const [status, setStatus] = useState<boolean>(false);

    const btcFetch = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setBtcValue(data.bitcoin.usd);
            setEthValue(data.ethereum.usd);
        } catch (error) {
            console.error("Error fetching BTC value:", error);
        }
    };

    const statusFetch = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/ping');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setStatus(true)
        } catch (error) {
            console.error("Error fetching status:", error);
        }
    };

    useEffect(() => {
        btcFetch()
    }, [reload]);

    useEffect(() => {
        statusFetch()
    }, []);

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
                <div className="bg-white rounded-lg min-w-[400px]">
                    <div className='flex items-center justify-between mb-6 p-2 relative bg-gray-200 rounded-t-lg'>
                        <h2 className="text-lg font-bold">Stock Exchange</h2>
                        <button onClick={() => setShowModalStock(false)} className="px-[6px] py-[2px] bg-blue-500 hover:bg-red-400 text-white rounded cursor-pointer">X</button>
                    </div>
                    <div className='flex flex-col m-2 gap-2'>
                        <p>Status: {status ? "Online" : "Offline"}</p>
                        <div>
                            <h3>BTC</h3>
                            <p>Value : {btcValue} $</p>
                        </div>
                        <div>
                            <h3>ETH</h3>
                            <p>Value : {ethValue} $</p>
                        </div>
                        <Button onClick={() => setReload(prevReload => !prevReload)} buttonName="Reload" />
                    </div>
                    <p className='text-center bg-gray-200 p-1 rounded-b-lg'>MOP - 2025</p>
                </div>
            </div>
        </>
    )
}