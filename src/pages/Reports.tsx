import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const reports = [
  { title: "Relatório de Clientes", description: "Lista completa de todos os clientes cadastrados", icon: FileText },
  { title: "Relatório de Atividade", description: "Resumo de atividades do mês", icon: FileText },
  { title: "Relatório de Crescimento", description: "Análise de crescimento da base de clientes", icon: FileText },
];

export default function Reports() {
  const { toast } = useToast();

  const handleDownload = (title: string) => {
    toast({ title: "Download iniciado", description: `${title} será exportado em breve.` });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground mt-1">Exporte e visualize relatórios do sistema</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reports.map((r) => (
          <Card key={r.title} className="hover-scale cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <r.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-base">{r.title}</CardTitle>
              </div>
              <CardDescription>{r.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" onClick={() => handleDownload(r.title)}>
                <Download className="h-4 w-4 mr-1" /> Exportar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
