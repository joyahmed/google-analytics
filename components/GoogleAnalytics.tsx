'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import pageView from '../lib/gtagHelpter';

interface GoogleAnalyticsProps {
	GA_MEASUREMENT_ID: string;
}

const GoogleAnalytics = ({
	GA_MEASUREMENT_ID
}: GoogleAnalyticsProps) => {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const url = pathname + searchParams.toString();

		pageView(GA_MEASUREMENT_ID, url);
	}, [pathname, searchParams, GA_MEASUREMENT_ID]);

	return (
		<>
			<Script
				strategy='afterInteractive'
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
			/>
			<Script
				id='google-analytics'
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('consent', 'default', {
            'analytics_storage': 'denied'
        });

        gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
        });
        `
				}}
			/>
		</>
	);
};

export default GoogleAnalytics;
