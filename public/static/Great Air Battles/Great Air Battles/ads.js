var firstShowAd = true
if (firstShowAd) {
  console.log("Display Ad on start")
  displayAd()
} else {
  console.log("Do not display Ad on start")
}
var gameStartTime
var timeDiffInSeconds = () => {
  let currentTime = new Date().getTime()
  return (currentTime - gameStartTime) / 1000
}
function removeOldAdContainer() {
  $("#adsContainer *").css("display", "none")
}
let gameStatus = 0
function pauseGame() {
  console.log("game paused!")
  gameStatus += 1
}
function checkGameStatus() {
  return gameStatus
}
function resetGameStatus() {
  console.log("game status reset!")
  gameStatus = 0
}
function displayAd() {
  if (gameStartTime !== undefined) {
    let timeInSeconds = timeDiffInSeconds()
    if (timeInSeconds < 30) {
      console.log(
        `Call is not first time. This call is made after ${timeInSeconds} seconds.`
      )
      removeOldAdContainer()
      resetAds()
      resetGameStatus()
      return false
    } else {
      console.log(`Call is made after ${timeInSeconds} seconds.`)
    }
  }
  console.log("Ad started!")
  window.reloadAds = true
  var adsContainer
  var adsPreventContainer
  var adsDisplayContainer
  var adsLoader
  var adsManager
  var game = document.getElementById("contentElement")
  var vastMediaWidth = -1
  var vastMediaHeight = -1
  var originW = 0
  var originH = 0
  var productKey = 8599625731
  var AdsSize = { x: 360, y: 640 }
  var _getWindowSize = function () {
    var size = {}
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight
    size.width = x
    size.height = y
    return size
  }
  var defaultConfig = {
    adsEnableBG: true,
    adsBGFadeDuration: 1,
    adsPreventClick: true,
    adsPreventClickDuration: 2,
    removeTextAds: 2,
    maxShowAdsPerRequest: 1,
    maxErrorWaitTime: 20,
  }
  var myConfig = defaultConfig
  var adsShowCount = 0
  var MAX_SHOW_ADS_PER_REQUEST = myConfig.maxShowAdsPerRequest
  var AdsState = { NONE: 0, LOADING: 1, LOADED: 2, STARTED: 3, COMPLETE: 4 }
  var MAX_ERROR_WAIT_TIME = myConfig.maxErrorWaitTime
  var errorWaitTime = MAX_ERROR_WAIT_TIME
  var errorWaitTime_adsManager = 2
  var errorTimer
  var totalRequest = 0
  var totalClick = 0
  var timeClick = -1
  var isCliked = false
  var enablePreventClick = myConfig.adsPreventClick
  var preventAdsClickTime = myConfig.adsPreventClickDuration * 1000
  var adsCurrentState = AdsState.NONE
  var adsConsoleLog = true
  var removeTextAds = myConfig.removeTextAds
  var _defaultAdUrl =
    "https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-9733910408335876&description_url=http%3A%2F%2Fwww.atmegame.com&channel=1920413147&hl=en&max_ad_duration=30000"
  var _loadedAdUrl = null
  var _adsLog = function (message) {
    if (adsConsoleLog) {
      console.log(message)
    }
  }
  var _setAdsState = function (state) {
    if (state === AdsState.COMPLETE) {
      gameStartTime = new Date().getTime()
    }
    var oldState = adsCurrentState
    adsCurrentState = state
    window.dispatchEvent(
      new CustomEvent("gl_ads_state_change", {
        detail: { oldState: oldState, newState: adsCurrentState },
      })
    )
  }
  var setFullScreenAdsContainer = function () {
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight
    adsContainer = document.getElementById("adsContainer")
    adsContainer.style.position = "absolute"
    adsContainer.style.top = "0px"
    adsContainer.style.left = "0px"
    adsContainer.style.width = "100%"
    adsContainer.style.height = "100%"
    adsContainer.style.border = 1 + "px"
    adsContainer.style.backgroundColor = "black"
    adsContainer.style.zIndex = "9999"
    adsContainer.style.display = "none"
    adsPreventContainer = document.createElement("div")
    adsPreventContainer.id = "adsPreventClick"
    adsPreventContainer.style.margin = "0px"
    adsPreventContainer.style.padding = "0px"
    adsPreventContainer.style.opacity = 0
    adsPreventContainer.style.position = "absolute"
    adsPreventContainer.style.top = "0px"
    adsPreventContainer.style.left = "0px"
    adsPreventContainer.style.width = "100%"
    adsPreventContainer.style.height = "100%"
    adsPreventContainer.style.border = 1 + "px"
    adsPreventContainer.style.display = "none"
    document.body.appendChild(adsPreventContainer)
  }
  var createAdDisplayContainer = function () {
    if (adsDisplayContainer == null) {
      adsDisplayContainer = new google.ima.AdDisplayContainer(adsContainer)
      adsDisplayContainer.initialize()
    }
  }
  var fadingInterval
  var enableFadingBG = myConfig.adsEnableBG
  var fadingDuration = myConfig.adsBGFadeDuration
  function fadingAds() {
    adsContainer.style.backgroundColor = "black"
    adsContainer.style.background =
      "url(https://games.atmegame.com/loader.svg) 50% 10% no-repeat black"
    adsContainer.style.backgroundPosition = "center center"
    adsContainer.style.opacity = 0
    fadingInterval = setInterval(function () {
      adsContainer.style.opacity =
        parseFloat(adsContainer.style.opacity) + 1 / (2 * fadingDuration)
      if (adsContainer.style.opacity >= 1) {
        clearInterval(fadingInterval)
      }
    }, 50)
  }
  function resetAds() {
    if (adsManager) {
      try {
        adsManager.destroy()
      } catch (e) {}
    }
    adsManager = null
    if (adsLoader) {
      try {
        adsLoader.destroy()
      } catch (e) {}
    }
    adsLoader = null
  }
  var playAds = function () {
    if (adsContainer.style.display == "inline") {
      _adsLog("playAds. adsContainer = inline, return: ")
      return
    }
    totalRequest += 1
    clearInterval(errorTimer)
    errorWaitTime = MAX_ERROR_WAIT_TIME
    errorWaitTime_adsManager = 2
    isCliked = false
    _setAdsState(AdsState.LOADING)
    adsContainer.style.display = "inline"
    if (enablePreventClick) {
      adsPreventContainer.style.display = "inline"
    }
    if (enableFadingBG) {
      fadingAds()
    }
    errorTimer = setInterval(
      adsManager == null
        ? function () {
            errorWaitTime -= 1
            if (errorWaitTime < 0) {
              adsContainer.style.display = "none"
              adsPreventContainer.style.display = "none"
              _setAdsState(AdsState.COMPLETE)
              clearInterval(errorTimer)
              errorWaitTime = MAX_ERROR_WAIT_TIME
              if (!isCliked) resetAds()
            }
          }
        : function () {
            errorWaitTime -= 1
            errorWaitTime_adsManager -= 1
            if (errorWaitTime < 0) {
              adsContainer.style.display = "none"
              adsPreventContainer.style.display = "none"
              _setAdsState(AdsState.COMPLETE)
              clearInterval(errorTimer)
              errorWaitTime = MAX_ERROR_WAIT_TIME
              if (!isCliked) resetAds()
              return
            }
            if (errorWaitTime_adsManager < 0) {
              var remainingTime = 15
              try {
                remainingTime = adsManager.getRemainingTime()
              } catch (e) {
                remainingTime = -1
              }
              if (remainingTime < 0) {
                adsContainer.style.display = "none"
                adsPreventContainer.style.display = "none"
                _setAdsState(AdsState.COMPLETE)
                clearInterval(errorTimer)
                errorWaitTime_adsManager = 2
                if (!isCliked) resetAds()
                return
              } else {
                errorWaitTime_adsManager = 100
              }
            }
          },
      1000
    )
    if (adsManager != null) {
      try {
        adsManager.start()
      } catch (e) {
        _setAdsState(AdsState.COMPLETE)
        adsContainer.style.display = "none"
        adsPreventContainer.style.display = "none"
        clearInterval(errorTimer)
        resetAds()
      }
    } else {
      try {
        vastMediaWidth = -1
        vastMediaHeight = -1
        createAdDisplayContainer()
        adsLoader = new google.ima.AdsLoader(adsDisplayContainer)
        adsLoader.addEventListener(
          google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          onAdsManagerLoaded,
          false
        )
        adsLoader.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          onAdLoaderError,
          false
        )
        requestAds()
      } catch (e) {
        _setAdsState(AdsState.COMPLETE)
        adsContainer.style.display = "none"
        adsPreventContainer.style.display = "none"
        clearInterval(errorTimer)
        resetAds()
      }
    }
  }
  var requestAds = function () {
    var adsRequest = new google.ima.AdsRequest()
    adsRequest.adTagUrl = _defaultAdUrl
    if (removeTextAds === 1) {
      adsRequest.adTagUrl = adsRequest.adTagUrl.replace("image_text", "image")
    }
    _adsLog("requestAds. adTagUrl: " + adsRequest.adTagUrl)
    var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName("body")[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight || e.clientHeight || g.clientHeight
    originW = x
    originH = y
    AdsSize.x = x < 320 ? 320 : x
    AdsSize.y = y < 320 ? 320 : y
    adsRequest.linearAdSlotWidth = AdsSize.x
    adsRequest.linearAdSlotHeight = AdsSize.y
    adsRequest.nonLinearAdSlotWidth = AdsSize.x
    adsRequest.nonLinearAdSlotHeight = AdsSize.y
    adsRequest.forceNonLinearFullSlot = true
    adsLoader.requestAds(adsRequest)
  }
  var onAdsManagerLoaded = function (adsManagerLoadedEvent) {
    adsManager = adsManagerLoadedEvent.getAdsManager(adsDisplayContainer)
    adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdManagerError
    )
    var events = [
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      google.ima.AdEvent.Type.COMPLETE,
      google.ima.AdEvent.Type.LOADED,
      google.ima.AdEvent.Type.STARTED,
      google.ima.AdEvent.Type.USER_CLOSE,
      google.ima.AdEvent.Type.CLICK,
    ]
    for (var index in events) {
      adsManager.addEventListener(events[index], onAdEvent, false)
    }
    try {
      _adsLog("playAds (w,h): " + AdsSize.x + ", " + AdsSize.y)
      adsManager.init(
        removeTextAds === 2 ? (AdsSize.x < 640 ? 640 : AdsSize.x) : AdsSize.x,
        AdsSize.y,
        google.ima.ViewMode.FULLSCREEN
      )
      timeClick = Date.now()
      adsManager.start()
    } catch (adError) {
      adsContainer.style.display = "none"
      adsPreventContainer.style.display = "none"
      _adsLog("playAds adError: " + adError)
      clearInterval(errorTimer)
      _setAdsState(AdsState.COMPLETE)
      resetAds()
    }
  }
  var onAdEvent = function (adEvent) {
    var ad = adEvent.getAd()
    _adsLog("Eventtype" + adEvent.type)
    switch (adEvent.type) {
      case google.ima.AdEvent.Type.LOADED:
        vastMediaWidth = ad.getVastMediaWidth()
        vastMediaHeight = ad.getVastMediaHeight()
        _adsLog("onAdEvent LOADED")
        _adsLog("ad.isLinear(): " + ad.isLinear())
        _setAdsState(AdsState.LOADED)
        errorWaitTime = MAX_ERROR_WAIT_TIME
        break
      case google.ima.AdEvent.Type.STARTED:
        if (removeTextAds === 2) {
          adsContainer.childNodes[0].style.width = AdsSize.x + "px"
          var len = adsContainer.childNodes[0].childNodes.length
          for (var i = 0; i < len; i++) {
            adsContainer.childNodes[0].childNodes[i].style.width =
              AdsSize.x + "px"
          }
        }
        _adsLog("onAdEvent STARTED")
        errorWaitTime = MAX_ERROR_WAIT_TIME
        _setAdsState(AdsState.STARTED)
        setTimeout(function () {
          adsPreventContainer.style.display = "none"
        }, preventAdsClickTime)
        break
      case google.ima.AdEvent.Type.COMPLETE:
        removeOldAdContainer()
      case google.ima.AdEvent.Type.USER_CLOSE:
        removeOldAdContainer()
        _adsLog("onAdEvent COMPLETE/USER_CLOSE")
        gameStartTime = new Date().getTime()
        _setAdsState(AdsState.COMPLETE)
        adsContainer.style.display = "none"
        adsPreventContainer.style.display = "none"
        clearInterval(errorTimer)
        if (vastMediaWidth <= 0) {
          adsShowCount = MAX_SHOW_ADS_PER_REQUEST
        }
        adsShowCount++
        if (adsShowCount >= MAX_SHOW_ADS_PER_REQUEST) {
          adsShowCount = 0
          resetAds()
        }
        break
      case google.ima.AdEvent.Type.CLICK:
        clearInterval(errorTimer)
        isCliked = true
        totalClick += 1
        timeClick = Math.round((Date.now() - timeClick) / 1000)
        break
      default:
        removeOldAdContainer()
        _adsLog("onAdEvent Autoclose")
        _setAdsState(AdsState.COMPLETE)
        adsContainer.style.display = "none"
        adsPreventContainer.style.display = "none"
        clearInterval(errorTimer)
        if (vastMediaWidth <= 0) {
          adsShowCount = MAX_SHOW_ADS_PER_REQUEST
        }
        adsShowCount++
        if (adsShowCount >= MAX_SHOW_ADS_PER_REQUEST) {
          adsShowCount = 0
          resetAds()
        }
    }
  }
  var onAdManagerError = function (adErrorEvent) {
    adsContainer.style.display = "none"
    adsPreventContainer.style.display = "none"
    clearInterval(errorTimer)
    _setAdsState(AdsState.COMPLETE)
    _adsLog("onAdManagerError " + adErrorEvent.getError())
    resetAds()
    removeOldAdContainer()
    _adsLog("onAdEvent ErrorAdmanagerclose")
  }
  var onAdLoaderError = function (adErrorEvent) {
    adsContainer.style.display = "none"
    adsPreventContainer.style.display = "none"
    _setAdsState(AdsState.COMPLETE)
    clearInterval(errorTimer)
    _adsLog("onAdLoaderError " + adErrorEvent.getError())
    resetAds()
    removeOldAdContainer()
    _adsLog("onAdEvent Errorclose")
  }
  var _initialize = function () {
    setFullScreenAdsContainer()
    window.addEventListener("resize", function () {
      if (adsManager) {
        var size = _getWindowSize()
        var o1 = size.width < size.height ? 0 : 1
        var o2 = AdsSize.x < AdsSize.y ? 0 : 1
        if (o1 != o2) {
          adsManager.resize(
            removeTextAds === 2
              ? size.width < 640
                ? 640
                : size.width
              : size.width,
            size.height,
            google.ima.ViewMode.FULLSCREEN
          )
          AdsSize.x = size.width
          AdsSize.y = size.height
          if (removeTextAds === 2) {
            adsContainer.childNodes[0].style.width = size.width + "px"
            var len = adsContainer.childNodes[0].childNodes.length
            for (var i = 0; i < len; i++) {
              adsContainer.childNodes[0].childNodes[i].style.width =
                size.width + "px"
            }
          }
        }
      }
    })
  }
  _initialize()
  _adsLog("adsSDK v010 loaded")
  playAds()
}
