import { environment } from "../environments/environments";


export const endpoints = {
  users: `${environment.micro}/users`,
  login: `${environment.micro}/login`,
  recovery: `${environment.micro}/recovery`,
  changePassword: `${environment.micro}/changePassword`,
  publication: `${environment.micro}/publication`,
  comment: `${environment.micro}/comment`
}