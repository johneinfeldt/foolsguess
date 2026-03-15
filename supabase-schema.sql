-- ============================================================
-- FoolsGuess Database Schema
-- Run this in the Supabase SQL Editor (supabase.com > SQL Editor)
-- ============================================================

-- TABLE 1: profiles
CREATE TABLE public.profiles (
  id                    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name          TEXT NOT NULL DEFAULT '',
  avatar_config         JSONB DEFAULT '{"headShape":"short","color":"light","accessory":"none"}'::jsonb,
  newsletter_subscribed BOOLEAN DEFAULT FALSE,
  created_at            TIMESTAMPTZ DEFAULT now(),
  updated_at            TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- TABLE 2: journey_progress
CREATE TABLE public.journey_progress (
  user_id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_division   INT NOT NULL DEFAULT 1,
  question_progress  JSONB NOT NULL DEFAULT '{}'::jsonb,
  energy_current     INT NOT NULL DEFAULT 5,
  energy_last_refill DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at         TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.journey_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own journey" ON public.journey_progress FOR ALL USING (auth.uid() = user_id);

-- TABLE 3: daily_scores
CREATE TABLE public.daily_scores (
  id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id          UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  play_date        DATE NOT NULL,
  mode             TEXT NOT NULL CHECK (mode IN ('relaxed', 'ranked')),
  score            INT NOT NULL,
  question_results JSONB NOT NULL,
  created_at       TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, play_date)
);

ALTER TABLE public.daily_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read daily scores" ON public.daily_scores FOR SELECT USING (true);
CREATE POLICY "Users manage own daily scores" ON public.daily_scores FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own daily scores" ON public.daily_scores FOR UPDATE USING (auth.uid() = user_id);

CREATE INDEX idx_daily_scores_leaderboard ON public.daily_scores (play_date, mode, score DESC);

-- TABLE 4: streaks
CREATE TABLE public.streaks (
  user_id        UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT NOT NULL DEFAULT 0,
  longest_streak INT NOT NULL DEFAULT 0,
  last_play_date DATE,
  updated_at     TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own streaks" ON public.streaks FOR ALL USING (auth.uid() = user_id);

-- TRIGGER: auto-create profile + journey + streaks on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', ''));

  INSERT INTO public.journey_progress (user_id)
  VALUES (NEW.id);

  INSERT INTO public.streaks (user_id)
  VALUES (NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
