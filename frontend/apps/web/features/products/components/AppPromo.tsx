export function AppPromo() {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col items-center gap-8 px-8 py-12 text-center sm:px-12 lg:flex-row lg:text-left">
        {/* Phone mockup */}
        <div className="flex h-48 w-32 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-b from-orange-500 to-amber-500 shadow-xl lg:h-56 lg:w-36">
          <div className="text-center text-white">
            <div className="text-5xl">📱</div>
            <p className="mt-2 text-xs font-bold">Zavora</p>
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Shop Anywhere With Zavora
          </h2>
          <p className="mt-3 max-w-md text-slate-500">
            Take Zavora with you and shop from anywhere. Get exclusive app-only deals and real-time order tracking.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-900 px-5 py-3 text-white hover:bg-slate-800 transition-colors"
            >
              <span className="text-2xl">▶</span>
              <div className="text-left">
                <p className="text-[10px] text-slate-400">Get it on</p>
                <p className="text-sm font-bold">Google Play</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-900 px-5 py-3 text-white hover:bg-slate-800 transition-colors"
            >
              <span className="text-2xl"></span>
              <div className="text-left">
                <p className="text-[10px] text-slate-400">Download on the</p>
                <p className="text-sm font-bold">App Store</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
