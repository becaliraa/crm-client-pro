/** Tipo principal de um cliente no CRM */
export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive";
  createdAt: string; // ISO date string
}

/** Dados para criação/edição de cliente (sem id e createdAt) */
export type ClientFormData = Omit<Client, "id" | "createdAt">;
