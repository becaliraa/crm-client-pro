/**
 * Serviço mock que simula uma API REST de clientes.
 * Os dados são mantidos em memória durante a sessão.
 */
import { Client, ClientFormData } from "@/types/client";

const generateId = () => crypto.randomUUID();

// Dados iniciais mockados
let clients: Client[] = [
  { id: generateId(), name: "Ana Silva", email: "ana@empresa.com", phone: "(11) 99999-0001", company: "TechCorp", status: "active", createdAt: "2025-01-15" },
  { id: generateId(), name: "Bruno Costa", email: "bruno@startup.io", phone: "(21) 98888-0002", company: "StartupIO", status: "active", createdAt: "2025-02-10" },
  { id: generateId(), name: "Carla Mendes", email: "carla@design.co", phone: "(31) 97777-0003", company: "DesignCo", status: "inactive", createdAt: "2025-02-22" },
  { id: generateId(), name: "Diego Ferreira", email: "diego@cloud.dev", phone: "(41) 96666-0004", company: "CloudDev", status: "active", createdAt: "2025-03-01" },
  { id: generateId(), name: "Elena Rocha", email: "elena@market.com", phone: "(51) 95555-0005", company: "MarketPro", status: "active", createdAt: "2025-03-05" },
  { id: generateId(), name: "Felipe Santos", email: "felipe@data.ai", phone: "(61) 94444-0006", company: "DataAI", status: "inactive", createdAt: "2024-12-20" },
  { id: generateId(), name: "Gabriela Lima", email: "gabi@soft.com", phone: "(71) 93333-0007", company: "SoftHouse", status: "active", createdAt: "2025-01-28" },
  { id: generateId(), name: "Hugo Almeida", email: "hugo@web.dev", phone: "(81) 92222-0008", company: "WebDev", status: "active", createdAt: "2026-03-02" },
  { id: generateId(), name: "Isabela Nunes", email: "isa@ecom.com", phone: "(91) 91111-0009", company: "E-ComBR", status: "active", createdAt: "2026-03-04" },
  { id: generateId(), name: "João Pedro", email: "jp@fintech.io", phone: "(11) 90000-0010", company: "FinTechIO", status: "inactive", createdAt: "2024-11-10" },
];

/** Simula delay de rede */
const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export const clientService = {
  async getAll(): Promise<Client[]> {
    await delay();
    return [...clients];
  },

  async getById(id: string): Promise<Client | undefined> {
    await delay();
    return clients.find((c) => c.id === id);
  },

  async create(data: ClientFormData): Promise<Client> {
    await delay();
    const newClient: Client = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString().split("T")[0],
    };
    clients = [newClient, ...clients];
    return newClient;
  },

  async update(id: string, data: ClientFormData): Promise<Client> {
    await delay();
    const idx = clients.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error("Cliente não encontrado");
    const updated = { ...clients[idx], ...data };
    clients[idx] = updated;
    return updated;
  },

  async remove(id: string): Promise<void> {
    await delay();
    clients = clients.filter((c) => c.id !== id);
  },
};
