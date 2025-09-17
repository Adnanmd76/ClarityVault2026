# 🏗️ Wallet UI Architecture

یہ دستاویز Wallet UI ایپلیکیشن کے ٹیکنیکل آرکیٹیکچر، ڈیٹا فلو، اور سیکیورٹی کے اصولوں کی وضاحت کرتی ہے۔

---

## 📦 Folder Structure (فولڈر کا تفصیلی ڈھانچہ)

-   **/public**: یہاں static اثاثے جیسے `index.html` اور تصاویر رکھی گئی ہیں۔
-   **/src**: ایپلیکیشن کا تمام سورس کوڈ یہاں موجود ہے۔
    -   **/assets**: آئیکنز، فونٹس، اور وہ تصاویر جو کمپونینٹس میں استعمال ہوتی ہیں۔
    -   **/components**: دوبارہ قابل استعمال (reusable) UI کمپونینٹس۔
        -   **/common**: عام کمپونینٹس جیسے بٹن، ان پٹ فیلڈز، موڈل۔
        -   **/layout**: ایپ کا بنیادی ڈھانچہ جیسے ہیڈر، فوٹر، سائڈبار۔
    -   **/features**: ہر فیچر سے متعلق کوڈ (جیسے والیٹ، ٹرانزیکشن، سواپ)۔
        -   **/wallet**: والیٹ سے متعلق کمپونینٹس، اسٹیٹ، اور فنکشنز۔
    -   **/hooks**: کسٹم React hooks (جیسے `useWallet()`, `useApi()`)۔
    -   **/lib** / **sdk**: تھرڈ پارٹی SDKs اور بلاک چین کے ساتھ انٹیگریشن کا کوڈ۔
    -   **/pages**: ایپلیکیشن کے مختلف پیجز یا روٹس (जैसे `/dashboard`, `/send`)۔
    -   **/store**: Redux کا اسٹیٹ مینجمنٹ (actions, reducers, slices)۔
    -   **/utils**: معاون فنکشنز (helper functions) جیسے تاریخ فارمیٹنگ، توثیق (validation)۔

---

## 🔄 Data Flow (ڈیٹا کا بہاؤ)

1.  **UI Interaction**: صارف `Send` بٹن پر کلک کرتا ہے۔
2.  **Component Call**: `SendForm` کمپونینٹ `handleSubmit` فنکشن کو کال کرتا ہے۔
3.  **Redux Action**: ایک Redux action (جیسے `sendTransaction`) ڈسپیچ ہوتی ہے۔
4.  **API Call**: Redux Thunk/Saga کے ذریعے `axios` کا استعمال کرتے ہوئے `/api/wallet/send` پر POST ریکوئسٹ بھیجی جاتی ہے۔
5.  **SDK Interaction**: بیک اینڈ پر، کرپٹو SDK بلاک چین کے ساتھ تعامل کرکے ٹرانزیکشن بناتا اور دستخط کرتا ہے۔
6.  **State Update**: API سے جواب ملنے پر (کامیابی یا ناکامی)، Redux reducer اسٹیٹ کو اپ ڈیٹ کرتا ہے۔
7.  **UI Update**: React UI خود بخود نئی اسٹیٹ کی بنیاد پر اپ ڈیٹ ہو جاتا ہے اور صارف کو `txHash` یا غلطی کا پیغام دکھاتا ہے۔

---

## 🔐 Security Layers (سیکیورٹی کی تہیں)

-   **Private Key Storage**: پرائیویٹ کیز کو ڈیوائس کے محفوظ اسٹوریج (iOS Keychain / Android Keystore) میں AES-256 انکرپشن کے ساتھ اسٹور کیا جاتا ہے۔
-   **Biometric Authentication**: ٹرانزیکشن پر دستخط کرنے سے پہلے، ڈیوائس کی بائیو میٹرک API (Face ID / Fingerprint) کے ذریعے تصدیق لازمی ہے۔
-   **Session Management**: 5 منٹ کی غیرفعالیت (inactivity) کے بعد سیشن خود بخود ٹائم آؤٹ ہو جاتا ہے اور ایپ لاک ہو جاتی ہے۔
-   **API Security**: تمام API کمیونیکیشن HTTPS پر ہوتی ہے، اور ہر ریکوئسٹ کے ساتھ ایک JWT (JSON Web Token) بھیجا جاتا ہے۔
-   
