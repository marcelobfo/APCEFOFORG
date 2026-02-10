
import { SiteConfig } from '../types';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
    fbq: (...args: any[]) => void;
    _fbq?: any;
  }
}

// Helper to hash data (SHA-256) for Facebook CAPI
async function sha256(message: string): Promise<string> {
  if (!message) return '';
  const msgBuffer = new TextEncoder().encode(message.toLowerCase().trim());
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Helper to get cookies
function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

// Helper to generate UUID for event_id
function generateEventId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

let trackingConfig: SiteConfig | null = null;

export const initTracking = (config: SiteConfig) => {
  trackingConfig = config;

  // Initialize Google Analytics (GA4)
  if (config.google_analytics_id) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.google_analytics_id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', config.google_analytics_id);
    console.log(`[Tracking] GA4 Initialized: ${config.google_analytics_id}`);
  }

  // Initialize Facebook Pixel
  if (config.facebook_pixel_id) {
    // @ts-ignore
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', config.facebook_pixel_id);
    window.fbq('track', 'PageView');
    console.log(`[Tracking] FB Pixel Initialized: ${config.facebook_pixel_id}`);
  }
};

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  externalId?: string;
}

export const trackEvent = async (
  eventName: 'PageView' | 'Lead' | 'ViewContent' | 'Purchase' | 'Contact', 
  params?: any,
  userData?: UserData
) => {
  if (!trackingConfig) return;

  const eventID = generateEventId();

  // 1. Google Analytics
  if (trackingConfig.google_analytics_id && window.gtag) {
    window.gtag('event', eventName, { ...params, event_id: eventID });
  }

  // 2. Facebook Pixel (Client Side)
  if (trackingConfig.facebook_pixel_id && window.fbq) {
    if (eventName === 'PageView') {
      window.fbq('track', 'PageView', {}, { eventID });
    } else {
      window.fbq('track', eventName, params, { eventID });
    }
  }

  // 3. Facebook Conversion API (Server Side simulation via Client)
  // This sends data directly to Graph API v24.0
  if (trackingConfig.facebook_pixel_id && trackingConfig.facebook_access_token) {
    try {
      // Process Name
      let fn = userData?.firstName;
      let ln = userData?.lastName;
      if (!fn && !ln && userData?.fullName) {
        const parts = userData.fullName.trim().split(' ');
        fn = parts[0];
        if (parts.length > 1) ln = parts.slice(1).join(' ');
      }

      // Hash User Data
      const hashedEmail = userData?.email ? await sha256(userData.email) : undefined;
      const hashedPhone = userData?.phone ? await sha256(userData.phone) : undefined;
      const hashedFn = fn ? await sha256(fn) : undefined;
      const hashedLn = ln ? await sha256(ln) : undefined;
      const hashedCt = userData?.city ? await sha256(userData.city) : undefined;
      const hashedSt = userData?.state ? await sha256(userData.state) : undefined;
      const hashedZp = userData?.zip ? await sha256(userData.zip) : undefined;
      const hashedCountry = userData?.country ? await sha256(userData.country) : undefined;
      const hashedExternalId = userData?.externalId ? await sha256(userData.externalId) : undefined;

      // Get Cookies
      const fbp = getCookie('_fbp');
      const fbc = getCookie('_fbc');

      const eventTime = Math.floor(Date.now() / 1000);
      
      const payload = {
        data: [
          {
            event_name: eventName,
            event_time: eventTime,
            event_id: eventID,
            action_source: "website",
            event_source_url: window.location.href,
            user_data: {
              em: hashedEmail ? [hashedEmail] : undefined,
              ph: hashedPhone ? [hashedPhone] : undefined,
              fn: hashedFn ? [hashedFn] : undefined,
              ln: hashedLn ? [hashedLn] : undefined,
              ct: hashedCt ? [hashedCt] : undefined,
              st: hashedSt ? [hashedSt] : undefined,
              zp: hashedZp ? [hashedZp] : undefined,
              country: hashedCountry ? [hashedCountry] : undefined,
              external_id: hashedExternalId ? [hashedExternalId] : undefined,
              client_user_agent: navigator.userAgent,
              fbp: fbp,
              fbc: fbc,
              // client_ip_address: Not available reliably client-side without a service
            },
            custom_data: params
          }
        ]
      };

      // API Version v24.0 as requested
      const url = `https://graph.facebook.com/v24.0/${trackingConfig.facebook_pixel_id}/events?access_token=${trackingConfig.facebook_access_token}`;

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }).then(res => res.json())
        .then(data => {
            if (data.error) {
                console.warn('[Tracking] CAPI Error:', data.error);
            } else {
                console.log('[Tracking] CAPI Success:', data);
            }
        })
        .catch(err => console.error('[Tracking] CAPI Network Error:', err));

    } catch (error) {
      console.error('[Tracking] Error processing CAPI event:', error);
    }
  }
};
