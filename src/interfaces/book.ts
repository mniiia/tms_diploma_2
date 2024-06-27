export interface IBook{
    image: string,
    isbn13: string,
    price: string,
    subtitle: string,
    title: string,
    url: string,
    amount?: number
}

export interface IBooksState {
    answer: {
      total:string;
      books: IBook[];
    } | object;
    pages:number
    isLoading: boolean;
    error: string | null;
    amountOnPage:number;
  }
