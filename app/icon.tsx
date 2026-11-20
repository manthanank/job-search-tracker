import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: "linear-gradient(135deg, #f59e0b, #ef4444)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: 8,
          fontWeight: 800,
          fontFamily: "system-ui, sans-serif",
          boxShadow: "0 2px 8px rgba(245, 158, 11, 0.4)",
        }}
      >
        HF
      </div>
    ),
    {
      ...size,
    }
  );
}
