const vibrantColors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF5'];
let currentHour = new Date().getHours();

function getTextColor() {
  if (currentHour >= 1 && currentHour <= 6) {
    // 1 AM to morning: cycle among 5 fixed vibrant colors
    return vibrantColors[currentHour % vibrantColors.length];
  } else {
    // Other hours: rotate colors every hour dynamically
    return vibrantColors[(currentHour + Math.floor(Date.now() / 3600000)) % vibrantColors.length];
  }
}

export { getTextColor };
