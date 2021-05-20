import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const {name, slug, extra, ...rest} = config;
  return {
    name: name ?? "An App Name",
    slug: slug ?? "an-app-slug",
    extra: {
      ...extra,
      app_env: "local",
      menu_fetch_url: "http://localhost:8000/api/menu"
    },
    ...rest
  }
};