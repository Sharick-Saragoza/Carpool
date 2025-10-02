import 'dotenv/config';

export default {
    expo: {
        name: 'carpool',
        slug: 'carpool',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'carpool',
        userInterfaceStyle: 'automatic',
        newArchEnabled: true,
        extra: {
            supabasePublishableKey: process.env.DB_ANONKEY,
        },
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                backgroundColor: '#E6F4FE',
                foregroundImage: './assets/images/android-icon-foreground.png',
                backgroundImage: './assets/images/android-icon-background.png',
                monochromeImage: './assets/images/android-icon-monochrome.png',
            },
            edgeToEdgeEnabled: true,
            predictiveBackGestureEnabled: false,
        },
        web: {
            output: 'static',
            favicon: './assets/images/favicon.png',
        },
        plugins: [
            'expo-router',
            [
                'expo-splash-screen',
                {
                    image: './assets/images/splash-icon.png',
                    imageWidth: 200,
                    resizeMode: 'contain',
                    backgroundColor: '#ffffff',
                    dark: {
                        backgroundColor: '#000000',
                    },
                },
            ],
            'expo-web-browser',
            'expo-secure-store',
        ],
        experiments: {
            typedRoutes: true,
            reactCompiler: true,
        },
    },
};
