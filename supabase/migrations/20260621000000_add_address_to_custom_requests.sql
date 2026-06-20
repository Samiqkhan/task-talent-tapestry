-- Add address column to custom_requests table
ALTER TABLE public.custom_requests ADD COLUMN IF NOT EXISTS address TEXT;
