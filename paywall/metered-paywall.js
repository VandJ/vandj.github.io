/**
 * The MeteredPaywall class represents a system for informing users about paid access.
 * This class does not represent a paid access system but is used to manage and display a pop-up window with a subscription offer.
 *
 * @fileoverview
 * Author: VandJ
 * Date created: 2023-09-27
 * Version: 1.0.0
 *
 * @param {Object} config - Configuration for the paywall system.
 * @param {number} config.maxPageViews - Maximum page views before popup size increases.
 * @param {number} config.expirationDays - Days to consider in user's browsing history.
 * @param {number} config.popupDelaySeconds - Delay in seconds before displaying the popup.
 * @param {string} config.targetURL - URL for redirection on button click.
 * @param {string} config.urgencyText - Text indicating urgency in the popup header.
 * @param {string} config.urgencyDesc - Description of the subscription offer.
 * @param {string} config.buttonText - Text on the popup button.
 */

class MeteredPaywall {
  constructor(config) {
    // Default configuration
    const defaultConfig = {
      maxPageViews: 50,
      expirationDays: 30,
      popupDelaySeconds: 2,
      targetURL: 'https://examle.domain.com',
      urgencyText: "GRAB OUR FINEST OFFER BEFORE IT'S GONE",
      urgencyDesc: 'Just $9 per month or an amazing $69 per year!',
      buttonText: 'JOIN TODAY',
    }

    // Merge default and user configuration
    this.config = Object.assign({}, defaultConfig, config)

    // Сonfiguration properties
    this.maxPageViews = this.config.maxPageViews
    this.expirationDays = this.config.expirationDays
    this.popupDelaySeconds = this.config.popupDelaySeconds
    this.targetURL = this.config.targetURL
    this.urgencyText = this.config.urgencyText
    this.urgencyDesc = this.config.urgencyDesc
    this.buttonText = this.config.buttonText

    this.popup = this.createPopup()

    // Event listeners
    window.addEventListener('load', this.checkPageViews.bind(this))
    const clickableBlock = document.getElementById('clickableBlock')
    const clickableBlock2 = document.getElementById('clickableBlock2')
    const self = this
    clickableBlock.addEventListener('click', function () {
      window.location.href = self.targetURL
    })
    clickableBlock2.addEventListener('click', function () {
      window.location.href = self.targetURL
    })
  }

  // Function to set a cookie
  setCookie(name, value, days) {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  // Function to get a cookie by name
  getCookie(name) {
    const cookieName = `${name}=`
    const cookies = document.cookie.split(';')
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim()
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length)
      }
    }
    return null
  }

  // Function to create the popup
  createPopup() {
    const popup = document.createElement('div')
    popup.id = 'dock-container'
    popup.className = 'dock-container'
    popup.innerHTML = `
  <div class="dock-heading">
    <div class="dock-inner-container">
       <div class="dock-text">
           <div class="dock-button">
               <div class="dock-message">
                   <div class="desktop-dock">
                       <strong class="urgency-text">
                           <span class="span-element">${this.urgencyText}</span>:
                       </strong>
                       <span class="span-element-ellipsis">
                           <div style="display: inline;">
                               <span>${this.urgencyDesc}</span>
                           </div>
                       </span>
                   </div>
                   <div class="mobile-dock">
                       <strong class="urgency-text">
                           <span>${this.urgencyText}</span>:
                       </strong>
                       <br>
                       <span class="span-element-ellipsis">
                           <div style="display: inline;">
                               <span>${this.urgencyDesc}</span>
                           </div>
                       </span>
                   </div>
               </div>
           </div>
       </div>
       <div class="mobile-view"  id="clickableBlock">
           <div class="promo-button">
               <p class="subscription-text">${this.buttonText}</p>
           </div>
           <div class="border-right-element"></div>
           <button type="button" class="circular-button" aria-label="Button to subscription page">
               <div class="svg-icon">
                   <svg width="16" height="16" viewBox="0 0 9 16" version="1.1">
                       <g id="Canvas" transform="translate(-8250 -1500)">
                           <g id="Vector">
                               <use xlink:href="#path0_stroke" transform="translate(8251 1501.5)" fill="#111"></use>
                           </g>
                       </g>
                       <defs>
                           <path id="path0_stroke" d="M 6.5 6.5L 7.20711 7.20711L 7.91421 6.5L 7.20711 5.79289L 6.5 6.5ZM -0.707107 0.707107L 5.79289 7.20711L 7.20711 5.79289L 0.707107 -0.707107L -0.707107 0.707107ZM 5.79289 5.79289L -0.707107 12.2929L 0.707107 13.7071L 7.20711 7.20711L 5.79289 5.79289Z"></path>
                       </defs>
                   </svg>
               </div>
           </button>
       </div>
   </div>
</div>
<div class="dock-content">
   <strong class="urgency-text">
       <span class="span-element">${this.urgencyText}</span>:
   </strong>
   <span class="span-element-ellipsis">
       <div style="display: block;">
           <span class="span-element-text">${this.urgencyDesc}</span>
       </div>
   </span>
   <div class = "button-act">
       <button type="button" class="circular-button" aria-label="Button to subscription page"  id="clickableBlock2">${this.buttonText}</button>
   </div>
</div>`
    // Append the popup to the document body
    document.body.appendChild(popup)

    return popup
  }

  // Function to show the popup
  showPopup() {
    if (this.popup) {
      this.popup.classList.add('shown')
      console.log('shown')
      // Add a CSS class for sliding animation
      this.popup.classList.add('slide-up')
    }
  }

  // Function to show the popup after a delay of popupDelaySeconds seconds
  showPopupOnTimeout() {
    if (this.popup) {
      setTimeout(() => {
        this.showPopup()
      }, this.popupDelaySeconds * 1000) // Convert seconds to milliseconds
    }
  }

  // Function to expand the popup
  expandPopup() {
    if (this.popup) {
      setTimeout(() => {
        this.showPopup()
      }, this.popupDelaySeconds * 1000)
      setTimeout(() => {
        this.popup.classList.add('expand')
        this.popup.classList.remove('shown')
      }, this.popupDelaySeconds * 1000 * 2)
    }
  }

  // Function to check and manage the page view count
  checkPageViews() {
    const currentDate = new Date()
    const lastViewedDate = new Date(this.getCookie('lastViewedDate'))
    const pageViews = parseInt(this.getCookie('pageViews')) || 0

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - lastViewedDate
    const timeDifferenceDays = timeDifference / (24 * 60 * 60 * 1000)

    // Check if lastViewedDate is undefined or older than this.expirationDays
    if (!lastViewedDate || timeDifferenceDays >= this.expirationDays) {
      // If lastViewedDate is undefined or expired, set it to the current date
      this.setCookie('lastViewedDate', currentDate.toISOString(), this.expirationDays)
    }

    // Check if the last viewed date is within the expiration period
    if (timeDifferenceDays <= this.expirationDays) {
      if (pageViews >= this.maxPageViews) {
        // If page view limit exceeded, expand the popup and update page view count
        this.expandPopup()
        this.setCookie('pageViews', pageViews + 1, this.expirationDays)
      } else {
        // Show the popup after a timeout and update page view count
        this.showPopupOnTimeout()
        this.setCookie('pageViews', pageViews + 1, this.expirationDays)
      }
    } else {
      // Reset the page view count if the expiration period has passed and set lastViewedDate to currentDate
      this.setCookie('pageViews', 0, this.expirationDays)
      this.setCookie('lastViewedDate', currentDate.toISOString(), this.expirationDays)
    }
  }
}
