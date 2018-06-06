import { Entity } from '../../../shared/models/entity';

export class Note extends Entity {
  id: number;
  datePosted: Date;
  message: string;
}

export class Address extends Entity {
  id: number;
  name: string;
  address: string;
  attention: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isPrimary: boolean;
}

export class User extends Entity {
  id: number;
  firstName: string;
  lastName: string;
  company: string;
  title: string;
  email: string;
  password: string;
  phone: string;
  groupId: number;
  accountBalance: number;
  points: number;
  creditLimit: number;
  isAdmin: boolean;
  notes: Note[];
  addresses: Address[];
}
