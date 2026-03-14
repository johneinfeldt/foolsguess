export default function Home() {
  return (
    <div className="min-h-screen bg-midnight font-sans text-text-primary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-midnight/80 px-6 py-4 backdrop-blur-md">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-electric">Fools</span>Guess
        </span>
        <a
          href="/play/daily"
          className="rounded-full bg-electric px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-electric-bright"
        >
          Play Now
        </a>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center sm:pt-32 sm:pb-28">
        <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-electric/10 blur-[120px]" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="animate-float text-6xl sm:text-8xl">🎯</div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-electric">Fools</span>Guess
          </h1>
          <p className="max-w-md text-lg text-text-muted sm:text-xl">
            Guess what everyone else said. Match the most popular answers
            to score big and climb the leaderboard.
          </p>

          <a
            href="/play/daily"
            className="animate-glow-pulse mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-bright px-8 py-4 text-lg font-bold text-white shadow-lg shadow-electric/25 transition-all hover:scale-105 hover:shadow-electric/40"
          >
            Play Now
            <span className="text-xl">&rarr;</span>
          </a>

          <p className="mt-2 text-sm text-text-dim">
            Free to play. No account needed.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
            How It Works
          </h2>
          <p className="mb-12 text-center text-text-muted">
            Three steps. Infinite fun.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface p-8 text-center transition-colors hover:border-electric/30 hover:bg-surface-light">
              <div className="mb-4 text-4xl">📋</div>
              <div className="mb-2 inline-block rounded-full bg-electric/10 px-3 py-1 text-xs font-semibold text-electric">
                Step 1
              </div>
              <h3 className="mb-2 text-lg font-bold">See the Question</h3>
              <p className="text-sm text-text-muted">
                We surveyed 100 people. A question pops up &mdash; like
                &ldquo;Name something you take to the beach.&rdquo;
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8 text-center transition-colors hover:border-neon-green/30 hover:bg-surface-light">
              <div className="mb-4 text-4xl">💬</div>
              <div className="mb-2 inline-block rounded-full bg-neon-green/10 px-3 py-1 text-xs font-semibold text-neon-green">
                Step 2
              </div>
              <h3 className="mb-2 text-lg font-bold">Type Your Answer</h3>
              <p className="text-sm text-text-muted">
                Think like the crowd. Type what you think the most popular
                answers are before time runs out.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-8 text-center transition-colors hover:border-gold/30 hover:bg-surface-light">
              <div className="mb-4 text-4xl">🏆</div>
              <div className="mb-2 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">
                Step 3
              </div>
              <h3 className="mb-2 text-lg font-bold">Score Points</h3>
              <p className="text-sm text-text-muted">
                Match popular answers to earn points. The higher the
                answer ranks, the more points you get.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Modes */}
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
            Choose Your Mode
          </h2>
          <p className="mb-12 text-center text-text-muted">
            Play your way. Every mode, every day.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-gold/30 hover:bg-surface-light">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
                POPULAR
              </div>
              <div className="mb-4 text-4xl">📅</div>
              <h3 className="mb-2 text-lg font-bold">Daily Challenge</h3>
              <p className="mb-4 text-sm text-text-muted">
                A new puzzle every day at midnight. Everyone plays the same
                questions &mdash; compare your score with the world.
              </p>
              <div className="flex items-center gap-2 text-xs text-gold">
                <span>&#9733;</span>
                <span>Global leaderboard</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-cyan/30 hover:bg-surface-light">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
                REAL-TIME
              </div>
              <div className="mb-4 text-4xl">👥</div>
              <h3 className="mb-2 text-lg font-bold">Multiplayer</h3>
              <p className="mb-4 text-sm text-text-muted">
                Create a room and invite friends. Race to guess the top
                answers before your opponents do.
              </p>
              <div className="flex items-center gap-2 text-xs text-cyan">
                <span>&#9889;</span>
                <span>2-8 players</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-colors hover:border-neon-green/30 hover:bg-surface-light">
              <div className="absolute top-0 right-0 rounded-bl-xl bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green">
                CHILL
              </div>
              <div className="mb-4 text-4xl">🧩</div>
              <h3 className="mb-2 text-lg font-bold">Solo Journey</h3>
              <p className="mb-4 text-sm text-text-muted">
                Progress through themed levels at your own pace. Unlock new
                categories as you go.
              </p>
              <div className="flex items-center gap-2 text-xs text-neon-green">
                <span>&#10003;</span>
                <span>100+ levels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Engagement */}
      <section className="border-y border-border bg-surface px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="text-3xl font-extrabold text-gold">🏅 Monthly Prizes</div>
            <p className="text-sm text-text-muted">
              Top players on the leaderboard win real prizes every month.
            </p>
          </div>
          <div className="h-px w-16 bg-border sm:h-16 sm:w-px" />
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="text-3xl font-extrabold text-electric">🔥 Daily Streaks</div>
            <p className="text-sm text-text-muted">
              Play every day to build your streak and earn bonus multipliers.
            </p>
          </div>
          <div className="h-px w-16 bg-border sm:h-16 sm:w-px" />
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="text-3xl font-extrabold text-neon-green">⚡ Live Now</div>
            <p className="text-sm text-text-muted">
              Jump in &mdash; today&apos;s challenge is waiting for you.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to prove you think like everyone else?
        </h2>
        <p className="max-w-md text-text-muted">
          No sign-up required. Pick a mode and start guessing.
        </p>
        <a
          href="/play/daily"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-bright px-8 py-4 text-lg font-bold text-white shadow-lg shadow-electric/25 transition-all hover:scale-105 hover:shadow-electric/40"
        >
          Start Playing
          <span className="text-xl">&rarr;</span>
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm text-text-dim">
            &copy; 2026 FoolsGuess. All rights reserved.
          </span>
          <div className="flex gap-6 text-sm text-text-dim">
            <a href="#" className="transition-colors hover:text-text-muted">Privacy</a>
            <a href="#" className="transition-colors hover:text-text-muted">Terms</a>
            <a href="#" className="transition-colors hover:text-text-muted">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
