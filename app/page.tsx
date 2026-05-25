import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden px-6 py-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-14 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-cyan-300">Nebula Ledger</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
              Your crypto landing page, redesigned for modern investors.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Explore the dashboard experience on a dedicated page, with live market data powered by CoinGecko and a premium dark UI built for clarity.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
            >
              View Dashboard
            </Link>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-4 text-base font-semibold text-slate-100 transition hover:border-slate-100 hover:bg-slate-900/80"
            >
              See Features
            </a>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2 lg:items-center">
          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/80 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">A modern entry point</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">A separate landing page for onboarding and brand story.</h2>
            <p className="mt-4 text-slate-300">This page is built to welcome visitors, explain capabilities, and guide them directly to the live crypto dashboard without mixing the two experiences.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { label: "Live pricing", value: "CoinGecko API" },
                { label: "Premium visuals", value: "Glassmorphism" },
                { label: "Fast access", value: "Dedicated route" },
                { label: "Mobile ready", value: "Responsive design" },
              ].map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-900/80 px-5 py-5 shadow-sm shadow-slate-950/20">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                  <p className="mt-3 text-xl font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-800/80 bg-slate-950/85 p-10 shadow-2xl shadow-slate-950/30 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Powered by CoinGecko</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Built with actionable market data.</h2>
            <p className="mt-4 text-slate-300">The dashboard uses the CoinGecko `/coins/markets` endpoint to surface instant price, volume, and 24-hour momentum for top assets.</p>

            <div className="mt-8 space-y-4 rounded-3xl border border-slate-800/70 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-sm uppercase tracking-[0.24em]">Endpoint</span>
                <span className="rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">REST</span>
              </div>
              <p className="mt-3 break-all text-sm text-slate-400">https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&amp;per_page=12&amp;order=market_cap_desc&amp;sparkline=false</p>
            </div>
          </div>
        </section>

        <section id="features" className="mt-16 grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Dedicated pages",
              description: "Keep landing and dashboard views separate for a cleaner user journey.",
            },
            {
              title: "API transparency",
              description: "Show users the data source and keep the market feed clearly labeled.",
            },
            {
              title: "Polished dark theme",
              description: "A luxury crypto aesthetic with soft gradients, glass cards, and vivid accent colors.",
            },
          ].map((feature) => (
            <div key={feature.title} className="rounded-[2rem] border border-slate-800/80 bg-slate-950/75 p-8 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-4 text-slate-300">{feature.description}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
