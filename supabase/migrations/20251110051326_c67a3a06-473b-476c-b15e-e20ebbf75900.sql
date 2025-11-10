-- Create custom_requests table to store form submissions
CREATE TABLE public.custom_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  request TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.custom_requests ENABLE ROW LEVEL SECURITY;

-- Create policy for public to insert requests
CREATE POLICY "Anyone can submit requests"
  ON public.custom_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create policy for public to view all requests (for admin panel)
CREATE POLICY "Anyone can view requests"
  ON public.custom_requests
  FOR SELECT
  TO public
  USING (true);

-- Create policy for public to update requests (for admin panel)
CREATE POLICY "Anyone can update requests"
  ON public.custom_requests
  FOR UPDATE
  TO public
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_custom_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_custom_requests_updated_at
  BEFORE UPDATE ON public.custom_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_custom_requests_updated_at();

-- Enable realtime for the table
ALTER PUBLICATION supabase_realtime ADD TABLE public.custom_requests;