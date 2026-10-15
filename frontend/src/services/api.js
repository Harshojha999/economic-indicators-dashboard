import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token automatically
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('economic_dashboard_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Fallback benchmark indicators data matching Figma frame 1-2 exactly
export const FALLBACK_INDICATORS = [
  {
    indicator_code: 'gdp_growth',
    indicator_name: 'GDP Growth - India vs World (YOY%)',
    primary_metric_label: 'India',
    primary_metric_value: '4.82%',
    primary_metric_change: '-0.2pp',
    secondary_metric_label: 'World',
    secondary_metric_value: '3.82%',
    secondary_metric_change: '-0.81pp',
    chart_data: [
      { year: '2021', india: 8.7, world: 6.3 },
      { year: '2022', india: 8.7, world: 4.7 },
      { year: '2023', india: 8.7, world: 4.7 },
      { year: '2024', india: 8.7, world: 6.3 },
      { year: '2025', india: 8.7, world: 4.7 }
    ],
    source: 'National Statistical Office (NSO) / World Bank',
    observation_period: 'Q3 FY 2024-25',
    is_stale: false
  },
  {
    indicator_code: 'debt_to_gdp',
    indicator_name: 'Debt to GDP Ratio (IND)',
    primary_metric_label: 'India (FY25)',
    primary_metric_value: '3.82%',
    primary_metric_change: '-0.81pp',
    secondary_metric_label: 'Ind vs US',
    secondary_metric_value: '3.82%',
    secondary_metric_change: '-0.81pp',
    chart_data: [
      { date: '25 Jul', ratio: 78.0 },
      { date: '28 Jul', ratio: 88.0 },
      { date: '1 Aug', ratio: 65.0 },
      { date: '8 Aug', ratio: 54.0 },
      { date: '15 Aug', ratio: 65.0 },
      { date: '22 Aug', ratio: 72.0 }
    ],
    source: 'Reserve Bank of India (RBI Handbook of Statistics)',
    observation_period: 'FY 2024-25',
    is_stale: false
  },
  {
    indicator_code: 'trade_balance',
    indicator_name: 'Imports, Exports & Trade Balance',
    primary_metric_label: 'Exports',
    primary_metric_value: '$382.9 B',
    primary_metric_change: '-0.81pp',
    secondary_metric_label: 'Imports',
    secondary_metric_value: '$382.9 B',
    secondary_metric_change: '-0.81pp',
    chart_data: [
      { year: '2021', imports: 8.7, exports: 6.3, trade_balance: 2.5 },
      { year: '2022', imports: 8.7, exports: 4.7, trade_balance: 2.1 },
      { year: '2023', imports: 8.7, exports: 4.7, trade_balance: 1.8 },
      { year: '2024', imports: 8.7, exports: 6.3, trade_balance: 1.2 },
      { year: '2025', imports: 8.7, exports: 4.7, trade_balance: 0.8 }
    ],
    source: 'Ministry of Commerce and Industry (DGCIS)',
    observation_period: 'January 2025',
    is_stale: false
  },
  {
    indicator_code: 'gst_collection',
    indicator_name: 'GST Tax Collection (YOY%)',
    primary_metric_label: 'GST Collections',
    primary_metric_value: '3.82%',
    primary_metric_change: '-0.81pp',
    secondary_metric_label: 'Monthly Average',
    secondary_metric_value: '1.97',
    secondary_metric_change: '-0.81pp',
    chart_data: [
      { year: '2021', collection: 8.7, average: 2.1 },
      { year: '2022', collection: 6.7, average: 2.6 },
      { year: '2023', collection: 8.7, average: 3.7 },
      { year: '2024', collection: 8.7, average: 3.8 },
      { year: '2025', collection: 6.7, average: 3.2 }
    ],
    source: 'GST Council / Ministry of Finance (PIB)',
    observation_period: 'February 2025',
    is_stale: false
  },
  {
    indicator_code: 'inflation_cpi',
    indicator_name: 'Inflation (IND)',
    primary_metric_label: 'Inflation Rate',
    primary_metric_value: '2.1%',
    primary_metric_change: '-0.2pp',
    secondary_metric_label: 'RBI Target',
    secondary_metric_value: '4%',
    secondary_metric_change: '-0.2pp',
    chart_data: [
      { year: '2021', cpi: 8.2 },
      { year: '2022', cpi: 5.8 },
      { year: '2023', cpi: 2.8 },
      { year: '2024', cpi: 3.2 },
      { year: '2025', cpi: 5.4 }
    ],
    source: 'Ministry of Statistics and Programme Implementation (MOSPI) / RBI',
    observation_period: 'January 2025',
    is_stale: false
  },
  {
    indicator_code: 'govt_expenditure',
    indicator_name: 'Government Expenditure',
    primary_metric_label: 'Total Expenditure',
    primary_metric_value: '4.82%',
    primary_metric_change: '-0.2pp',
    secondary_metric_label: 'Capital Expenditure',
    secondary_metric_value: '3.82%',
    secondary_metric_change: '-0.2pp',
    chart_data: [
      { year: '2021', revenue: 21.2, capital: 10.0 },
      { year: '2022', revenue: 23.2, capital: 8.0 },
      { year: '2023', revenue: 23.2, capital: 8.0 },
      { year: '2024', revenue: 23.2, capital: 8.0 },
      { year: '2025', revenue: 23.2, capital: 8.0 }
    ],
    source: 'Controller General of Accounts (CGA) / Union Budget',
    observation_period: 'FY 2024-25 RE',
    is_stale: false
  }
];

export async function fetchTickerData() {
  try {
    const res = await client.get('/api/dashboard/ticker');
    return res.data?.data || [];
  } catch (err) {
    return [
      { symbol: 'SENSEX', price: 73158.24, change_value: 305.10, change_percent: 0.42 },
      { symbol: 'NIFTY BANK', price: 46919.80, change_value: -56.30, change_percent: -0.12 },
      { symbol: 'NIFTY IT', price: 37842.15, change_value: 412.50, change_percent: 1.10 }
    ];
  }
}

export async function fetchIndicatorsData() {
  try {
    const res = await client.get('/api/dashboard/indicators');
    if (res.data?.data && res.data.data.length > 0) {
      return { data: res.data.data, isStale: false };
    }
    return { data: FALLBACK_INDICATORS, isStale: true };
  } catch (err) {
    return { data: FALLBACK_INDICATORS, isStale: true };
  }
}

export async function loginUser(email, password) {
  const res = await client.post('/api/auth/login', { email, password });
  if (res.data?.access_token) {
    localStorage.setItem('economic_dashboard_token', res.data.access_token);
    localStorage.setItem('economic_dashboard_user', JSON.stringify(res.data.user));
  }
  return res.data;
}

export async function registerUser(email, password, fullName) {
  const res = await client.post('/api/auth/register', { email, password, full_name: fullName });
  if (res.data?.access_token) {
    localStorage.setItem('economic_dashboard_token', res.data.access_token);
    localStorage.setItem('economic_dashboard_user', JSON.stringify(res.data.user));
  }
  return res.data;
}

export async function checkHealth() {
  try {
    const res = await client.get('/api/health');
    return res.data?.status === 'healthy';
  } catch {
    return false;
  }
}
