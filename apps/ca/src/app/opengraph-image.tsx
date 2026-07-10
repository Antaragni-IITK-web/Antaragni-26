import { ImageResponse } from "next/og";

// IMPORTANT: never use runtime = "edge" in this repo — it corrupts the
// Turbopack dev build. Node runtime renders these fine.

export const alt = "Antaragni '26 — Campus Ambassador Program, IIT Kanpur";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#060505",
          padding: "72px 84px",
          position: "relative",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        {/* key light */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "25%",
            width: "50%",
            height: "90%",
            background:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(255,236,200,0.16) 0%, rgba(255,236,200,0.03) 55%, transparent 75%)",
            display: "flex",
          }}
        />
        {/* crimson floor glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "10%",
            width: "80%",
            height: "60%",
            background:
              "radial-gradient(ellipse 50% 50% at 50% 100%, rgba(217,35,35,0.22) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* header row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 2, background: "#d4a24e", display: "flex" }} />
          <div
            style={{
              color: "#d4a24e",
              fontSize: 24,
              letterSpacing: 8,
              textTransform: "uppercase",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
            }}
          >
            IIT Kanpur · Since 1965
          </div>
        </div>

        {/* center */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div
            style={{
              color: "#f4efe6",
              fontSize: 148,
              letterSpacing: 2,
              lineHeight: 1,
              display: "flex",
            }}
          >
            ANTARAGNI
          </div>
          <div
            style={{
              color: "#d92323",
              fontSize: 40,
              letterSpacing: 14,
              textTransform: "uppercase",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: 700,
              display: "flex",
            }}
          >
            Campus Ambassador &apos;26
          </div>
        </div>

        {/* footer row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          <div style={{ color: "#9a938a", fontSize: 22, letterSpacing: 5, textTransform: "uppercase" }}>
            The stage is bigger than you imagine
          </div>
          <div style={{ display: "flex", gap: 40 }}>
            {["60 YEARS", "150K+ CROWD", "400+ COLLEGES"].map((s) => (
              <div key={s} style={{ color: "#d4a24e", fontSize: 22, letterSpacing: 3, fontWeight: 700 }}>
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
