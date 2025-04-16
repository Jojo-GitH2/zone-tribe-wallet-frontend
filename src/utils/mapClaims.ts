import { User } from "../types/user";

const CLAIMS = {
  EMAIL: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
  NAME_IDENTIFIER: "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
};

export const mapClaimsToUser = (decodedToken: any): User => {
  return {
    id: decodedToken[CLAIMS.NAME_IDENTIFIER],
    email: decodedToken[CLAIMS.EMAIL],
  };
};