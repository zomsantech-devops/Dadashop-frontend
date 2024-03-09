/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
    },
    screens: {
      'xl': {'max': '1280px'},
      'screen_1250': {'max': '1250px'},
      'screen_1170': {'max': '1170px'},
      'homePageCatagories_1150px': {'max': '1150px'},
      'screen_1070': {'max': '1070px'},
      'lg': {'max': '1025px'},
      'screen_960': {'max': '960px'},
      'screen_930': {'max': '930px'},
      'homePageBGArea_920px': {'max': '920px'},
      'screen_910': {'max': '910px'},
      'screen_810': {'max': '810px'},
      'md': {'max': '770px'},
      'sm': {'max': '640px'},
      'screen_610': {'max': '610px'},
      'screen_605': {'max': '605px'},
      'screen_540': {'max': '540px'},
      'screen_500': {'max': '500px'},
      'bf_xs': {'max': '490px'},
      'screen_445': {'max': '445px'},
      'screen_443': {'max': '443px'},
      'screen_420': {'max': '420px'},
      'screen_400': {'max': '400px'},
      'screen_375': {'max': '375px'},
      'xs': {'max': '390px'},  
      'homePageCatagories_390px': {'max': '390px'},
      'mini': {'max': '350px'},  
    },
  },
  plugins: [],
}

