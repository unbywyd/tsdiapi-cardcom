# **CardCom Plugin for TSDIAPI**

A **TSDIAPI** plugin to integrate with **CardCom** payment gateway, allowing secure transactions, refunds, and tokenized payments.

## 📌 About

This **TSDIAPI** plugin provides a seamless way to interact with **CardCom's API**, supporting transactions, refunds, card tokenization, and more.

🔗 **TSDIAPI CLI:** [@tsdiapi/cli](https://www.npmjs.com/package/@tsdiapi/cli)  
🔗 **CardCom API Docs:** [CardCom Official API](https://secure.cardcom.solutions/)

---

## 📦 Installation

Install the plugin using npm:

```bash
npm install --save @tsdiapi/cardcom
```

Then, register the plugin in your **TSDIAPI** project:

```typescript
import { createApp } from "@tsdiapi/server";
import createPlugin from "@tsdiapi/cardcom";

createApp({
    plugins: [createPlugin()]
});
```

---

## 🚀 Features

- 🔹 **Payment Authorization** – Securely authorize payments using tokens or card details.
- 💰 **Charge Payments** – Capture pre-authorized payments.
- 🔄 **Refund Transactions** – Partial and full refunds for transactions.
- 🏦 **Account Info** – Retrieve information about a CardCom account.
- 🔍 **Transaction Queries** – Fetch transaction details by ID or list by date range.
- 💳 **Tokenized Payments** – Charge saved cards using secure tokens.
- 🏗 **Low Profile Transactions** – Create and retrieve results of hosted payment pages.
- ✅ **Seamless Integration** – Works with **TSDIAPI** for modular plugin-based architectures.

---

## 🔧 Configuration

This plugin requires API credentials and endpoint settings, which can be configured via environment variables.

```typescript
createPlugin({
    apiUrl: "https://secure.cardcom.solutions/api/v11",
    terminalId: "123456",
    apiName: "your_api_name",
    apiPassword: "your_api_password",
    successRedirectUrl: "https://yourdomain.com/success",
    failedRedirectUrl: "https://yourdomain.com/fail",
    webHookUrl: "https://yourdomain.com/webhook"
});
```

| Option                 | Type     | Required | Default | Description |
|------------------------|---------|----------|---------|-------------|
| `apiUrl`              | `string` | ✅ | `""` | Base URL for the CardCom API |
| `terminalId`          | `string` | ✅ | `""` | Terminal ID for authentication |
| `apiName`             | `string` | ✅ | `""` | API username for authentication |
| `apiPassword`         | `string` | ✅ | `""` | API password for authentication |
| `successRedirectUrl`  | `string` | ✅ | `""` | Redirect URL after successful payment |
| `failedRedirectUrl`   | `string` | ✅ | `""` | Redirect URL after failed payment |
| `webHookUrl`          | `string` | ✅ | `""` | Webhook URL for payment notifications |

Alternatively, these values can be set in **TSDIAPI** app configuration:

```typescript
this.config.apiUrl = this.config.apiUrl || appConfig["CARDCOM_API_URL"];
this.config.terminalId = this.config.terminalId || appConfig["CARDCOM_TERMINAL_ID"];
this.config.apiName = this.config.apiName || appConfig["CARDCOM_API_NAME"];
this.config.apiPassword = this.config.apiPassword || appConfig["CARDCOM_API_PASSWORD"];
this.config.successRedirectUrl = this.config.successRedirectUrl || appConfig["CARDCOM_SUCCESS_REDIRECT_URL"];
this.config.failedRedirectUrl = this.config.failedRedirectUrl || appConfig["CARDCOM_FAILED_REDIRECT_URL"];
this.config.webHookUrl = this.config.webHookUrl || appConfig["CARDCOM_WEBHOOK_URL"];
```

---

## 📌 How to Use

After installing and configuring the plugin, you can interact with **CardCom API** using `getCardComProvider()`.

### **1️⃣ Authorize a Payment**
```typescript
const cardcom = getCardComProvider();
const response = await cardcom.authorizePayment(100, "your_card_token", "1225");
console.log(response);
```

### **2️⃣ Charge a Payment**
```typescript
const response = await cardcom.chargePayment(100, "your_card_token", "1225", "approval_number", {
    name: "John Doe",
    email: "john@example.com",
    mobile: "+972500000000",
    productDescription: "Premium Subscription"
});
console.log(response);
```

### **3️⃣ Refund a Transaction**
```typescript
const response = await cardcom.refundTransaction(123456, { PartialSum: 50 });
console.log(response);
```

### **4️⃣ List Transactions**
```typescript
const response = await cardcom.listTransactions("01012024", "31012024", 1, 10);
console.log(response);
```

### **5️⃣ Get Transaction Details**
```typescript
const response = await cardcom.getTransactionById(987654);
console.log(response);
```

### **6️⃣ Get Account Info**
```typescript
const response = await cardcom.getAccountInfoById(56789);
console.log(response);
```

### **7️⃣ Request a New Card Token**
```typescript
const response = await cardcom.requestNewCard('testId');
console.log(response);
```

### **8️⃣ Get Low Profile Transaction Result**
```typescript
const response = await cardcom.getLowProfileResult("low-profile-id");
console.log(response);
```


## 👨‍💻 Contributing

Contributions are welcome! If you have improvements or bug fixes, feel free to open a pull request.

📧 **Contact:** unbywyd@gmail.com  

🚀 Happy coding with **TSDIAPI & CardCom**! 🎉