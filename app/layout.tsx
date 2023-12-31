import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { lazy } from 'react';
import './globals.css';
const CookieBanner = lazy(() => import('../components/CookieBanner'));
const GoogleAnalytics = lazy(
	() => import('../components/GoogleAnalytics')
);

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Google Analytics Setup',
	description: 'Generated by create next app'
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<GoogleAnalytics GA_MEASUREMENT_ID='G-00000000' />
			<body className={inter.className}>
				{children}
				<CookieBanner />
			</body>
		</html>
	);
}
