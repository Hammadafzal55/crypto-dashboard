'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_COINGECKO_BASE_URL ?? 'https://api.coingecko.com/api/v3';

const formatCurrency = (value: number | null | undefined, currency: string) => {
  if (value == null) return 'N/A';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const CryptoDashboard = ({ currency = 'usd', perPage = 24 }: { currency?: string; perPage?: number }) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoinRates = async () => {
      setCoins([]);
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${apiBaseUrl}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=1&sparkline=false&price_change_percentage=24h,7d,14d,30d`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`,
            },
          },
        );

        setCoins(response.data || []);
      } catch (fetchError) {
        console.error('Error fetching coin rates:', fetchError);
        setError('Unable to load market data at the moment.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoinRates();
  }, [currency, perPage]);

  if (loading) {
    return (
      <div className="rounded-4xl border border-slate-800/80 bg-slate-950/90 p-16 text-center shadow-2xl shadow-slate-950/30">
        <p className="text-lg font-semibold text-slate-200">Connecting to CoinGecko API…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-4xl border border-rose-500/20 bg-rose-500/5 p-12 text-center text-rose-200 shadow-2xl shadow-rose-500/10">
        <p className="text-lg font-semibold">{error}</p>
        <p className="mt-3 text-sm text-slate-400">Refresh the page or try a different currency.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-3">
      {coins.map((coin) => (
        <div
          key={coin.id}
          className="overflow-hidden rounded-4xl border border-slate-800/80 bg-slate-950/80 p-6 shadow-2xl shadow-slate-950/30 transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-slate-900/90"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={coin.image} alt={coin.name} className="h-12 w-12 rounded-full border border-slate-700/80 bg-slate-900 p-1" />
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{coin.symbol}</p>
                <h2 className="text-2xl font-semibold text-white">{coin.name}</h2>
              </div>
            </div>
            <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-300">
              #{coin.market_cap_rank}
            </span>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-900/80 px-5 py-4">
              <p className="text-sm text-slate-400">Current Price</p>
              <p className="mt-2 text-2xl font-semibold text-white">{formatCurrency(coin.current_price, currency)}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 px-5 py-4">
                <p className="text-sm text-slate-400">Market Cap</p>
                <p className="mt-2 text-lg font-semibold text-slate-100 wrap-break-word max-w-full">{formatCurrency(coin.market_cap, currency)}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 px-5 py-4">
                <p className="text-sm text-slate-400">24h Change</p>
                <p className={`mt-2 text-lg font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {coin.price_change_percentage_24h?.toFixed(2)}%
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800/70 bg-slate-900/70 px-5 py-4">
              <p className="text-sm text-slate-400">24h High / Low</p>
              <p className="mt-2 text-base font-semibold text-slate-100">
                {formatCurrency(coin.high_24h, currency)} / {formatCurrency(coin.low_24h, currency)}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                {currency.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CryptoDashboard;