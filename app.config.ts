import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => {
  const {name, slug, ...rest} = config;
  return {
    name: name ?? "An App Name",
    slug: slug ?? "an-app-slug",
    ...rest
  }
};
