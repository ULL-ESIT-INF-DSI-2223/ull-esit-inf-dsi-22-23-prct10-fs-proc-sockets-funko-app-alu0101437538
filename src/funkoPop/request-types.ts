import { Funko } from "./Funko.js";

export type RequestType = {
  type: "add" | "update" | "remove" | "read" | "list" | "addUser";
  funkoPop?: Funko[];
};

export type ResponseType = {
  type: "add" | "update" | "remove" | "read" | "list" | "addUser";
  success: boolean;
  funkoPops?: Funko[];
};
