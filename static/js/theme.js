function setPreferredColorScheme(mode) {
  stylesheet = Object.values(document.styleSheets).find(x => x.href.indexOf('styles.css') >= 0);
  for (var i = stylesheet.rules.length-1; i >= 0; i--) {
    rule = stylesheet.rules[i].media;
    if (rule && rule.mediaText && rule.mediaText.includes("prefers-color-scheme")) {    
      switch (mode) {
      case "light":
        rule.appendMedium("original-prefers-color-scheme");
        if (rule.mediaText.includes("light")) rule.deleteMedium("(prefers-color-scheme: light)");
        if (rule.mediaText.includes("dark")) rule.deleteMedium("(prefers-color-scheme: dark)");
        break;
      case "dark":
        rule.appendMedium("(prefers-color-scheme: light)");
        rule.appendMedium("(prefers-color-scheme: dark)");
        if (rule.mediaText.includes("original")) rule.deleteMedium("original-prefers-color-scheme");
        break;
      default: 
        rule.appendMedium("(prefers-color-scheme: dark)");
        if (rule.mediaText.includes("light")) rule.deleteMedium("(prefers-color-scheme: light)");
        if (rule.mediaText.includes("original")) rule.deleteMedium("original-prefers-color-scheme");        
      }
      // break;
    }
  }
}


function setDarkTheme() {
  setPreferredColorScheme("dark");
  localStorage.setItem("theme", "dark");
  console.log("🌑 Dark Theme Enabled");
}

function setLightTheme() {
  setPreferredColorScheme("light");
  localStorage.setItem("theme", "light");
  console.log("🌙 Light Theme Enabled");
}

var theme = localStorage.getItem("theme");

if (!theme || theme == 'dark') {
  setDarkTheme();
} else {
  setLightTheme();
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "dark") {
    setLightTheme();
  } else {
    setDarkTheme();
  }
}