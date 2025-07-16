import { useState, type JSX } from "react";
import Loader from "./loader/loader";
import React from "react";

export default function LoaderWrapper({ children }: { children: JSX.Element }): JSX.Element {
    const [loading, setLoading] = useState(false)

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        //Check si l'element cliqué pocede un OnClick
        //si oui elle concerve le comportement
        if (children.props.onClick) {
            children.props.onClick(e)
        }

        //Puis state à true pour afficher le loader
        setLoading(true)

        // Puis au bout de 2s change le state pour afficher l'enfant
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }

    if (loading) {
        return <Loader />
    }

    //Retourn un clone de l'enfant avec la le handler onClick en plus
    return React.cloneElement(children, {
        onClick: handleClick,
    })
}