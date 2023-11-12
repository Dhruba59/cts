import { number } from "yup";
import { Query } from "./query";

export interface User {
    userId: number;
    linkId: number | null;
    userName: string;
    firstName: string;
    middleName: string | null;
    lastName: string;
    address1: string | null;
    address2: string | null;
    address3: string | null;
    zip: string | null;
    city: string | null;
    password: string | null;
    active: string;
    title: string | null;
    state: string;
    sponsor: string;
    email: string;
    systemLogin: string | null;
    isPasswordChanged: number | null;
    matchType: number;
    lastChangeDate: string | null;
    wrongPasswordEntry: number;
    accountStatus: string;
    status: string;
}

export interface UserQuery extends User, Query {

}