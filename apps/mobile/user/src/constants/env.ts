export const env = {
  GOOGLE_CLIENT_ID_ANDROID: process.env
    .EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID as string,
  GOOGLE_CLIENT_ID_IOS: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS as string,
  BASE_URL: process.env.EXPO_PUBLIC_BASE_URL as string,
}
