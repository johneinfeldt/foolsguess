import JesterMascot from "@/components/JesterMascot";

export default function Home() {
  return (
    <div className="min-h-screen bg-midnight font-sans text-text-primary">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-midnight/80 px-6 py-4 backdrop-blur-md">
        <span className="text-xl font-bold tracking-tight">
          <span className="text-gradient-electric">Fools</span>Guess
        </span>
        <a
          href="#modes"
          className="press-effect rounded-full bg-gradient-to-r from-electric to-electric-bright px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-electric/20 transition-all hover:shadow-electric/40"
        >
          Play Now
        </a>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        {/* Background effects */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-electric/8 blur-[150px]" />
        <div className="pointer-events-none absolute top-20 left-[20%] h-[300px] w-[300px] rounded-full bg-cyan/5 blur-[100px]" />
        <div className="pointer-events-none absolute top-40 right-[15%] h-[250px] w-[250px] rounded-full bg-gold/5 blur-[100px]" />

        <div className="relative z-10 flex flex-col items-center gap-5 text-center">
          {/* Mascot */}
          <div className="animate-float">
            <JesterMascot size={140} mood="excited" />
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-gradient-electric">Fools</span>Guess
          </h1>
          <p className="max-w-lg text-lg text-text-muted sm:text-xl">
            Guess what everyone else said. Match the most popular survey
            answers to score big and climb the leaderboard.
          </p>
          <p className="text-sm text-text-dim">
            Free to play &bull; No account needed
          </p>
        </div>

        {/* Game Mode Cards */}
        <div id="modes" className="relative z-10 mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-3">
          {/* Daily Challenge */}
          <a
            href="/play/daily"
            className="card-glow press-effect group relative rounded-2xl border-2 border-gold/20 bg-surface p-7 transition-all duration-300 hover:border-gold/50 hover:bg-surface-light hover:scale-[1.03] game-shadow"
          >
            <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-gold to-gold-bright px-3 py-1 text-xs font-bold text-midnight">
              POPULAR
            </div>
            <div className="mb-3 text-5xl">&#128197;</div>
            <h3 className="mb-2 text-xl font-extrabold">Daily Challenge</h3>
            <p className="mb-5 text-sm leading-relaxed text-text-muted">
              A new puzzle every day at midnight. Everyone plays the same
              questions &mdash; compare your score with the world.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-gold">
                <span>&#9733;</span>
                <span>Global leaderboard</span>
              </div>
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold opacity-0 transition-all group-hover:opacity-100">
                Play &rarr;
              </span>
            </div>
          </a>

          {/* Solo Journey */}
          <a
            href="/play/solo"
            className="card-glow press-effect group relative rounded-2xl border-2 border-neon-green/20 bg-surface p-7 transition-all duration-300 hover:border-neon-green/50 hover:bg-surface-light hover:scale-[1.03] game-shadow"
          >
            <div className="absolute top-0 right-0 rounded-bl-xl bg-gradient-to-r from-neon-green to-neon-green-bright px-3 py-1 text-xs font-bold text-midnight">
              NEW
            </div>
            <div className="mb-3 text-5xl">&#129513;</div>
            <h3 className="mb-2 text-xl font-extrabold">Solo Journey</h3>
            <p className="mb-5 text-sm leading-relaxed text-text-muted">
              Progress through divisions and levels at your own pace.
              Earn XP, build streaks, and unlock new challenges.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-neon-green">
                <span>&#9889;</span>
                <span>100+ levels</span>
              </div>
              <span className="rounded-full bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green opacity-0 transition-all group-hover:opacity-100">
                Play &rarr;
              </span>
            </div>
          </a>

          {/* Multiplayer */}
          <div className="relative rounded-2xl border-2 border-border bg-surface p-7 opacity-50 game-shadow">
            <div className="absolute top-0 right-0 rounded-bl-xl bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
              COMING SOON
            </div>
            <div className="mb-3 text-5xl">&#128101;</div>
            <h3 className="mb-2 text-xl font-extrabold">Multiplayer</h3>
            <p className="mb-5 text-sm leading-relaxed text-text-muted">
              Create a room and invite friends. Race to guess the top
              answers before your opponents do.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan">
              <span>&#127918;</span>
              <span>2-8 players</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative px-6 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-electric/3 to-transparent" />
        <div className="relative mx-auto max-w-4xl">
          <h2 className="mb-2 text-center text-3xl font-extrabold sm:text-4xl">
            How It <span className="text-gradient-electric">Works</span>
          </h2>
          <p className="mb-14 text-center text-text-muted">
            Three steps. Infinite fun.
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="animate-stagger-in rounded-2xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:border-electric/30 hover:bg-surface-light game-shadow" style={{ animationDelay: "0ms" }}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-electric/10 text-3xl">
                &#128203;
              </div>
              <div className="mb-3 inline-block rounded-full bg-electric/10 px-3 py-1 text-xs font-bold text-electric">
                Step 1
              </div>
              <h3 className="mb-2 text-lg font-bold">See the Question</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                We surveyed 100 people. A question pops up &mdash; like
                &ldquo;Name something you take to the beach.&rdquo;
              </p>
            </div>

            <div className="animate-stagger-in rounded-2xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:border-neon-green/30 hover:bg-surface-light game-shadow" style={{ animationDelay: "100ms" }}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-green/10 text-3xl">
                &#128172;
              </div>
              <div className="mb-3 inline-block rounded-full bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green">
                Step 2
              </div>
              <h3 className="mb-2 text-lg font-bold">Type Your Answer</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Think like the crowd. Type what you think the most popular
                answers are before time runs out.
              </p>
            </div>

            <div className="animate-stagger-in rounded-2xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:border-gold/30 hover:bg-surface-light game-shadow" style={{ animationDelay: "200ms" }}>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-3xl">
                &#127942;
              </div>
              <div className="mb-3 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
                Step 3
              </div>
              <h3 className="mb-2 text-lg font-bold">Score Points</h3>
              <p className="text-sm leading-relaxed text-text-muted">
                Match popular answers to earn points. The higher the
                answer ranks, the more points you get.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof */}
      <section className="border-y border-border bg-surface/50 px-6 py-16 sm:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="text-3xl font-extrabold text-gradient-gold">&#127941; Monthly Prizes</div>
            <p className="text-sm text-text-muted">
              Top players on the leaderboard win real prizes every month.
            </p>
          </div>
          <div className="h-px w-16 bg-border sm:h-16 sm:w-px" />
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="text-3xl font-extrabold text-gradient-fire">&#128293; Daily Streaks</div>
            <p className="text-sm text-text-muted">
              Play every day to build your streak and earn bonus multipliers.
            </p>
          </div>
          <div className="h-px w-16 bg-border sm:h-16 sm:w-px" />
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <div className="text-3xl font-extrabold text-gradient-electric">&#9889; Live Now</div>
            <p className="text-sm text-text-muted">
              Jump in &mdash; today&apos;s challenge is waiting for you.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative flex flex-col items-center gap-8 px-6 py-20 text-center sm:py-28">
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-electric/5 blur-[120px]" />

        <JesterMascot size={80} mood="happy" className="relative z-10" />

        <h2 className="relative z-10 text-3xl font-extrabold sm:text-4xl">
          Ready to prove you think<br />like everyone else?
        </h2>
        <p className="relative z-10 max-w-md text-text-muted">
          No sign-up required. Pick a mode and start guessing.
        </p>
        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <a
            href="/play/daily"
            className="press-effect animate-glow-pulse inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-electric-bright px-8 py-4 text-lg font-bold text-white shadow-lg shadow-electric/25 transition-all hover:scale-105"
          >
            Daily Challenge
            <span className="text-xl">&rarr;</span>
          </a>
          <a
            href="/play/solo"
            className="press-effect inline-flex items-center gap-2 rounded-full border-2 border-neon-green/40 px-8 py-4 text-lg font-bold text-neon-green transition-all hover:scale-105 hover:border-neon-green/70 hover:bg-neon-green/10 hover:shadow-lg hover:shadow-neon-green/20"
          >
            Solo Journey
            <span className="text-xl">&rarr;</span>
          </a>
        </div>
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
