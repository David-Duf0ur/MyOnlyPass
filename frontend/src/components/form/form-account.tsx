import { useContext, useEffect, useState } from "react";
import type { ICredential } from "../../types/interfaces";
import { DataContext } from "../../context/dataContext";



interface FormAccountProps {
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
    setFields: React.Dispatch<React.SetStateAction<{ name: string; value: string }[]>>;
    data: ICredential | undefined;
    fields: { name: string; value: string }[];
}

export default function FormAccount({ setRefresh, data, fields }: FormAccountProps) {
    const test = useContext(DataContext);
    const [email, setEmail] = useState<string>(data?.mail || "empty");
    const [password, setPassword] = useState<string>(data?.passwordEncrypted || "empty");
    const [url, setUrl] = useState<string>(data?.url || "empty");
    const [title, setTitle] = useState<string>(data?.title || "empty");
    const [toggleEyes, setToggleEyes] = useState<boolean>(false);
    const [iconifyLink, setIconifyLink] = useState<string>('')
    const [customFieldValues, setCustomFieldValues] = useState<{ [key: string]: string }>(
        () => fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`http://localhost:3000/credential/${data?._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                mail: email,
                passwordEncrypted: password,
                url: url,
                favorite: data?.favorite,
                iconify: iconifyLink
            })
        });

        for (const key in customFieldValues) {
            await fetch(`http://localhost:3000/credential/fields/${data?._id}/${key}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: key,
                    value: customFieldValues[key],
                    required: false
                })
            });
        }
        setRefresh((prevRefresh) => !prevRefresh);
    }

    const showPassword = () => {
        const passwordField = document.getElementById('password_field') as HTMLInputElement;
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            setToggleEyes(true);
        } else {
            passwordField.type = 'password';
            setToggleEyes(false);
        }
    }

    const deleteField = async (idCredential: string, fieldName: string) => {
        await fetch(`http://localhost:3000/field/${idCredential}/${fieldName}`, {
            method: 'DELETE',
        });
        setRefresh((prevRefresh) => !prevRefresh);
    }

    const handleCustomFieldChange = (name: string, value: string) => {
        setCustomFieldValues(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setEmail(data?.mail || "empty");
        setPassword(data?.passwordEncrypted || "empty");
        setUrl(data?.url || "empty");
        setTitle(data?.title || "empty");
        setIconifyLink(data?.iconify || iconifyLink)
    }, [data]);

    useEffect(() => {
        setCustomFieldValues(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}));
    }, [fields]);

    return (
        <>
            <form
                className='flex flex-col items-center mx-auto p-6'
                onSubmit={(e) => {
                    handleSubmit(e);
                    setRefresh((prevRefresh) => !prevRefresh);
                }}>
                <div className='flex items-center gap-4 w-1/2 mr-6 ml-6 mb-2'>
                    <div id='iconify' className='w-12 h-12 max-w-[48px] max-h-[48px] overflow-hidden flex items-center justify-center' dangerouslySetInnerHTML={{ __html: iconifyLink }} />
                    <input onChange={e => setTitle(e.target.value)} className='font-bold text-3xl w-full  bg-transparent  focus:outline-none transition' placeholder='Nom...' value={title}></input>
                </div>
                <div className='flex flex-col items-center gap-2 mb-4'>
                    <div className='flex justify-between w-1/2 mr-6 ml-6  border-b-1 border-black-300 '>
                        {/* <svg style={{ transform: "scaleX(-1)" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" /></svg> */}
                        <div className='w-[500px]'></div>
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8 17.175V6.825q0-.425.3-.713t.7-.287q.125 0 .263.037t.262.113l8.15 5.175q.225.15.338.375t.112.475t-.112.475t-.338.375l-8.15 5.175q-.125.075-.262.113T9 18.175q-.4 0-.7-.288t-.3-.712" /></svg> */}
                    </div>
                    {test.theme}
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="email_field" className="">Email</label>
                        <input onChange={e => setEmail(e.target.value)} id="email_field" value={email} className="bg-amber-200 p-2 rounded-lg w-64" type="email" name="input-email" title="Account email" placeholder="example@example.com"></input>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="password_field" className="">Password</label>
                        <div className='flex items-center gap-2 cursor-pointer w-64'>
                            <input onChange={e => setPassword(e.target.value)} id="password_field" value={password} className="bg-amber-200 p-2 rounded-lg" type={toggleEyes ? "text" : "password"} name="input-password" title="Account password" placeholder="....."></input>
                            {toggleEyes ? (
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={showPassword} width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" /></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={showPassword} width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10m9.8 4a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0-2a2 2 0 1 1 0-4a2 2 0 0 1 0 4" /></svg>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="url_field" className="">Url</label>
                        <div className='flex items-center gap-2 cursor-pointer w-64'>
                            <input onChange={e => setUrl(e.target.value)} id="url_field" value={url} className="bg-amber-200 p-2 rounded-lg w-64" type="text" name="input-url" title="Account url" placeholder="https://example.com"></input>
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M3 3V2H2v1zm9.293 10.707a1 1 0 0 0 1.414-1.414zM4 11V3H2v8zM3 4h8V2H3zm-.707-.293l10 10l1.414-1.414l-10-10z" /><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4 15v0c0 1.87 0 2.804.402 3.5A3 3 0 0 0 5.5 19.598C6.196 20 7.13 20 9 20h5c2.828 0 4.243 0 5.121-.879C20 18.243 20 16.828 20 14V9c0-1.87 0-2.804-.402-3.5A3 3 0 0 0 18.5 4.402C17.804 4 16.87 4 15 4v0" /></g></svg>
                            </a>
                        </div>
                    </div>
                    {/* <p>{JSON.stringify(fields)}</p> */}
                    {fields.length > 0 && (
                        <div className='flex flex-col mb-6 bg-gray-100 p-2 rounded-lg'>
                            <p className='underline mb-2 mx-auto'>Custom fields</p>
                            {fields.map((field, index) => (
                                <div key={index} className='flex flex-col mb-4'>
                                    <div className='flex items-center gap-2 cursor-pointer w-64'>
                                        <label htmlFor={field.name} className="">{field.name}</label>
                                        <svg onClick={() => deleteField(data?._id || '', field.name)} className='hover:text-red-500' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M24 12a12 12 0 1 0-12 12a12 12 0 0 0 12-12m-7.29 3.28a1 1 0 0 1 0 1.41a1 1 0 0 1-1.42 0l-3.11-3.11a.26.26 0 0 0-.35 0l-3.11 3.11a1 1 0 0 1-1.41-1.41l3.11-3.11a.26.26 0 0 0 0-.35L7.31 8.71a1 1 0 0 1 0-1.42a1 1 0 0 1 1.41 0l3.11 3.11a.24.24 0 0 0 .35 0l3.11-3.11a1 1 0 1 1 1.42 1.42l-3.11 3.11a.24.24 0 0 0 0 .35Z" /></svg>
                                    </div>
                                    <input onChange={e => handleCustomFieldChange(field.name, e.target.value)} id={field.name} value={customFieldValues[field.name] || ''} className="bg-amber-200 p-2 rounded-lg w-64" type="text" name={field.name} title={field.name} placeholder={field.name}></input>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='flex flex-col mb-4'>
                        <button className='bg-blue-400 hover:bg-blue-500 text-white pt-1 pb-1 pr-4 pl-4 rounded-lg'>Save</button>
                    </div>
                </div>
            </form>

        </>
    )
}