export interface IClient {
  id: string;
  name: string;
  surname: string;
  email: string;
  phone?: string;
}

export type IClientForm = Omit<IClient, 'id'>;

export type IClients = Array<IClient>;

export type IClientResponse = {
  users: Array<IClient>;
};
