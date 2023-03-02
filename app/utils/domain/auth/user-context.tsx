import { User } from "@prisma/client";
import React from "react";
import { useContext } from "react";

export type UserContextType = {
  id: User["id"] | null;
  email: User["email"] | null;
} | null;

export const UserContext = React.createContext<UserContextType>(null);

export function useUser() {
  return useContext(UserContext);
}
