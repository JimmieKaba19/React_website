-- Drop the restrictive SELECT policy
DROP POLICY IF EXISTS "Service role can read submissions" ON public.contact_submissions;

-- Create a function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    WHERE auth.jwt() ->> 'email' = 'admin@tandem.co.ke'
  )
$$;

-- Allow admin to read all submissions
CREATE POLICY "Admin can read all submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (public.is_admin());

-- Allow admin to update submission status
CREATE POLICY "Admin can update submissions" 
ON public.contact_submissions 
FOR UPDATE 
USING (public.is_admin());

-- Allow admin to delete submissions
CREATE POLICY "Admin can delete submissions" 
ON public.contact_submissions 
FOR DELETE 
USING (public.is_admin());