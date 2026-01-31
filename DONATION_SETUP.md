# Buy Me a Coffee Configuration

## Setup Instructions

To enable the donation feature with your own Buy Me a Coffee account:

1. **Create a Buy Me a Coffee account** at [buymeacoffee.com](https://www.buymeacoffee.com/)

2. **Get your username** from your Buy Me a Coffee profile URL
   - Your URL will look like: `https://www.buymeacoffee.com/YOUR_USERNAME`

3. **Update the DonationModal component**:
   - Open `src/components/DonationModal.jsx`
   - Find line 18: `const buyMeACoffeeUrl = \`https://www.buymeacoffee.com/YOUR_USERNAME?amount=${amount}\`;`
   - Replace `YOUR_USERNAME` with your actual Buy Me a Coffee username

4. **Test the integration**:
   - Click the "Donate" button in the navbar
   - Select an amount and click "Buy Me a Coffee"
   - Verify it redirects to your Buy Me a Coffee page

## Features

- **Preset amounts**: $2, $5, $10 (quick selection)
- **Custom amounts**: Users can enter any amount between $2-$10
- **Privacy-first**: No payment data stored in the app
- **Secure**: Redirects to Buy Me a Coffee's secure payment page
- **User-friendly**: Beautiful modal with smooth animations

## Alternative Payment Processors

If you prefer a different payment processor, you can modify the `handleDonate` function in `DonationModal.jsx`:

### PayPal
```javascript
const paypalUrl = `https://www.paypal.com/paypalme/YOUR_USERNAME/${amount}`;
window.open(paypalUrl, '_blank');
```

### Ko-fi
```javascript
const kofiUrl = `https://ko-fi.com/YOUR_USERNAME`;
window.open(kofiUrl, '_blank');
```

### Stripe
For Stripe integration, you'll need to set up Stripe Checkout and use their API.

## Customization

You can customize the donation amounts by editing the `presetAmounts` array in `DonationModal.jsx`:

```javascript
const presetAmounts = [2, 5, 10]; // Change these values as needed
```

To change the min/max custom amount range, update the input validation:

```javascript
min="2"  // Change minimum
max="10" // Change maximum
```
