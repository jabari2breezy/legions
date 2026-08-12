/**
 * Legions volunteer / interest signup -> Google Sheets
 *
 * Setup:
 * 1. Open https://docs.google.com/spreadsheets/d/1t7DdwNfpiwDG59f_dkcNiS7jz1l-QQo6hT4OE6rHhCM/edit
 * 2. Extensions > Apps Script
 * 3. Replace the default code with this file
 * 4. Run setupSheet once (authorize when prompted)
 * 5. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy the web app URL into GOOGLE_SHEETS_WEBAPP_URL in your hosting env
 */

const SHEET_ID = '1t7DdwNfpiwDG59f_dkcNiS7jz1l-QQo6hT4OE6rHhCM';
const SHEET_NAME = 'Signups';

function setupSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = ['Timestamp', 'Name', 'Email', 'Why Interested', 'Type'];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
}

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      setupSheet();
      sheet = ss.getSheetByName(SHEET_NAME);
    }

    sheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.name || '',
      payload.email || '',
      payload.message || '',
      payload.type || 'interest',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: 'Legions signup endpoint is live.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
