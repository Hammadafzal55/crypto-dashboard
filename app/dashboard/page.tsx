"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import CryptoDashboard from '../components/cryptodashboard';

const currencyOptions = ['usd', 'eur', 'gbp', 'jpy', 'aud', 'cad', 'inr', 'brl'];

const currencyLabels: Record<string, string> = {
  usd: 'US Dollar',
  eur: 'Euro',
  gbp: 'British Pound',
  jpy: 'Japanese Yen',
  aud: 'Australian Dollar',
  cad: 'Canadian Dollar',
  inr: 'Indian Rupee',
  brl: 'Brazilian Real',
};

export default function DashboardPage() {
  const [currency, setCurrency] = useState('usd');
  const currentCurrencyLabel = useMemo(() => currencyLabels[currency] ?? currency.toUpperCase(), [currency]);

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 px-6 py-16 sm:px-8 lg:px-10 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Live Market Data</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              The dedicated dashboard for real-time crypto pricing.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              All market data is sourced directly from CoinGecko. Explore every top coin with a beautiful interface and currency control.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-slate-800"
            >
              Back to landing
            </Link>
            <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300">
              API: CoinGecko
            </span>
          </div>
        </header>

        <section className="mb-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { title: 'Endpoint', value: '/coins/markets' },
            { title: 'Currency', value: currentCurrencyLabel },
            { title: 'Records', value: 'Top 24 coins' },
            { title: 'Refresh', value: 'Auto load on selection' },
          ].map((item) => (
            <div key={item.title} className="rounded-4xl border border-slate-800/80 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.title}</p>
              <p className="mt-4 text-2xl font-semibold text-white">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mb-10 rounded-4xl border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Currency Selector</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Switch your fiat view instantly.</h2>
            </div>
            <p className="text-sm text-slate-400">Pick any major currency and the dashboard refreshes automatically.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {currencyOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${currency === option ? 'bg-cyan-500 text-slate-950' : 'border border-slate-800 bg-slate-900/80 text-slate-300 hover:bg-slate-900'}`}
                onClick={() => setCurrency(option)}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-4xl border border-slate-800/80 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Dashboard View</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">CoinGecko API visualization</h2>
            </div>
            <div className="rounded-full bg-slate-900/80 px-4 py-2 text-sm text-slate-300">Live pricing panel</div>
          </div>

          <CryptoDashboard currency={currency} perPage={24} />
        </section>
      </div>
    </main>
  );
}
