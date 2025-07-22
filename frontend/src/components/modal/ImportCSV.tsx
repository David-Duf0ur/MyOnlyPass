import { useState } from "react";
import Button from "../globalcomponents/Button";

interface ImportCSVProps {
    setShowModalImportCSV: React.Dispatch<React.SetStateAction<boolean>>;
}

const HEADER_CSV_REF = [
    "_id",
    "vaultId",
    "title",
    "category",
    "userId",
    "passwordEncrypted",
    "mail",
    "url",
    "favorite",
    "iconify",
    "created_at",
    "updated_at",
];

export default function Stock({ setShowModalImportCSV }: ImportCSVProps) {
    const [csvDataImport, setCsvDataImport] = useState<string>("");
    const [csvParsedData, setCsvParsedData] = useState<string[][]>([]);
    const [error, setError] = useState<string>("");

    const handleImport = async (csv: string) => {
        const header = csv.split("\n")[0].split(",");

        if (header.length !== HEADER_CSV_REF.length || !HEADER_CSV_REF.every((h, i) => h === header[i])) {
            setError("CSV header does not match expected format.");
            return
        };

        setError("");
        const rows = csv.split("\n").slice(1).map(row => row.split(","));
        console.log(rows)
        setCsvParsedData(rows);
        // setShowModalImportCSV(false);
    };


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500/50">
                <div className="bg-white rounded-lg min-w-[600px] max-h-screen overflow-y-auto">
                    <div className='flex items-center justify-between mb-6 p-2 relative bg-gray-200 rounded-t-lg'>
                        <h2 className="text-lg font-bold">ImportCSV</h2>
                        <button onClick={() => setShowModalImportCSV(false)} className="px-[6px] py-[2px] bg-blue-500 hover:bg-red-400 text-white rounded cursor-pointer">X</button>
                    </div>
                    <div className="p-2 flex flex-col gap-2">
                        <p>Data to import : </p>
                        <p>Format : _id | vaultId | title | category | userId | passwordEncrypted | mail | url | favorite | iconify | created_at | updated_at </p>

                        <div className="flex gap-2 items-center justify-center">
                            <div className="flex flex-col">
                                <p>CSV</p>
                                <input type="radio" name="" id="" />
                            </div>
                            <div className="flex flex-col">
                                <p>Backup</p>
                                <input type="radio" name="" id="" />
                            </div>
                        </div>
                        <p>Header format : </p>
                        <textarea onChange={(e) => {
                            setCsvDataImport(e.target.value);
                        }} name="" id="" className="w-full h-48 p-2 border border-gray-300  mt-2" />
                        <div className="self-center">
                            <Button buttonName="Import" onClick={() => handleImport(csvDataImport)} />
                        </div>
                        <p className="text-red-500">{error}</p>
                        {csvParsedData.length > 0 && (
                            <>
                                <div className="border-b-2 border-black"></div>
                                < textarea
                                    className="w-full h-auto p-2 border border-green-500 mt-2"
                                    value={csvParsedData[0]}
                                    readOnly
                                />
                                <p>Data parsed : </p>
                                {csvParsedData.map((row) => (
                                    <>
                                        < textarea
                                            className="w-full h-auto p-2 border border-gray-300 mt-2"
                                            value={row}
                                            readOnly
                                        />
                                    </>
                                ))}
                                <div className="self-center">
                                    <Button buttonName="Save" />
                                </div>
                            </>
                        )}
                    </div>
                    <p className='text-center bg-gray-200 p-1 rounded-b-lg'>MOP - 2025</p>
                </div>
            </div >
        </>
    )
}