import { Account } from "./account";
import { Role } from "./role";
import { SpecialFriend } from "./specialFriend";

export interface EmailGroup{
   id:number,
   name:string;
   description:string;
   specialFriends:any[];
   SFNAccounts:any[];
   roles:any[]; 
}