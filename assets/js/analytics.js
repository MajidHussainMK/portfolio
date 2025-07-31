// Google Analytics Configuration
const GA_MEASUREMENT_ID = "G-XJERSG5WY8";

// Direct initialization (no DOM wait)
if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== "YOUR_GA_MEASUREMENT_ID") {
  // Load Google Analytics script immediately
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag immediately
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    // Enhanced measurement features
    send_page_view: true,
    enhanced_measurement_settings: {
      scrolls: true,
      outbound_clicks: true,
      site_search: false,
      video_engagement: false,
      file_downloads: true,
    },
  });

  console.log("Google Analytics initialized with ID:", GA_MEASUREMENT_ID);
} else {
  console.warn("Google Analytics not initialized. Invalid measurement ID.");
}

// Custom event tracking functions
function trackEvent(eventName, parameters = {}) {
  if (window.gtag) {
    window.gtag("event", eventName, parameters);
  }
}

function trackDownload(fileName) {
  trackEvent("file_download", {
    file_name: fileName,
    file_extension: fileName.split(".").pop(),
  });
}

function trackContactForm() {
  trackEvent("contact_form_submit", {
    event_category: "engagement",
    event_label: "contact_form",
  });
}

function trackProjectView(projectName) {
  trackEvent("project_view", {
    event_category: "engagement",
    event_label: projectName,
  });
}
