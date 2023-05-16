/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/App.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/common_components/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    fontFamily:{
      'raleway-regular':['Raleway-Regular'],
      'raleway-medium':['Raleway-Medium'],
      'raleway-semi-bold':['Raleway-SemiBold'],
      'raleway-bold':['Raleway-Bold'],
      "merriweather-regular":['Merriweather-Regular'],
      "merriweather-bold":['Merriweather-Bold'],
      "merriweather-light":['Merriweather-Light'],
      "merriweather-thin":['Merriweather-Thin'],
      "merriweather-medium":['Merriweather-Medium'],
      "merriweather-semibold":['Merriweather-Semibold'],
    },
    colors: {
      'primary-green': '#689C36',
      'secondary-black': '#191A19',
      'text-gray': '#ACADAC',
      'btn-white': '#F2F5F0',
      'input-bg': '#F3F6F2',
      'error': '#DF2E2E',
      'light-mode':"#FFFFFF",
      'dark-mode': '#191A19',
    },
    // width: {
    //   '15%': '15%',
    //   '90%': '90%',
    // },
    extend: {},
  },
  plugins: [],
};
