// PASTE THIS IN YOUR APPS SCRIPT — Extensions > Apps Script

const SHEET_ID = '12MbNd0gqoCZp6hwEMYKC_h3EjymP57E8b6MOro-FwRE'

function doGet(e) {
  try {
    const params = e.parameter
    const ss = SpreadsheetApp.openById(SHEET_ID)
    const type = params.formType || 'contact'

    if (type === 'contact') {
      let sheet = ss.getSheetByName('Contact Form')
      if (!sheet) {
        sheet = ss.insertSheet('Contact Form')
        sheet.appendRow(['Date', 'Name', 'Email', 'Phone', 'Service', 'Message'])
        sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1a2aff').setFontColor('#ffffff')
      }
      sheet.appendRow([
        new Date().toLocaleString('en-IN'),
        params.name || '',
        params.email || '',
        params.phone || '',
        params.service || '',
        params.message || ''
      ])
    }

    if (type === 'brochure') {
      let sheet = ss.getSheetByName('Brochure Requests')
      if (!sheet) {
        sheet = ss.insertSheet('Brochure Requests')
        sheet.appendRow(['Date', 'Name', 'Phone', 'Email', 'Business', 'Service', 'Package'])
        sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#ff6b00').setFontColor('#ffffff')
      }
      sheet.appendRow([
        new Date().toLocaleString('en-IN'),
        params.name || '',
        params.phone || '',
        params.email || '',
        params.business || '',
        params.service || '',
        params.package || ''
      ])
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

function doPost(e) {
  return doGet(e)
}
