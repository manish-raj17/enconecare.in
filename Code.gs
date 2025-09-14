function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  var name = data.name;
  var contact = data.contact;
  var email = data.email;
  var message = data.message;
  
  sheet.appendRow([new Date(), name, contact, email, message]);
  
  var mailSubject = "New Enquiry from " + name;
  var mailBody = "You have a new enquiry:\n\n" +
                 "Name: " + name + "\n" +
                 "Contact: " + contact + "\n" +
                 "Email: " + email + "\n" +
                 "Message: " + message;
                 
  // Replace with your email address
  var recipientEmail = "YOUR_EMAIL@EXAMPLE.COM";
  
  MailApp.sendEmail(recipientEmail, mailSubject, mailBody);
  
  return ContentService.createTextOutput(JSON.stringify({"result": "success"})).setMimeType(ContentService.MimeType.JSON);
}