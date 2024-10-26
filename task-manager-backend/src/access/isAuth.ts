// src/access/isAuth.ts
import { Access } from "payload/config";

export const isAuth: Access = ({ req: { user } }) => {
  return Boolean(user);
};
