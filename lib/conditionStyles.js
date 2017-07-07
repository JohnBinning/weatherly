import WeatherBackgrounds from './WeatherBackgrounds';
const conditionStyles = (conditions) => {
  const keys = Object.keys(WeatherBackgrounds);

  for (let i = 0; i < keys.length; i++) {
    if (conditions.icon.includes(keys[i])) {
      document.body.style.backgroundImage = WeatherBackgrounds[keys[i]];
      break;
    } else {
      document.body.style.backgroundImage = WeatherBackgrounds.default;
    }
  }
};

export default conditionStyles;
