export const normalizeUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return "https://" + url;
};

export const prepareUrlForSave = (platform, url) => {
  if (!platform || !url) return url;

  const p = platform.toLowerCase();

  if (p === "whatsapp" || p === "telegram") {
    return url.trim(); // only number or username
  }

  return normalizeUrl(url.trim());
};

export const buildSocialLink = (link) => {
  const p = link.platform?.toLowerCase();

  if (p === "whatsapp") {
    const msg = link.messagetext ? `?text=${encodeURIComponent(link.messagetext)}` : "";
    return `https://wa.me/${link.url}${msg}`;
  }

  if (p === "telegram") {
    return `https://t.me/${link.url}`;
  }

  return normalizeUrl(link.url);
};

export const formatCredentialUrl = (url, urlType = 'other') => {
  if (!url) return "";

  // 1. Params URL: Keep everything as-is
  if (urlType === 'params') {
    return url;
  }

  try {
    const urlObj = new URL(url);

    // 2. Google Drive: Optimize for viewing
    if (urlType === 'drive') {
      if (urlObj.hostname.includes("drive.google.com")) {
        let fileId = "";
        const pathMatch = urlObj.pathname.match(/\/d\/([^/]+)/);
        if (pathMatch) {
          fileId = pathMatch[1];
        } else {
          fileId = urlObj.searchParams.get("id");
        }
        if (fileId) {
          return `https://drive.google.com/file/d/${fileId}/view`;
        }
      }
      // If not a drive link but type is 'drive', fallback to standard URL
      return url;
    }

    // 3. Other URL: Strip all parameters
    return `${urlObj.origin}${urlObj.pathname}`;
  } catch (e) {
    // Fallback for malformed URLs
    return url.split("?")[0];
  }
};
