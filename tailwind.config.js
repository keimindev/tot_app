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
        primary: "#952323",
        secondary:{
          DEFAULT: "#F2E8C6",
          // DAD4B5 A73121
        }
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
