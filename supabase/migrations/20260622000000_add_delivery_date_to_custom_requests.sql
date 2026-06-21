-- Add delivery_date column to custom_requests table
ALTER TABLE public.custom_requests ADD COLUMN IF NOT EXISTS delivery_date TEXT;
