import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../globalcomponents/Button";

interface FormCreateAccountProps {
    setShowModal: (show: boolean) => void;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormCreateAccount({ setShowModal, setRefresh }: FormCreateAccountProps) {
    //Contexte
    const { user } = useContext(UserContext);

    //Tools
    const [toggleEyes, setToggleEyes] = useState<boolean>(false);

    //Fomr
    const [email, setEmail] = useState<string>("empty");
    const [password, setPassword] = useState<string>("empty");
    const [url, setUrl] = useState<string>("empty");
    const [title, setTitle] = useState<string>("empty");
    const [category, setCategory] = useState<string>("");
    const [iconifyLink, setIconifyLink] = useState<string>('<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="currentColor" d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 14a1 1 0 1 0 0 2a1 1 0 0 0 0-2m0-9.5a3.625 3.625 0 0 0-3.625 3.625a1 1 0 1 0 2 0a1.625 1.625 0 1 1 2.23 1.51c-.676.27-1.605.962-1.605 2.115V14a1 1 0 1 0 2 0c0-.244.05-.366.261-.47l.087-.04A3.626 3.626 0 0 0 12 6.5"/></g></svg>');

    //Data
    const [categoryList, setCategoryList] = useState<string[]>([]);

    const handleSubmit = async (e: React.FormEvent, userId: number) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3000/credential/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                mail: email,
                passwordEncrypted: password,
                url: url,
                category: category,
                iconify: iconifyLink,
                favorite: false,
            }),
        });
        await response.json();
        setRefresh((prevRefresh) => !prevRefresh);
        setShowModal(false);
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

    const categoryFetch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/categories/${user?.id_user || 0}`);
            const dataFetch = await response.json();
            setCategoryList(dataFetch);
        } catch (error) {
            console.error("Erreur lors de la récupération des catégories :", error);
        }
    }

    useEffect(() => {
        categoryFetch();
    }, []);

    return (
        <>
            <form
                onSubmit={(e) => {
                    handleSubmit(e, user?.id_user || 0);
                }}
                className='flex flex-col items-center w-full max-w-xl mx-auto bg-white'>
                <div className='flex items-center gap-4 w-1/2 mr-6 ml-6 mb-2'>
                    <div id='iconify' className='w-12 h-12 max-w-[48px] max-h-[48px] overflow-hidden flex items-center justify-center'></div>
                    <input required onChange={e => setTitle(e.target.value)} className='font-bold text-3xl w-full  bg-transparent  focus:outline-none transition' placeholder='Nom...' ></input>
                </div>
                <div className='flex flex-col items-center gap-2 mb-4'>
                    <div className='flex justify-between w-1/2 mr-6 ml-6 border-b-1 border-black-300 '>
                        <div className='w-[500px]'></div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="category_field" className="">Category</label>
                        <select onChange={e => setCategory(e.target.value)} className="w-full mt-2 mb-2">
                            <option value="" disabled hidden>
                                -- Choisir une catégorie --
                            </option>
                            {categoryList.map((category, index) => (
                                <option key={index} value={category}>{category}</option>
                            ))}
                        </select>
                        <div className='flex items-center gap-2 cursor-pointer w-64'>
                            <p>Or : </p>
                            <input required onChange={e => setCategory(e.target.value)} value={category} id="category_field" className="bg-amber-200 p-2 rounded-lg" type="text" name="input-category" title="Account category" placeholder="Category..."></input>
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="email_field" className="">Email</label>
                        <input required onChange={e => setEmail(e.target.value)} id="email_field" className="bg-amber-200 p-2 rounded-lg w-64" type="email" name="input-email" title="Account email" placeholder="example@example.com"></input>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="password_field" className="">Password</label>
                        <div className='flex items-center gap-2 cursor-pointer w-64'>
                            <input required onChange={e => setPassword(e.target.value)} id="password_field" className="bg-amber-200 p-2 rounded-lg" type={toggleEyes ? "text" : "password"} name="input-password" title="Account password" placeholder="....."></input>
                            {toggleEyes ? (
                                <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0" /></svg>
                            ) : (
                                <svg onClick={showPassword} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 20 20"><path fill="currentColor" d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10m9.8 4a4 4 0 1 0 0-8a4 4 0 0 0 0 8m0-2a2 2 0 1 1 0-4a2 2 0 0 1 0 4" /></svg>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="url_field" className="">Url</label>
                        <input required onChange={e => setUrl(e.target.value)} id="url_field" className="bg-amber-200 p-2 rounded-lg w-64" type="text" name="input-url" title="Account url" placeholder="https://example.com"></input>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <label htmlFor="iconify_field" className="">Lien Iconify</label>
                        <div className='flex items-center gap-2 cursor-pointer w-64'>
                            <input onChange={(e) => {
                                const divIconify = document.getElementById('iconify') as HTMLDivElement;
                                divIconify.innerHTML = e.target.value
                                setIconifyLink(e.target.value);
                            }} id="iconify_field" className="bg-amber-200 p-2 rounded-lg w-64" type="text" name="input-iconify" title="Account iconify" placeholder="<svg>...</svg>"></input>
                            <a href="https://icon-sets.iconify.design/" target="_blank" rel="noopener noreferrer" className='hover:text-blue-500'>
                                <svg className='cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" d="M3 3V2H2v1zm9.293 10.707a1 1 0 0 0 1.414-1.414zM4 11V3H2v8zM3 4h8V2H3zm-.707-.293l10 10l1.414-1.414l-10-10z" /><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4 15v0c0 1.87 0 2.804.402 3.5A3 3 0 0 0 5.5 19.598C6.196 20 7.13 20 9 20h5c2.828 0 4.243 0 5.121-.879C20 18.243 20 16.828 20 14V9c0-1.87 0-2.804-.402-3.5A3 3 0 0 0 18.5 4.402C17.804 4 16.87 4 15 4v0" /></g></svg>
                            </a>
                        </div>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <Button buttonName="Add" buttonType="submit" />
                    </div>
                </div>
            </form>
        </>
    )
}