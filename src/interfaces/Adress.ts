export interface AddressResponseI {
  status: string;
  message: string;
  data: AddressI[];
}

export interface AddressI {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}
