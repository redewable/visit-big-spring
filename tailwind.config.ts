import type { Config } from "tailwindcss";

/**
 * West Texas palette — drawn from Big Spring's mesa sunsets, caprock terracotta,
 * big sky blues and sun-bleached limestone. Chosen to read "authentic,
 * welcoming, West Texas" per the RFP's brand context.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Deep sky of a West Texas dusk
        sky: {
          50: "#eef6fb",
          100: "#d6e8f2",
          300: "#7fb1ce",
          500: "#2f6d92",
          700: "#1b4562",
          900: "#0e2738",
        },
        // Caprock terracotta / mesa red
        mesa: {
          50: "#fbf1ec",
          100: "#f4ddd1",
          300: "#dd9f84",
          500: "#b85c3a",
          700: "#8a3e23",
          900: "#4f2313",
        },
        // Prairie sand
        sand: {
          50: "#fbf8f2",
          100: "#f4ecdb",
          300: "#dcc694",
          500: "#b79b5d",
          700: "#846b36",
          900: "#4a3a1b",
        },
        // Limestone / overlook stone
        stone2: {
          50: "#f6f5f2",
          100: "#e6e3db",
          300: "#b5ae9e",
          500: "#7b7566",
          700: "#4a463d",
          900: "#211f1b",
        },
        // Sage from park brush
        sage: {
          500: "#6a8363",
          700: "#455742",
        },
        // Corten — the weathered steel used in the Historic Spring story
        // boards. A real material from the actual CVB restoration.
        corten: {
          400: "#c06a3c",
          500: "#a8582e",
          600: "#8c4622",
          700: "#6a3318",
          900: "#3a1a0a",
        },
        // Limestone — the block backing behind each corten storyboard.
        limestone: {
          50: "#f7f2e8",
          100: "#ebe2cf",
          300: "#c9b889",
          500: "#9a8557",
          700: "#5f5134",
        },
      },
      backgroundImage: {
        // Soft paper grain — halftone dots layered on warm sand
        grain: `radial-gradient(rgba(120,90,50,0.06) 1px, transparent 1px),
                radial-gradient(rgba(120,90,50,0.04) 1px, transparent 1px)`,
      },
      backgroundSize: {
        grain: "3px 3px, 7px 7px",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1200px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(17,24,39,0.04), 0 8px 24px rgba(17,24,39,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
