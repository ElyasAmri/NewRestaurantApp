import Constants from "expo-constants";

const current_env = Constants.manifest.extra?.env;

export default function env(name: string, defaultVal?: string | number){
  return ENV[current_env][name] ?? defaultVal
}

type EnvData = {[id: string]: string | number};

const DEV_ENV: EnvData = {
  back4app_app_id: "oc5GJespTY9aDso1fusC0QQiHkeOx6oOWgoPicxP",
  back4app_js_id: "yhLRcAVfjS9GsUI27VEAnIaU1Ljwxq1ZcCyTIBpj",
}

const PROD_ENV: EnvData = {

}

const ENV: {[env: string]: EnvData} = {
  "local": {env: "local", ...DEV_ENV},
  "production": {env: "production", ...PROD_ENV},
}
