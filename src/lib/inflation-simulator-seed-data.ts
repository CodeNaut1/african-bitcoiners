import type { Payload } from 'payload'

type InflationSimulatorData = {
  code: string
  name: string
  symbol: string
  flagCode: string
  emoji: string
  enabled?: boolean
  inflationRates: { year: number; rate: number }[]
}

function rates(map: Record<number, number>): { year: number; rate: number }[] {
  return Object.entries(map)
    .map(([year, rate]) => ({ year: Number(year), rate }))
    .sort((a, b) => a.year - b.year)
}

function flatRates(from: number, to: number, rate: number): { year: number; rate: number }[] {
  const map: Record<number, number> = {}
  for (let y = from; y <= to; y++) map[y] = rate
  return rates(map)
}

/** Bitcoin yearly average prices — exact values from bitcoin-simulator.php */
export const SEED_BITCOIN_PRICES = [
  { year: 2010, priceUsd: 0.0001 },
  { year: 2011, priceUsd: 0.003 },
  { year: 2012, priceUsd: 0.005 },
  { year: 2013, priceUsd: 0.0135 },
  { year: 2014, priceUsd: 0.0057 },
  { year: 2015, priceUsd: 0.0035 },
  { year: 2016, priceUsd: 0.0063 },
  { year: 2017, priceUsd: 0.0133 },
  { year: 2018, priceUsd: 0.0074 },
  { year: 2019, priceUsd: 0.0086 },
  { year: 2020, priceUsd: 0.0116 },
  { year: 2021, priceUsd: 0.0489 },
  { year: 2022, priceUsd: 0.0287 },
  { year: 2023, priceUsd: 0.0372 },
  { year: 2024, priceUsd: 0.069 },
  { year: 2025, priceUsd: 0.106 },
]

/** All 42 African currencies — inflation rates from bitcoin-simulator.php $inflation_data */
export const SEED_CURRENCIES: InflationSimulatorData[] = [
  {
    code: 'DZD',
    name: 'Algerian Dinar',
    symbol: 'د.ج',
    flagCode: 'dz',
    emoji: '🇩🇿',
    inflationRates: rates({
      2010: 3.9, 2011: 4.5, 2012: 8.9, 2013: 3.3, 2014: 2.9, 2015: 4.8, 2016: 6.4, 2017: 5.6,
      2018: 4.7, 2019: 2.0, 2020: 2.4, 2021: 7.2, 2022: 9.3, 2023: 9.0, 2024: 5.0, 2025: 4.5,
    }),
  },
  {
    code: 'AOA',
    name: 'Angolan Kwanza',
    symbol: 'Kz',
    flagCode: 'ao',
    emoji: '🇦🇴',
    inflationRates: rates({
      2010: 14.5, 2011: 13.5, 2012: 10.3, 2013: 8.8, 2014: 7.3, 2015: 9.7, 2016: 32.4, 2017: 29.8,
      2018: 19.6, 2019: 17.1, 2020: 22.3, 2021: 25.8, 2022: 21.4, 2023: 15.5, 2024: 12.0, 2025: 10.0,
    }),
  },
  {
    code: 'BWP',
    name: 'Botswana Pula',
    symbol: 'P',
    flagCode: 'bw',
    emoji: '🇧🇼',
    inflationRates: rates({
      2010: 3.3, 2011: 8.5, 2012: 7.5, 2013: 5.8, 2014: 4.4, 2015: 3.2, 2016: 7.6, 2017: 3.4,
      2018: 3.2, 2019: 2.3, 2020: 1.9, 2021: 6.7, 2022: 12.2, 2023: 2.6, 2024: 3.0, 2025: 3.5,
    }),
  },
  {
    code: 'BIF',
    name: 'Burundian Franc',
    symbol: 'FBu',
    flagCode: 'bi',
    emoji: '🇧🇮',
    inflationRates: rates({
      2010: 6.5, 2011: 9.2, 2012: 18.5, 2013: 7.7, 2014: 4.5, 2015: 5.5, 2016: 5.5, 2017: 15.4,
      2018: 4.2, 2019: 4.0, 2020: 7.0, 2021: 6.7, 2022: 16.5, 2023: 16.8, 2024: 10.0, 2025: 10.0,
    }),
  },
  {
    code: 'XAF',
    name: 'Central African CFA Franc',
    symbol: 'FCFA',
    flagCode: 'cm',
    emoji: '🇨🇲',
    inflationRates: rates({
      2010: 1.3, 2011: 2.8, 2012: 2.9, 2013: 2.1, 2014: 1.9, 2015: 2.0, 2016: 0.7, 2017: 0.6,
      2018: 1.1, 2019: 2.0, 2020: 2.3, 2021: 2.7, 2022: 5.9, 2023: 2.5, 2024: 2.8, 2025: 3.0,
    }),
  },
  {
    code: 'CVE',
    name: 'Cape Verdean Escudo',
    symbol: 'CVE',
    flagCode: 'cv',
    emoji: '🇨🇻',
    inflationRates: rates({
      2010: 2.1, 2011: 4.5, 2012: 2.5, 2013: 0.4, 2014: 0.0, 2015: 0.5, 2016: 0.7, 2017: 0.7,
      2018: 2.2, 2019: 1.1, 2020: 1.9, 2021: 3.7, 2022: 6.5, 2023: 4.7, 2024: 4.0, 2025: 4.0,
    }),
  },
  {
    code: 'KMF',
    name: 'Comorian Franc',
    symbol: 'CF',
    flagCode: 'km',
    emoji: '🇰🇲',
    inflationRates: rates({
      2010: 1.6, 2011: 5.7, 2012: 6.4, 2013: 1.7, 2014: 0.0, 2015: 0.2, 2016: 1.7, 2017: 1.3,
      2018: 1.6, 2019: 0.6, 2020: 0.8, 2021: 2.2, 2022: 5.3, 2023: 4.0, 2024: 3.5, 2025: 3.5,
    }),
  },
  {
    code: 'CDF',
    name: 'Congolese Franc',
    symbol: 'FC',
    flagCode: 'cd',
    emoji: '🇨🇩',
    inflationRates: rates({
      2010: 22.7, 2011: 14.4, 2012: 2.7, 2013: 1.0, 2014: 1.0, 2015: 1.2, 2016: 18.2, 2017: 24.3,
      2018: 28.8, 2019: 4.6, 2020: 9.7, 2021: 9.5, 2022: 10.4, 2023: 9.6, 2024: 15.0, 2025: 15.0,
    }),
  },
  {
    code: 'DJF',
    name: 'Djoutian Franc',
    symbol: 'Fdj',
    flagCode: 'dj',
    emoji: '🇩🇯',
    inflationRates: rates({
      2010: 4.0, 2011: 5.0, 2012: 3.7, 2013: 2.9, 2014: 0.9, 2015: 0.0, 2016: 0.7, 2017: 0.2,
      2018: 1.0, 2019: 3.4, 2020: 2.0, 2021: 1.5, 2022: 3.0, 2023: 3.8, 2024: 3.5, 2025: 3.5,
    }),
  },
  {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: '£',
    flagCode: 'eg',
    emoji: '🇪🇬',
    inflationRates: rates({
      2010: 11.2, 2011: 10.1, 2012: 7.1, 2013: 6.9, 2014: 10.1, 2015: 11.0, 2016: 10.2, 2017: 29.6,
      2018: 14.4, 2019: 9.1, 2020: 5.7, 2021: 5.4, 2022: 13.7, 2023: 35.7, 2024: 25.5, 2025: 20.0,
    }),
  },
  {
    code: 'ERN',
    name: 'Eritrean Nakfa',
    symbol: 'Nfk',
    flagCode: 'er',
    emoji: '🇪🇷',
    inflationRates: rates({
      2010: 12.3, 2011: 12.6, 2012: 5.9, 2013: 6.1, 2014: 10.0, 2015: 9.0, 2016: 9.0, 2017: 9.0,
      2018: 9.0, 2019: 9.0, 2020: 9.0, 2021: 9.0, 2022: 9.0, 2023: 9.0, 2024: 10.0, 2025: 10.0,
    }),
  },
  {
    code: 'ETB',
    name: 'Ethiopian Birr',
    symbol: 'Br',
    flagCode: 'et',
    emoji: '🇪🇹',
    inflationRates: rates({
      2010: 8.1, 2011: 18.1, 2012: 22.7, 2013: 7.7, 2014: 7.4, 2015: 10.1, 2016: 7.4, 2017: 9.9,
      2018: 13.3, 2019: 15.8, 2020: 20.4, 2021: 26.6, 2022: 33.7, 2023: 28.8, 2024: 20.0, 2025: 20.0,
    }),
  },
  {
    code: 'GMD',
    name: 'Gambian Dalasi',
    symbol: 'D',
    flagCode: 'gm',
    emoji: '🇬🇲',
    inflationRates: rates({
      2010: 5.0, 2011: 4.8, 2012: 4.8, 2013: 5.7, 2014: 6.1, 2015: 6.5, 2016: 7.2, 2017: 8.0,
      2018: 6.4, 2019: 7.0, 2020: 5.7, 2021: 6.4, 2022: 13.1, 2023: 13.7, 2024: 10.0, 2025: 10.0,
    }),
  },
  {
    code: 'GHS',
    name: 'Ghanaian Cedi',
    symbol: '₵',
    flagCode: 'gh',
    emoji: '🇬🇭',
    inflationRates: rates({
      2010: 10.7, 2011: 8.7, 2012: 9.2, 2013: 11.0, 2014: 15.5, 2015: 17.7, 2016: 17.5, 2017: 12.4,
      2018: 9.8, 2019: 7.2, 2020: 9.9, 2021: 7.7, 2022: 31.6, 2023: 35.2, 2024: 20.0, 2025: 18.0,
    }),
  },
  {
    code: 'GNF',
    name: 'Guinean Franc',
    symbol: 'FG',
    flagCode: 'gn',
    emoji: '🇬🇳',
    inflationRates: rates({
      2010: 15.6, 2011: 16.1, 2012: 15.6, 2013: 9.2, 2014: 8.9, 2015: 8.2, 2016: 8.2, 2017: 8.6,
      2018: 9.0, 2019: 9.2, 2020: 10.4, 2021: 10.5, 2022: 11.0, 2023: 9.0, 2024: 9.5, 2025: 9.5,
    }),
  },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flagCode: 'ke',
    emoji: '🇰🇪',
    inflationRates: rates({
      2010: 4.1, 2011: 14.0, 2012: 9.4, 2013: 5.7, 2014: 6.6, 2015: 6.6, 2016: 6.3, 2017: 8.0,
      2018: 4.7, 2019: 5.2, 2020: 5.3, 2021: 6.1, 2022: 7.7, 2023: 7.8, 2024: 5.7, 2025: 5.5,
    }),
  },
  {
    code: 'LSL',
    name: 'Lesotho Loti',
    symbol: 'L',
    flagCode: 'ls',
    emoji: '🇱🇸',
    inflationRates: rates({
      2010: 4.3, 2011: 5.0, 2012: 5.7, 2013: 5.8, 2014: 6.1, 2015: 4.6, 2016: 6.3, 2017: 5.3,
      2018: 4.6, 2019: 4.1, 2020: 3.2, 2021: 4.6, 2022: 6.9, 2023: 5.7, 2024: 4.8, 2025: 4.5,
    }),
  },
  {
    code: 'LRD',
    name: 'Liberian Dollar',
    symbol: '$',
    flagCode: 'lr',
    emoji: '🇱🇷',
    inflationRates: rates({
      2010: 6.8, 2011: 7.5, 2012: 6.5, 2013: 7.5, 2014: 9.2, 2015: 7.8, 2016: 8.0, 2017: 12.5,
      2018: 13.5, 2019: 10.0, 2020: 9.5, 2021: 7.4, 2022: 7.6, 2023: 10.7, 2024: 10.0, 2025: 10.0,
    }),
  },
  {
    code: 'LYD',
    name: 'Libyan Dinar',
    symbol: 'LD',
    flagCode: 'ly',
    emoji: '🇱🇾',
    inflationRates: rates({
      2010: 2.5, 2011: 15.9, 2012: 6.1, 2013: 2.7, 2014: 2.4, 2015: 9.8, 2016: 25.9, 2017: 28.0,
      2018: 24.8, 2019: 10.0, 2020: 2.7, 2021: 3.5, 2022: 4.0, 2023: 3.9, 2024: 4.5, 2025: 4.5,
    }),
  },
  {
    code: 'MGA',
    name: 'Malagasy Ariary',
    symbol: 'Ar',
    flagCode: 'mg',
    emoji: '🇲🇬',
    inflationRates: rates({
      2010: 9.2, 2011: 9.5, 2012: 5.8, 2013: 6.3, 2014: 6.1, 2015: 7.4, 2016: 6.8, 2017: 8.0,
      2018: 7.2, 2019: 4.7, 2020: 4.4, 2021: 6.0, 2022: 8.0, 2023: 7.4, 2024: 6.5, 2025: 6.5,
    }),
  },
  {
    code: 'MWK',
    name: 'Malawian Kwacha',
    symbol: 'MK',
    flagCode: 'mw',
    emoji: '🇲🇼',
    inflationRates: rates({
      2010: 7.4, 2011: 7.6, 2012: 21.6, 2013: 27.3, 2014: 24.0, 2015: 21.9, 2016: 21.7, 2017: 11.5,
      2018: 9.0, 2019: 9.4, 2020: 8.6, 2021: 8.0, 2022: 21.0, 2023: 28.8, 2024: 25.0, 2025: 20.0,
    }),
  },
  {
    code: 'MRO',
    name: 'Mauritanian Ouguiya',
    symbol: 'UM',
    flagCode: 'mr',
    emoji: '🇲🇷',
    inflationRates: rates({
      2010: 6.3, 2011: 5.7, 2012: 7.0, 2013: 4.2, 2014: 3.8, 2015: 0.5, 2016: 2.0, 2017: 2.3,
      2018: 3.0, 2019: 2.8, 2020: 2.0, 2021: 2.5, 2022: 4.6, 2023: 4.8, 2024: 4.0, 2025: 4.0,
    }),
  },
  {
    code: 'MUR',
    name: 'Mauritian Rupee',
    symbol: '₨',
    flagCode: 'mu',
    emoji: '🇲🇺',
    inflationRates: rates({
      2010: 2.9, 2011: 6.5, 2012: 3.9, 2013: 3.5, 2014: 2.8, 2015: 1.3, 2016: 0.9, 2017: 6.1,
      2018: 3.2, 2019: 0.6, 2020: 2.2, 2021: 4.1, 2022: 9.3, 2023: 5.9, 2024: 5.0, 2025: 5.0,
    }),
  },
  {
    code: 'MAD',
    name: 'Moroccan Dirham',
    symbol: 'د.م',
    flagCode: 'ma',
    emoji: '🇲🇦',
    inflationRates: rates({
      2010: 1.0, 2011: 0.9, 2012: 1.3, 2013: 1.9, 2014: 0.4, 2015: 1.6, 2016: 1.6, 2017: 0.7,
      2018: 1.8, 2019: 0.2, 2020: 0.7, 2021: 1.4, 2022: 6.7, 2023: 6.1, 2024: 2.0, 2025: 1.8,
    }),
  },
  {
    code: 'MZN',
    name: 'Mozambican Metical',
    symbol: 'MT',
    flagCode: 'mz',
    emoji: '🇲🇿',
    inflationRates: rates({
      2010: 12.7, 2011: 10.4, 2012: 2.1, 2013: 4.2, 2014: 2.0, 2015: 2.4, 2016: 20.7, 2017: 15.0,
      2018: 3.9, 2019: 2.8, 2020: 3.3, 2021: 7.1, 2022: 10.5, 2023: 6.8, 2024: 6.0, 2025: 6.0,
    }),
  },
  {
    code: 'NAD',
    name: 'Namibian Dollar',
    symbol: '$',
    flagCode: 'na',
    emoji: '🇳🇦',
    inflationRates: rates({
      2010: 4.3, 2011: 5.0, 2012: 5.7, 2013: 5.8, 2014: 6.1, 2015: 4.6, 2016: 6.3, 2017: 5.3,
      2018: 4.6, 2019: 4.1, 2020: 3.2, 2021: 4.6, 2022: 6.9, 2023: 5.7, 2024: 4.8, 2025: 4.5,
    }),
  },
  {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    flagCode: 'ng',
    emoji: '🇳🇬',
    inflationRates: rates({
      2010: 13.7, 2011: 10.8, 2012: 12.2, 2013: 8.5, 2014: 8.0, 2015: 9.0, 2016: 15.7, 2017: 16.5,
      2018: 12.1, 2019: 11.4, 2020: 13.2, 2021: 17.1, 2022: 18.8, 2023: 24.5, 2024: 28.9, 2025: 25.0,
    }),
  },
  {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'FRw',
    flagCode: 'rw',
    emoji: '🇷🇼',
    inflationRates: rates({
      2010: 2.3, 2011: 5.7, 2012: 6.6, 2013: 4.2, 2014: 1.8, 2015: 2.5, 2016: 5.7, 2017: 7.3,
      2018: 1.4, 2019: 2.1, 2020: 6.8, 2021: 2.0, 2022: 16.7, 2023: 6.9, 2024: 6.0, 2025: 6.0,
    }),
  },
  {
    code: 'STN',
    name: 'São Tomé and Príncipe Dobra',
    symbol: 'Db',
    flagCode: 'st',
    emoji: '🇸🇹',
    inflationRates: rates({
      2010: 13.2, 2011: 14.3, 2012: 10.1, 2013: 6.9, 2014: 6.0, 2015: 4.8, 2016: 5.5, 2017: 6.0,
      2018: 7.0, 2019: 7.9, 2020: 12.0, 2021: 8.0, 2022: 15.0, 2023: 20.0, 2024: 15.0, 2025: 15.0,
    }),
  },
  {
    code: 'SCR',
    name: 'Seychellois Rupee',
    symbol: '₨',
    flagCode: 'sc',
    emoji: '🇸🇨',
    inflationRates: rates({
      2010: -2.4, 2011: 2.6, 2012: 7.4, 2013: 4.2, 2014: 1.7, 2015: 4.0, 2016: -2.8, 2017: 2.8,
      2018: 3.7, 2019: 1.9, 2020: -1.0, 2021: 6.0, 2022: 8.5, 2023: 4.8, 2024: 4.0, 2025: 4.0,
    }),
  },
  {
    code: 'SLL',
    name: 'Sierra Leonean Leone',
    symbol: 'Le',
    flagCode: 'sl',
    emoji: '🇸🇱',
    inflationRates: rates({
      2010: 18.0, 2011: 18.6, 2012: 8.1, 2013: 9.4, 2014: 8.8, 2015: 7.8, 2016: 7.3, 2017: 18.2,
      2018: 16.1, 2019: 14.8, 2020: 10.2, 2021: 8.0, 2022: 40.0, 2023: 45.0, 2024: 30.0, 2025: 25.0,
    }),
  },
  {
    code: 'SOS',
    name: 'Somali Shilling',
    symbol: 'Sh',
    flagCode: 'so',
    emoji: '🇸🇴',
    inflationRates: flatRates(2010, 2025, 10.0),
  },
  {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R',
    flagCode: 'za',
    emoji: '🇿🇦',
    inflationRates: rates({
      2010: 4.3, 2011: 5.0, 2012: 5.7, 2013: 5.8, 2014: 6.1, 2015: 4.6, 2016: 6.3, 2017: 5.3,
      2018: 4.6, 2019: 4.1, 2020: 3.2, 2021: 4.6, 2022: 6.9, 2023: 5.7, 2024: 4.8, 2025: 4.5,
    }),
  },
  {
    code: 'SSP',
    name: 'South Sudanese Pound',
    symbol: '£',
    flagCode: 'ss',
    emoji: '🇸🇸',
    inflationRates: flatRates(2010, 2025, 20.0),
  },
  {
    code: 'SDG',
    name: 'Sudanese Pound',
    symbol: 'SDG',
    flagCode: 'sd',
    emoji: '🇸🇩',
    inflationRates: rates({
      2010: 13.0, 2011: 18.0, 2012: 36.0, 2013: 36.5, 2014: 36.9, 2015: 10.8, 2016: 12.7, 2017: 27.0,
      2018: 63.3, 2019: 51.0, 2020: 163.0, 2021: 359.0, 2022: 250.0, 2023: 250.0, 2024: 200.0,
      2025: 180.0,
    }),
  },
  {
    code: 'SZL',
    name: 'Swazi Lilangeni',
    symbol: 'E',
    flagCode: 'sz',
    emoji: '🇸🇿',
    inflationRates: rates({
      2010: 4.3, 2011: 5.0, 2012: 5.7, 2013: 5.8, 2014: 6.1, 2015: 4.6, 2016: 6.3, 2017: 5.3,
      2018: 4.6, 2019: 4.1, 2020: 3.2, 2021: 4.6, 2022: 6.9, 2023: 5.7, 2024: 4.8, 2025: 4.5,
    }),
  },
  {
    code: 'TND',
    name: 'Tunisian Dinar',
    symbol: 'د.ت',
    flagCode: 'tn',
    emoji: '🇹🇳',
    inflationRates: rates({
      2010: 4.4, 2011: 3.5, 2012: 5.1, 2013: 5.7, 2014: 4.9, 2015: 4.7, 2016: 3.7, 2017: 5.3,
      2018: 7.3, 2019: 6.7, 2020: 5.6, 2021: 5.7, 2022: 8.3, 2023: 9.0, 2024: 7.5, 2025: 6.5,
    }),
  },
  {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TSh',
    flagCode: 'tz',
    emoji: '🇹🇿',
    inflationRates: flatRates(2010, 2025, 6.0),
  },
  {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'USh',
    flagCode: 'ug',
    emoji: '🇺🇬',
    inflationRates: flatRates(2010, 2025, 6.0),
  },
  {
    code: 'XOF',
    name: 'West African CFA Franc',
    symbol: 'FCFA',
    flagCode: 'sn',
    emoji: '🇸🇳',
    inflationRates: rates({
      2010: 1.3, 2011: 2.8, 2012: 2.9, 2013: 2.1, 2014: 1.9, 2015: 2.0, 2016: 0.7, 2017: 0.6,
      2018: 1.1, 2019: 2.0, 2020: 2.3, 2021: 2.7, 2022: 5.9, 2023: 2.5, 2024: 2.8, 2025: 3.0,
    }),
  },
  {
    code: 'ZMW',
    name: 'Zambian Kwacha',
    symbol: 'ZK',
    flagCode: 'zm',
    emoji: '🇿🇲',
    inflationRates: flatRates(2010, 2025, 10.0),
  },
  {
    code: 'ZWL',
    name: 'Zimbabwean Dollar',
    symbol: '$',
    flagCode: 'zw',
    emoji: '🇿🇼',
    inflationRates: rates({
      2010: 3.2, 2011: 3.6, 2012: 3.7, 2013: 1.6, 2014: -0.2, 2015: -2.3, 2016: -1.5, 2017: 0.9,
      2018: 10.6, 2019: 255.3, 2020: 557.2, 2021: 98.5, 2022: 104.7, 2023: 150.0, 2024: 100.0,
      2025: 80.0,
    }),
  },
]

export async function seedInflationSimulatorData(payload: Payload): Promise<void> {
  await payload.updateGlobal({
    slug: 'inflation-simulator-data',
    data: {
      currencies: SEED_CURRENCIES.map((c) => ({
        code: c.code,
        name: c.name,
        symbol: c.symbol,
        flagCode: c.flagCode,
        emoji: c.emoji,
        enabled: true,
        inflationRates: c.inflationRates,
      })),
      bitcoinPrices: SEED_BITCOIN_PRICES,
      maxYearsBack: 15,
      lastUpdated: new Date().toISOString(),
    },
    overrideAccess: true,
  })
}
