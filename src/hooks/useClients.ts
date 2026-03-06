import { useState, useEffect, useCallback } from "react";
import { Client, ClientFormData } from "@/types/client";
import { clientService } from "@/services/clientService";
import { useToast } from "@/hooks/use-toast";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await clientService.getAll();
      setClients(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const createClient = async (data: ClientFormData) => {
    const created = await clientService.create(data);
    setClients((prev) => [created, ...prev]);
    toast({ title: "Cliente criado", description: `${created.name} foi adicionado com sucesso.` });
    return created;
  };

  const updateClient = async (id: string, data: ClientFormData) => {
    const updated = await clientService.update(id, data);
    setClients((prev) => prev.map((c) => (c.id === id ? updated : c)));
    toast({ title: "Cliente atualizado", description: `${updated.name} foi atualizado com sucesso.` });
    return updated;
  };

  const deleteClient = async (id: string) => {
    const client = clients.find((c) => c.id === id);
    await clientService.remove(id);
    setClients((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Cliente excluído", description: `${client?.name ?? "Cliente"} foi removido.`, variant: "destructive" });
  };

  return { clients, loading, createClient, updateClient, deleteClient, refetch: fetchClients };
}
