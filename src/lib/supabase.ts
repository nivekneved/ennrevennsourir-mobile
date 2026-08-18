import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://lmzjmenkcfpyktvjeqrk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GzvHCp3eSkR_h37V12cr6Q_6j87Gfwt';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
