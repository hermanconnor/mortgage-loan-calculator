# 🏡 Mortgage Loan Calculator

A responsive, interactive web-based Mortgage Loan Calculator that calculates monthly (or bi-weekly/weekly) payments, generates an amortization schedule, and visualizes the principal vs. interest breakdown using a doughnut chart.

## 📸 Preview

![Mortgage Calculator Screenshot](/public/screenshot.png)

## ✨ Features

- Calculate mortgage payments based on:

  - Loan amount
  - Interest rate
  - Loan term (in years)
  - Payment frequency (monthly, bi-weekly, weekly)
  - Down payment

- Generate an amortization schedule with detailed payment breakdowns
- Display total interest, total payment, and monthly payment
- Visualize principal vs. interest with a doughnut chart (Chart.js)
- Paginated amortization table for large datasets
- Responsive and user-friendly UI

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mortgage-loan-calculator.git
cd mortgage-loan-calculator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173)

## 📊 Technologies Used

- **Vite**
- **TailwindCSS**
- **TypeScript**
- **Chart.js**

## ⚙️ How It Works

### 1. **Form Input**

The user enters loan details:

- Loan Amount
- Interest Rate
- Loan Term
- Payment Frequency
- Optional Down Payment

### 2. **Calculation**

The calculator:

- Converts annual interest to the correct periodic rate
- Uses the annuity formula to compute payment amount
- Calculates the total payment and total interest
- Builds a detailed amortization schedule

### 3. **Display**

- Updates the UI with:

  - Monthly/Bi-weekly/Weekly payment
  - Total Payment
  - Total Interest

- Generates and displays:

  - A **doughnut chart** showing principal vs interest
  - A **paginated amortization table** (12 entries per page)

## 🧪 Known Limitations

- Currently does not support property taxes, insurance, or HOA fees.
- Payment dates are estimated based on equal intervals (not calendar-accurate).
- Assumes fixed-rate loans only.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙌 Acknowledgments

- [Chart.js](https://www.chartjs.org/) – For the elegant charting library
- [Smashicons - Flaticon](https://www.flaticon.com/free-icons/mortgage/) – For the favicon
