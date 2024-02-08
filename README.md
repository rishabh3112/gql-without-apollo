## gql without apollo

#### Files to look at:

- `apps/web/next.config.js`: integrates swc plugin https://github.com/rishabh3112/swc-remove-apollo-plugin
- `apps/web/pages/index.tsx`: entry next js page
- `packages/ui/src/authors`: An example component representing a feature in package modules
- `packages/ui/src/gql/useQuery.tsx`: A basic utility we can replace useQuery with during build time.
- `packages/ui/src/gql/useMutation.tsx`: A basic utility we can replace useMutation with during build time.
