# MeteredPaywall

The MeteredPaywall class represents a system for informing users about paid access. This class does not implement a paid access system but is used to manage and display a pop-up window with a subscription offer.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Examples](#examples)
- [License](#license)

## Installation

You can include the `MeteredPaywall` class in your project by referencing it directly or by importing it as needed.

```html
<!-- Reference directly in your HTML -->
<script src="path/to/MeteredPaywall.js"></script>
```

## Usage

To use the MeteredPaywall class, create an instance with your desired configuration and include it in your project. Here's a basic example:

```javascript
// Initialize MeteredPaywall
const paywall = new MeteredPaywall({
  maxPageViews: 50,
  expirationDays: 30,
  popupDelaySeconds: 2,
  targetURL: 'https://example.com/subscribe',
  urgencyText: "GRAB OUR FINEST OFFER BEFORE IT'S GONE",
  urgencyDesc: 'Just $9 per month or an amazing $69 per year!',
  buttonText: 'JOIN TODAY',
})
```

## Configuration

The MeteredPaywall class accepts a configuration object with the following properties:

- `maxPageViews`: Maximum page views before the popup size increases.
- `expirationDays`: Number of days to consider in the user's browsing history.
- `popupDelaySeconds`: Delay in seconds before displaying the popup.
- `targetURL`: URL for redirection when the button is clicked.
- `urgencyText`: Text indicating urgency in the popup header.
- `urgencyDesc`: Description of the subscription offer.
- `buttonText`: Text on the popup button.

## Examples

Check the `index.html` file for usage example.

## License

This project is licensed under the MIT License.
