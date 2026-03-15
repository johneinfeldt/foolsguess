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
    if (type === "alltime") {
      // All-time: sum of all ranked scores per user
      const { data, error } = await supabase.rpc("get_alltime_leaderboard", {
        row_limit: limit,
      });

      if (error) {
        // Fallback if RPC doesn't exist yet
        const { data: fallback } = await supabase
          .from("daily_scores")
          .select("user_id, score, profiles(display_name, avatar_config)")
          .eq("mode", "ranked")
          .order("score", { ascending: false })
          .limit(limit);

        return NextResponse.json({ entries: fallback || [] });
      }

      return NextResponse.json({ entries: data || [] });
    }

    // Daily leaderboard
    const { data, error } = await supabase
      .from("daily_scores")
      .select("user_id, score, profiles(display_name, avatar_config)")
      .eq("play_date", date)
      .eq("mode", "ranked")
      .order("score", { ascending: false })
      .limit(limit);

    if (error) {
      return NextResponse.json({ entries: [], error: error.message }, { status: 500 });
    }

    const entries = (data || []).map((row, i) => {
      const profile = row.profiles as unknown as { display_name: string; avatar_config: unknown } | null;
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
  } catch {
    return NextResponse.json({ entries: [] }, { status: 500 });
  }
}
