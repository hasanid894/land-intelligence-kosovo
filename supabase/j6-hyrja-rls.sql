-- J6: Authentication & Row Level Security

-- 1. Shto kolonën e pronarit
ALTER TABLE public.investment_requests
ADD COLUMN IF NOT EXISTS pronari_id uuid
REFERENCES auth.users(id);

-- 2. Pronari caktohet automatikisht
ALTER TABLE public.investment_requests
ALTER COLUMN pronari_id SET DEFAULT auth.uid();

-- 3. Aktivizo RLS
ALTER TABLE public.investment_requests
ENABLE ROW LEVEL SECURITY;

-- 4. Hiq policies e vjetra demonstrative
DROP POLICY IF EXISTS
"Demo users can insert investment requests"
ON public.investment_requests;

DROP POLICY IF EXISTS
"Demo users can read investment requests"
ON public.investment_requests;

-- 5. SELECT: vetëm kërkesat personale
CREATE POLICY "Users can read own requests"
ON public.investment_requests
FOR SELECT
TO authenticated
USING (pronari_id = (SELECT auth.uid()));

-- 6. INSERT: vetëm për përdoruesin aktual
CREATE POLICY "Users can insert own requests"
ON public.investment_requests
FOR INSERT
TO authenticated
WITH CHECK (pronari_id = (SELECT auth.uid()));

-- 7. UPDATE: vetëm kërkesat personale
CREATE POLICY "Users can update own requests"
ON public.investment_requests
FOR UPDATE
TO authenticated
USING (pronari_id = (SELECT auth.uid()))
WITH CHECK (pronari_id = (SELECT auth.uid()));