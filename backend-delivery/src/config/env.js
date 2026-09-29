import 'dotenv/config';
const required = ['JWT_SECRET'];
if (process.env.NODE_ENV === 'production') for (const key of required) if (!process.env[key]) throw new Error(`Missing ${key}`);
export const env = { port: Number(process.env.PORT || 5000), clientUrl: process.env.CLIENT_URL || 'http://localhost:5173', jwtSecret: process.env.JWT_SECRET || 'demo-secret-change-me', jwtExpires: process.env.JWT_EXPIRES_IN || '8h', demo: process.env.DEMO_MODE === 'true', supabaseUrl: process.env.SUPABASE_URL, serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY };
