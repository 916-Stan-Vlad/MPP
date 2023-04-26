import {Restaurant} from "./Restaurant";

export  default interface Menu{
    id:number;
    menu_title:string;
    menu_nr_pages:number;
    menu_food:string;
    menu_drinks:string;
    menu_deserts:string;
    menu_restaurant:Restaurant;
}