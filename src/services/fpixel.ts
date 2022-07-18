// import { FacebookPixel } from '@/components/FacebookPixel';
// export const FB_PIXEL_ID = process.env.FacebookPixel

declare global {
    interface Window {
        fbq: any;
    }
}

export const pageview = () => {
    window.fbq('track', 'PageView')
}

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name: string, options = {}) => {
    window.fbq('track', name, options)
}