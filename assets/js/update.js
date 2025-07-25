const CHECK_INTERVAL_SECONDS = 30; 
let currentVersion = null; 

// ui elements
const updToast = document.querySelector('.updToast');
const updToastSpan = document.getElementById('updToastSpan');

async function checkForUpdates() {
  try {
    const response = await fetch(
      'https://api.github.com/repos/useclassplay/useclassplay/releases/latest',
      { cache: 'no-store' }
    );
    const { tag_name: latestVersion } = await response.json();

    if (currentVersion === null) {
      currentVersion = latestVersion;
      console.log(`Initial version loaded: ${currentVersion}`);
      return;
    }

    console.log(`Current: ${currentVersion} | Latest: ${latestVersion}`);
    if (latestVersion > currentVersion) {
      console.log(`New version detected: ${latestVersion}`);
      updateSite(latestVersion);
    }
  } catch (error) {
    console.error('Version check failed:', error);
  }
}

function updateSite(newVersion) {
  document.querySelector('.updToast').style.right = '1%';
  document.getElementById('updToastSpan') = newVersion;
}

function hideToast() {
  document.getElementById('updToast').style.right = '-40%';
}

checkForUpdates();

setInterval(checkForUpdates, CHECK_INTERVAL_SECONDS * 1000);