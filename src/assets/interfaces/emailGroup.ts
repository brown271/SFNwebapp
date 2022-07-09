import { Account } from "./account";
import { Role } from "./role";
import { SpecialFriend } from "./specialFriend";

export interface EmailGroup{
   name:string;
   description:string;
   specialFriends:SpecialFriend[];
   SFAccounts:Account[];
   roles:Role[]; 
}