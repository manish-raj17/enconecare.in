
# How to Send Form Data to Google Sheets and Receive Email Notifications

This guide explains how to connect your HTML form to a Google Sheet and receive email notifications for new submissions.

## 1. Create a Google Sheet

1.  Create a new Google Sheet.
2.  Add headers for the data you want to collect (e.g., `Name`, `Email`, `Phone`, `Message`).

## 2. Create a Google Apps Script

1.  In your Google Sheet, go to **Extensions > Apps Script**.
2.  Replace the code in `Code.gs` with the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = [];
  row.push(new Date());
  for (var key in e.parameter) {
    row.push(e.parameter[key]);
  }
  sheet.appendRow(row);
  
  MailApp.sendEmail("your-email@example.com", "New Form Submission", JSON.stringify(e.parameter));
  
  return ContentService.createTextOutput("success");
}
```

3.  Replace `your-email@example.com` with your actual email address.

## 3. Deploy the Web App

1.  Click **Deploy > New deployment**.
2.  For **Select type**, choose **Web app**.
3.  In the **Configuration** section:
    *   **Description:** A brief description of your web app.
    *   **Execute as:** **Me**.
    *   **Who has access:** **Anyone**.
4.  Click **Deploy**.
5.  Authorize the script to access your Google account.
6.  Copy the **Web app URL**.

## 4. Update Your HTML and JavaScript

1.  Open `index.html` and replace the Formspree URL in the `form` tag's `action` attribute with your web app URL.
2.  Open `enhancements.js` and update the `url` in the AJAX request to your web app URL.
