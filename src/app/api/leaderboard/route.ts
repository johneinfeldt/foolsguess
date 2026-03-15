import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || new Date().toISOString().slice(0, 10);
  const type = searchParams.get("type") || "daily";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);

  try {
    // Fetch scores
    let scoresQuery = supabase
      .from("daily_scores")
      .select("user_id, score, play_date, mode")
      .eq("mode", "ranked")
      .order("score", { ascending: false })
      .limit(limit);

    if (type === "daily") {
      scoresQuery = scoresQuery.eq("play_date", date);
    }

    const { data: scores, error: scoresError } = await scoresQuery;

    if (scoresError) {
      console.error("Leaderboard scores error:", scoresError);
      return NextResponse.json({ entries: [], error: scoresError.message }, { status: 500 });
    }

    if (!scores || scores.length === 0) {
      return NextResponse.json({ entries: [] });
    }

    // Fetch profiles for these users
    const userIds = [...new Set(scores.map((s) => s.user_id))];
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, display_name, avatar_config")
      .in("id", userIds);

    const profileMap = new Map(
      (profiles || []).map((p) => [p.id, p])
    );

    const entries = scores.map((row, i) => {
      const profile = profileMap.get(row.user_id);
      return {
        rank: i + 1,
        user_id: row.user_id,
        score: row.score,
        display_name: profile?.display_name || "Anonymous",
        avatar_config: profile?.avatar_config || null,
      };
    });

    return NextResponse.json(
      { entries },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" } }
    );
  } catch (err) {
    console.error("Leaderboard error:", err);
    return NextResponse.json({ entries: [] }, { status: 500 });
  }
}
