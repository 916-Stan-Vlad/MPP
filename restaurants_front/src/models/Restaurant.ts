import Owner from "./Owner";

export interface Restaurant{
    id?:number;
    restaurant_name:string;
    description:string;
    menu_review :string;
    review :string;
    owner_id:number,
    owner?:Owner;

}