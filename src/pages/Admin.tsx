import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomRequest {
  id: string;
  name: string;
  email: string;
  request: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("custom_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("custom_requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success("Status updated successfully");
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchRequests();

    // Set up realtime subscription
    const channel = supabase
      .channel("custom_requests_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "custom_requests",
        },
        () => {
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
          </div>
          <Button onClick={fetchRequests} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No requests yet</p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Request</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id} className="animate-fade-in">
                    <TableCell className="font-medium">{req.name}</TableCell>
                    <TableCell>{req.email}</TableCell>
                    <TableCell className="max-w-md truncate">
                      {req.request}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          req.status === "completed"
                            ? "default"
                            : req.status === "in-progress"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(req.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {req.status !== "in-progress" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateStatus(req.id, "in-progress")}
                          >
                            In Progress
                          </Button>
                        )}
                        {req.status !== "completed" && (
                          <Button
                            size="sm"
                            onClick={() => updateStatus(req.id, "completed")}
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
