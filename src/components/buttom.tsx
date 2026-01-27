import type { ReactElement } from "preact/compat";

interface buttonProps {
    varient : "primary" | "secondary",
    size : "sm" | "md" | "lg" ,
    text : String ,
    startIcon? : ReactElement, 
    endIcon? : ReactElement , 
    onclick? : () => void,
}

const varientStyle = {
    "primary" : "bg-pu600 text-white",
    "secondary" : "bg-pu300 text-pu600"
}

const defaultStyle = "rounded-md p-2 cursor-pointer";

const sizeStyle = {
    "sm" : "pl-3 pr-4 py-1 text-sm font-light" ,
    "md" : "pl-4 pr-6 py-2 text-base font-light" ,
    "lg" : "px-6 py-3 text-lg font-light",
}
export const Button =(prpos : buttonProps) => {
    return <button onClick={prpos.onclick} className={ `${defaultStyle} ${sizeStyle[prpos.size]} ${varientStyle[prpos.varient]}`}>
        <div className="flex gap-1.5 items-center justify-center">{prpos.startIcon} {prpos.text} {prpos.endIcon}</div></button>
}   