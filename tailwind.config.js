/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFFFFF",
        mainColor:  "#647ce6",
        text: {
          default: "#ffffff",
          highlight: "#aab0e6",
      },
      button:{
        dafault: "#FF7666"
      },
    },
      fontFamily: {
        Rthin: ["RobotoSlab", "sans-serif"],
        Rextralight: ["RobotoSlab-ExtraLight", "sans-serif"],
        Rlight: ["RobotoSlab-Light", "sans-serif"],
        Rregular: ["RobotoSlab-Regular", "sans-serif"],
        Rmedium: ["RobotoSlab-Medium", "sans-serif"],
        Rsemibold: ["RobotoSlab-SemiBold", "sans-serif"],
        Rbold: ["RobotoSlab-Bold", "sans-serif"],
        Rextrabold: ["RobotoSlab-ExtraBold", "sans-serif"],
        Rblack: ["RobotoSlab-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
