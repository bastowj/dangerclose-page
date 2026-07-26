import { ImageResponse } from "next/og";

import { SITE_CONFIG } from "@/constants/config";

export const alt = SITE_CONFIG.defaultTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// sRGB equivalents of the --background / --foreground / --primary tokens in
// globals.css. Satori cannot resolve oklch() or CSS custom properties.
const BACKGROUND = "#0b0b0b";
const FOREGROUND = "#f2f2f2";
const MUTED = "#a6a6a6";
const PRIMARY = "#116e97";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: BACKGROUND,
        padding: "80px",
      }}
    >
      <div
        style={{
          width: "120px",
          height: "10px",
          background: PRIMARY,
          marginBottom: "48px",
        }}
      />
      <div
        style={{
          fontSize: "84px",
          fontWeight: 700,
          color: FOREGROUND,
          lineHeight: 1.1,
        }}
      >
        {SITE_CONFIG.defaultTitle}
      </div>
      <div style={{ fontSize: "36px", color: MUTED, marginTop: "24px" }}>
        {SITE_CONFIG.description}
      </div>
    </div>,
    size,
  );
}
