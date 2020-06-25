module.exports = {
  plugins: {
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {
      whitelist: ['app'],
    },
    autoprefixer: {},
  },
};
