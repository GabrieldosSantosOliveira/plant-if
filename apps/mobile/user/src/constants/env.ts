export const env = {
  GOOGLE_CLIENT_ID_ANDROID: process.env
    .EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID as string,
  GOOGLE_CLIENT_ID_IOS: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS as string,
  FACEBOOK_APP_ID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID as string,
  APPLE_CLIENT_ID: process.env.EXPO_PUBLIC_APPLE_CLIENT_ID as string,
  APPLE_REDIRECT_URI: process.env.EXPO_PUBLIC_APPLE_REDIRECT_URI as string,
  BASE_URL: process.env.EXPO_PUBLIC_BASE_URL as string,
}
