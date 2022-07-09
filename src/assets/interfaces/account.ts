import { EmailGroup } from "./emailGroup";
import { Role } from "./role";

export interface Account{
    username:string;
    password:string;
    //personal info needed
    roles:Role[];
    groups:EmailGroup[];
    
}