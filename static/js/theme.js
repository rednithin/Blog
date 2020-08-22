function setPreferredColorScheme(mode) {
  stylesheet = document.styleSheets[3];
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

setPreferredColorScheme("light");
if (localStorage.getItem("theme") === 'dark') {
  setPreferredColorScheme("dark");
  console.log("🌑 Dark Theme Enabled");
} else {
  console.log("🌙 Light Theme Enabled");
}

function toggleTheme() {
  if (localStorage.getItem("theme") === "dark") {
    setPreferredColorScheme("light");
    localStorage.setItem("theme", "light");
    console.log("🌙 Light Theme Enabled");
  } else {
    setPreferredColorScheme("dark");
    localStorage.setItem("theme", "dark");
    console.log("🌑 Dark Theme Enabled");
  }
}