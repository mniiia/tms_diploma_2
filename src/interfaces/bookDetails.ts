export interface IBookDetails {
    title: string;
    image: string;
    price: string;
    authors: string;
    publisher: string;
    language: string;
    desc: string;
    isbn13:string;
    year:string;
    rating:string;
}

export interface IBookWithAmount extends IBookDetails{
    amount?:number;
  }
