import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Building2, Calendar, CircleDot, Pencil } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { clientService } from "@/services/clientService";
import type { Client } from "@/types/client";

export default function ClientDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    clientService.getById(id).then((c) => {
      setClient(c ?? null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="flex items-center justify-center h-64 text-muted-foreground">Carregando...</div>;
  if (!client) return <div className="flex items-center justify-center h-64 text-muted-foreground">Cliente não encontrado.</div>;

  const info = [
    { label: "Email", value: client.email, icon: Mail },
    { label: "Telefone", value: client.phone, icon: Phone },
    { label: "Empresa", value: client.company, icon: Building2 },
    { label: "Data de Cadastro", value: new Date(client.createdAt).toLocaleDateString("pt-BR"), icon: Calendar },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/clients")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">{client.name}</h1>
          <Badge variant={client.status === "active" ? "default" : "secondary"} className="mt-1">
            <CircleDot className="h-3 w-3 mr-1" />
            {client.status === "active" ? "Ativo" : "Inativo"}
          </Badge>
        </div>
        <Button onClick={() => navigate(`/clients/${client.id}/edit`)}>
          <Pencil className="h-4 w-4 mr-1" /> Editar
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Informações do Cliente</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {info.map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <item.icon className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
