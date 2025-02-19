import { Amiri, Lateef, IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import localFont from 'next/font/local';


export const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: '--font-plus_jakarta_sans',
});


export const ibm_plex_sans_arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm_plex_sans_arabic',
});

export const lateef = Lateef({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-lateef',
});

export const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-amiri',
});

export const qalam = localFont({
  src: '../public/fonts/Al-Qalam/qalam.ttf',
  display: 'swap',
  variable: '--font-qalam',
});

export const me_quran = localFont({
  src: '../public/fonts/me_quran/me_quran.ttf',
  display: 'swap',
  variable: '--font-meQuran',
});

export const kfgqpc_hafs = localFont({
  src: '../public/fonts/KFGQPC/KFGQPC_HAFS.otf',
  display: 'swap',
  variable: '--font-kfgqpc_hafs',
});

export const kitab = localFont({
  src: '../public/fonts/Kitab/Kitab-Regular.ttf',
  display: 'swap',
  variable: '--font-kitab',
});

export const bismillah = localFont({
  src: '../public/fonts/bismillah/QCF_Bismillah_COLOR-Regular.woff2',
  display: 'swap',
  variable: '--font-bismillah',
});
