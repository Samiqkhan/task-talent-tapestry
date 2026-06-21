import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
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
import { ArrowLeft, RefreshCw, LogOut, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CustomRequest {
  id: string;
  name: string;
  phone: string;
  address?: string | null;
  delivery_date?: string | null;
  request: string;
  status: string;
  created_at: string;
  assigned_to?: string | null;
  payment_screenshot_url?: string | null; // Added this
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
      // Update local state to reflect change immediately
      setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const assignMember = async (id: string, memberName: string) => {
    try {
      const { error } = await supabase
        .from("custom_requests")
        .update({ assigned_to: memberName })
        .eq("id", id);

      if (error) throw error;
      toast.success("Assigned successfully");
    } catch (error: any) {
      console.error("Error assigning member:", error);
      toast.error("Failed to assign member");
    }
  };

  const deleteRequest = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const { error } = await supabase.from("custom_requests").delete().eq("id", id);
      if (error) throw error;
      toast.success("Request deleted");
      setRequests(requests.filter(req => req.id !== id));
    } catch (error: any) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete");
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchRequests();
    // Realtime subscription setup... (keeping existing logic short for this snippet)
    const channel = supabase
      .channel("custom_requests_changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "custom_requests" }, 
      () => fetchRequests())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={fetchRequests} variant="outline" disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button onClick={handleSignOut} variant="destructive" size="sm">
              <LogOut className="h-4 w-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name/Phone</TableHead>
                  <TableHead className="w-[30%]">Request</TableHead>
                  <TableHead>Payment</TableHead> {/* NEW COLUMN */}
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((req) => (
                  <TableRow key={req.id}>
                    <TableCell className="whitespace-nowrap text-muted-foreground text-xs">
                      {new Date(req.created_at).toLocaleDateString()} <br/>
                      {new Date(req.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{req.name}</div>
                      <div className="text-sm text-muted-foreground">{req.phone}</div>
                      {req.address && (
                        <div className="text-xs text-muted-foreground mt-1 max-w-[200px] truncate" title={req.address}>
                          <strong>Addr:</strong> {req.address}
                        </div>
                      )}
                      {req.delivery_date && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <strong>Delivery:</strong> {new Date(req.delivery_date).toLocaleDateString()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{req.request}</TableCell>
                    
                    {/* PAYMENT SCREENSHOT CELL */}
                    <TableCell>
                      {req.payment_screenshot_url ? (
                        <a 
                          href={req.payment_screenshot_url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
                        >
                          <ImageIcon className="w-4 h-4" />
                          View
                        </a>
                      ) : (
                        <span className="text-muted-foreground text-xs italic">No Proof</span>
                      )}
                    </TableCell>

                    <TableCell>
                      <Input 
                        placeholder="Assign..."
                        defaultValue={req.assigned_to || ""}
                        className="h-8 w-32 text-sm"
                        onBlur={(e) => {
                          if (e.target.value !== (req.assigned_to || "")) {
                            assignMember(req.id, e.target.value);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant={req.status === "completed" ? "default" : req.status === "in-progress" ? "secondary" : "outline"}>
                        {req.status || "pending"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {req.status !== "completed" && (
                           <Button size="sm" variant="outline" onClick={() => updateStatus(req.id, "completed")}>
                             Done
                           </Button>
                        )}
                        {req.status === "completed" && (
                           <Button size="icon" variant="ghost" className="text-destructive" onClick={() => deleteRequest(req.id)}>
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
      </div>
    </div>
  );
};

export default Admin;