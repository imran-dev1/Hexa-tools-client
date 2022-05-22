module.exports = {
   content: ["./src/**/*.{html,js}"],
   theme: {
      extend: {},
   },
   daisyui: {
      themes: [
         {
            winter: {
               ...require("daisyui/src/colors/themes")["[data-theme=winter]"],
               "base-content": "black",
            },
         },
      ],
   },
   plugins: [require("daisyui")],
};
