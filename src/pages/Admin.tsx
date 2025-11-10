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
import { ArrowLeft, RefreshCw, LogOut, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomRequest {
  id: string;
  name: string;
  phone: string;
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
    } catch (error: any) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load requests", {
        description: error.message,
      });
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
      // Realtime listener will handle the refresh
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status", {
        description: error.message,
      });
    }
  };

  const deleteRequest = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this request? This action cannot be undone.")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("custom_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Request deleted successfully");
      
      // *** THIS IS THE NEW LINE ***
      // Manually filter out the deleted request from the local state
      setRequests(currentRequests =>
        currentRequests.filter(req => req.id !== id)
      );
      // ***************************

    } catch (error: any) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request", {
        description: error.message,
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out", { description: error.message });
    } else {
      toast.success("Signed out successfully");
      navigate("/"); // Navigate to home page after sign out
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
        (payload) => {
          console.log("Change received!", payload);
          // Re-fetch data on any change
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
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
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
          <div className="flex items-center gap-2">
            <Button onClick={fetchRequests} variant="outline" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleSignOut} variant="destructive" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
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
                  <TableHead>Phone Number</TableHead>
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
                    <TableCell>{req.phone}</TableCell>
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
                        {req.status === "completed" && (
                           <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteRequest(req.id)}
                          >
                            <Trash2 className="h-4 w-4" />
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