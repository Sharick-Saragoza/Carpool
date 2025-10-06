import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import * as aesjs from 'aes-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import 'react-native-get-random-values';


function getWebStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage;
    }
    return undefined;
}

class LargeSecureStore {
    private async getMasterKey() {
        let keyHex = await SecureStore.getItemAsync('MASTER_KEY');
        if (!keyHex) {
            const key = crypto.getRandomValues(new Uint8Array(32));
            keyHex = aesjs.utils.hex.fromBytes(key);
            await SecureStore.setItemAsync('MASTER_KEY', keyHex);
        }
        return aesjs.utils.hex.toBytes(keyHex);
    }

    private async encrypt(value: string) {
        const key = await this.getMasterKey();
        const iv = crypto.getRandomValues(new Uint8Array(16)); // random IV
        const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(iv));
        const encrypted = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

        return JSON.stringify({
            iv: aesjs.utils.hex.fromBytes(iv),
            data: aesjs.utils.hex.fromBytes(encrypted),
        });
    }

    private async decrypt(value: string) {
        const { iv, data } = JSON.parse(value);
        const key = await this.getMasterKey();
        const cipher = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(aesjs.utils.hex.toBytes(iv)));
        const decrypted = cipher.decrypt(aesjs.utils.hex.toBytes(data));

        return aesjs.utils.utf8.fromBytes(decrypted);
    }

    async getItem(key: string) {
        const encrypted = await AsyncStorage.getItem(key);
        if (!encrypted) return null;
        return this.decrypt(encrypted);
    }

    async setItem(key: string, value: string) {
        const encrypted = await this.encrypt(value);
        await AsyncStorage.setItem(key, encrypted);
    }

    async removeItem(key: string) {
        await AsyncStorage.removeItem(key);
    }
}

const supabaseUrl = 'https://bsrearsgsuxczojykypr.supabase.co';
const supabasePublishableKey = process.env.EXPO_PUBLIC_DB_ANON_KEY;

if (!supabasePublishableKey) {
    throw new Error('Missing Supabase public key');
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
        storage: Platform.OS === 'web' ? getWebStorage() : new LargeSecureStore(),
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});