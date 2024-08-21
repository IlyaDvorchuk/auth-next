import { ReactNode } from 'react';
import { AuthProvider } from './auth-context';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html>
        <head>
            <title>My App</title>
        </head>
        <body>
        <AuthProvider>
            {children}
        </AuthProvider>
        </body>
        </html>
    );
}
