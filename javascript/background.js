function dispatch(site, url, tabId) {
  // トップページ・ユーザーページは除外
  if (/^(http|https):\/\/[^/]+\/[^/]+\/./.test(url)) {
    chrome.tabs.update(tabId, {
      // TODO "#" + urlのurlはそのままで大丈夫か
      url: chrome.extension.getURL("/slide.html") + "#" + url
    }, function () {
      if (chrome.runtime.lastError) {
        console.log(chrome.runtime.lastError.message);
      }
    });
  }
}

chrome.webRequest.onBeforeRequest.addListener(
        function(request) {
            if (request.type === "main_frame") dispatch("speakerdeck", request.url, request.tabId); 
        },
        {urls: ["*://speakerdeck.com/*"]});

chrome.webRequest.onBeforeRequest.addListener(
        function(request) {
            if (request.type === "main_frame") dispatch("slideshare", request.url, request.tabId); 
        },
        {urls: ["*://www.slideshare.net/*"]});

