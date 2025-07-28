import { useContext, useState } from "react";
import Button from "../globalcomponents/Button";
import { UserContext } from "../../context/UserContext";

interface ImportCSVProps {
    setShowModalImportCSV: React.Dispatch<React.SetStateAction<boolean>>;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ICredentialImport {
    _id: string;
    vaultId: string;
    title: string;
    category: string;
    userId: string;
    passwordEncrypted: string;
    mail: string;
    url: string;
    iconify: string;
    favorite: string;
    createdAt: string;
    updatedAt: string;
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
    "createdAt",
    "updatedAt",
];


export default function Stock({ setShowModalImportCSV, setRefresh }: ImportCSVProps) {
    const { user } = useContext(UserContext);
    const [csvDataImport, setCsvDataImport] = useState<string>("");
    const [csvParsedData, setCsvParsedData] = useState<string[][]>([]);
    const [importFormated, setImportFormated] = useState<ICredentialImport[]>([]);
    const [error, setError] = useState<string>("");


    const handleImport = (csv: string) => {
        // Récupération du header
        const header = csv.split("\n")[0].split(",");

        // Vérification du header
        if (header.length !== HEADER_CSV_REF.length || !HEADER_CSV_REF.every((h, i) => h === header[i])) {
            setError("CSV header does not match expected format.");
            return
        };


        setError("");
        const rowsWithoutHeader = csv.split("\n").slice(1).map(row => row.split(","));
        const rows = csv.split("\n").map(row => row.split(","));

        setCsvParsedData(rows);

        // Formattage des données en ICredential[]
        const formattedRows = rowsWithoutHeader.map(row => {
            const formattedRow: { [key: string]: string } = {};
            row.forEach((value, index) => {
                formattedRow[HEADER_CSV_REF[index]] = value;
            });
            return formattedRow as unknown as ICredentialImport;
        });

        setImportFormated(formattedRows);

    };

    const handleSave = async (credentials: ICredentialImport[]) => {
        // Vérification des données
        // _id, vaultId, userId, iconify, createdAt, updatedAt doivent être vidents
        const test = credentials.every(cred => cred._id === '' && cred.vaultId === '' && cred.userId === '' && cred.iconify === '' && cred.createdAt === '' && cred.updatedAt === '');

        // controle la présence des champs obligatoires
        const test2 = credentials.every(cred => cred.title !== '' && cred.mail !== '' && cred.passwordEncrypted !== '' && cred.url !== '' && cred.category !== '' && (cred.favorite === 'true' || cred.favorite === 'false'));

        if (!test || !test2) {
            console.log("Erreur dans les données importées");
            return
        }

        credentials.forEach(async (cred) => {
            const response = await fetch(`http://localhost:3000/credential/${user.id_user}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vaultId: 1,
                    title: cred.title,
                    category: cred.category,
                    userId: user.id_user,
                    passwordEncrypted: cred.passwordEncrypted,
                    mail: cred.mail,
                    url: cred.url,
                    iconify: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 14a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0-9.5a3.625 3.625 0 0 0-3.625 3.625a1 1 0 1 0 2 0a1.625 1.625 0 1 1 2.23 1.51c-.676.27-1.605.962-1.605 2.115V14a1 1 0 1 0 2 0c0-.244.05-.366.261-.47l.087-.04A3.626 3.626 0 0 0 12 6.5"/></g></svg>',
                    favorite: cred.favorite === "true" ? true : false,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setError("");
                setRefresh((prevRefresh) => !prevRefresh);
                setShowModalImportCSV(false);
            }

            setError(data.error);

        })
    }



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
                            <Button buttonName="Import" onClick={() => {
                                handleImport(csvDataImport)
                            }} />
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
                                {csvParsedData.slice(1).map((row) => (
                                    <>
                                        < textarea
                                            className="w-full h-auto p-2 border border-gray-300 mt-2"
                                            value={row}
                                            readOnly
                                        />
                                    </>
                                ))}
                                <div className="self-center">
                                    <Button buttonName="Save" onClick={() => {
                                        handleSave(importFormated);
                                    }} />
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