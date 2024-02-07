## gql without apollo

#### Files to look at:

- `apps/web/pages/index.tsx`: entry next js page
- `packages/ui/src/hooks/useSpaceX.tsx`: An example hook which uses apollo's use Query hook, present - inside some modules directory.
- `packages/ui/src/hooks/useQuery.tsx`: A basic utility we can replace useQuery with during build time.
