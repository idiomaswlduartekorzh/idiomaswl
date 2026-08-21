-- Los privilegios por defecto de proyectos antiguos pueden conceder más acceso
-- a service_role del que necesita el ledger. Limitarlo explícitamente.
revoke all on table public.wompi_transactions from service_role;
grant select, insert, update on table public.wompi_transactions to service_role;
