export interface Driver {
  id?: number;
  name: string;
  surname: string;
  pesel: string;
  hireDate: string;
  firedDate: string | null;
}
