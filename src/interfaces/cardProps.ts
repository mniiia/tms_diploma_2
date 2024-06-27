import { ReactNode } from 'react'

export interface BookCardProps{
    id?:string;
    image?:string;
    title?:string;
    price?:string;
    subtitle?:string;
}

export interface ExtendedCardProps extends BookCardProps{

    authors?:string;
    year?:string;
    amount:number;
    calculateSum?:(sum:number)=>void;
    children?:ReactNode;
}
