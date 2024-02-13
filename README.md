## gql without apollo

#### Apps:

1. `apps/with-apollo` - uses Apollo Provider without plugin (thus using apollo at runtime)
2. `apps/without-apollo` - don't use Apollo provider and use plugin (thus not using apollo at runtime)

#### Files to look at:

- `apps/without-apollo/next.config.js`: integrates swc plugin https://github.com/rishabh3112/swc-remove-apollo-plugin
- `apps/without-apollo/pages/index.tsx`: entry next js page
- `packages/ui/src/authors`: An example component representing a feature in package modules
- `packages/ui/src/gql/useQuery.tsx`: A basic utility we can replace useQuery with during build time.
- `packages/ui/src/gql/useMutation.tsx`: A basic utility we can replace useMutation with during build time.
