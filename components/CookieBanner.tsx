'use client';

import {
	getLocalStorage,
	setLocalStorage
} from '@/lib/storageHelper';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CookieBanner = () => {
	const [cookieConsent, setCookieConsent] = useState(false);

	useEffect(() => {
		const storedCookieConsent = getLocalStorage(
			'cookie_consent',
			null
		);

		setCookieConsent(storedCookieConsent);
	}, []);

	useEffect(() => {
		const newValue = cookieConsent ? 'granted' : 'denied';

		window.gtag('consent', 'update', {
			analytics_storage: newValue
		});

		setLocalStorage('cookie_consent', cookieConsent);
	}, [cookieConsent]);
	return (
		<div
			className={`my-10 mx-auto max-w-max md:max-w-screen-lg fixed bottom-0 left-0 right-0 px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4 bg-gray-800/50 hover:bg-gray-700/50  backdrop-blur-sm rounded-lg shadow text-white
			${cookieConsent != null ? 'hidden' : 'flex'}
			`}
		>
			<div className='text-center'>
				<Link href='/info/cookies'>
					<span>
						We use{' '}
						<span className='font-bold text-sky-400'>cookies</span> on
						our site.
					</span>
				</Link>
			</div>

			<div className='flex gap-2'>
				<button
					className='px-5 py-2 text-gray-300 rounded-md border-2 border-white/10'
					onClick={() => setCookieConsent(false)}
				>
					Decline
				</button>
				<button
					className='bg-blue-900/50 hover:bg-blue-900/90 backdrop-blur-sm px-5 py-2 text-white rounded-lg'
					onClick={() => setCookieConsent(true)}
				>
					Allow Cookies
				</button>
			</div>
		</div>
	);
};

export default CookieBanner;
