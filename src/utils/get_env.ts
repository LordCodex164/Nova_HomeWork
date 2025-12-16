import * as dotenv from "dotenv";

dotenv.config();

const getEnvPath = () => {
    let path = ".env.local"
    const appEnv = getEnv("NODE_ENV")
    if(appEnv === "PRODUCTION") {
        path = ".env.production"
    }
    else if(appEnv === "STAGING") {
        path = ".env.staging"
    }
    return path
}

const envPath = getEnvPath()

dotenv.config({
    path: envPath
})

export default function getEnv (key: string, fallback?: string) {
    return process.env[key] ?? fallback;
}