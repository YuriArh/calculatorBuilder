import { ReactElement } from "react";
export interface ItemInterface {
  id: string;
  children: () => ReactElement;
  name: string;
}
