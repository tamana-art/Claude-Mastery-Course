// ═══════════════════════════════════════════════════════════════
//  Google Apps Script — Claude Mastery Progress Tracker
//
//  HOW TO DEPLOY:
//  1. Open your Google Sheet: "Claude Mastery — Progress Tracker"
//  2. Go to Extensions → Apps Script
//  3. Delete any existing code and paste this entire file
//  4. Click Deploy → New Deployment
//  5. Type: "Web app"
//  6. Execute as: "Me"
//  7. Who has access: "Anyone"
//  8. Click Deploy → Copy the URL
//  9. Go to your course at localhost:3456/admin and paste the URL
// ═══════════════════════════════════════════════════════════════

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    const user = data.user || 'Unknown';
    const event = data.event || 'unknown';

    // Find existing row for this user (column B = User ID)
    const lastRow = sheet.getLastRow();
    let userRow = -1;

    if (lastRow > 1) {
      const userIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (let i = 0; i < userIds.length; i++) {
        if (userIds[i][0] === user) {
          userRow = i + 2; // +2 for 1-indexed + header row
          break;
        }
      }
    }

    // Determine status
    let status = 'In Progress';
    const totalConcepts = data.totalConcepts || 28;
    if (data.conceptsUnlocked >= totalConcepts) {
      status = 'Complete! ✓';
    } else if (event === 'session_start') {
      status = 'Active Now';
    }

    // Format display name from user ID (ajmal-abc123 → Ajmal)
    const displayName = user.split('-')[0].charAt(0).toUpperCase() + user.split('-')[0].slice(1);

    // Row data: [User, User ID, Current Module, Current Concept, Modules Completed, Concepts Unlocked, Last Active, Time (min), Status]
    const rowData = [
      displayName,
      user,
      data.currentModule || '',
      data.currentConcept || '',
      data.modulesCompleted || 0,
      data.conceptsUnlocked + '/' + totalConcepts,
      new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }),
      data.timeInCourse || 0,
      status
    ];

    if (userRow > 0) {
      // Update existing row
      sheet.getRange(userRow, 1, 1, 9).setValues([rowData]);
    } else {
      // Add new row
      sheet.appendRow(rowData);
    }

    // Log events to a second sheet for detailed history
    let logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Event Log');
    if (!logSheet) {
      logSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('Event Log');
      logSheet.appendRow(['Timestamp', 'User', 'Event', 'Details']);
    }

    // Track API usage — one row per user per day (EST)
    if (event === 'api_usage') {
      let usageSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('API Usage');
      if (!usageSheet) {
        usageSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet('API Usage');
        usageSheet.appendRow(['Date', 'User', 'Messages', 'Input Tokens', 'Output Tokens', 'Session Cost ($)']);
        // Freeze header row for sorting
        usageSheet.setFrozenRows(1);
      }

      const today = new Date().toLocaleDateString('en-US', { timeZone: 'America/Toronto' });
      const inp = data.inputTokens || 0;
      const out = data.outputTokens || 0;
      const msgCost = parseFloat(data.cost || 0);

      // Find existing row for this user + today's date
      const usageLastRow = usageSheet.getLastRow();
      let usageRow = -1;
      if (usageLastRow > 1) {
        const rows = usageSheet.getRange(2, 1, usageLastRow - 1, 2).getValues();
        for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] === today && rows[i][1] === displayName) {
            usageRow = i + 2;
            break;
          }
        }
      }

      if (usageRow > 0) {
        // Update existing row — add to totals
        const existing = usageSheet.getRange(usageRow, 3, 1, 4).getValues()[0];
        usageSheet.getRange(usageRow, 3, 1, 4).setValues([[
          (existing[0] || 0) + 1,
          (existing[1] || 0) + inp,
          (existing[2] || 0) + out,
          parseFloat((parseFloat(existing[3] || 0) + msgCost).toFixed(6))
        ]]);
      } else {
        // New row for this user + date
        usageSheet.appendRow([today, displayName, 1, inp, out, msgCost.toFixed(6)]);
      }
    }

    let eventDetail = '';
    if (event === 'concept_unlock') eventDetail = 'Unlocked: ' + (data.unlockedConcept || '');
    if (event === 'module_complete') eventDetail = 'Completed: ' + (data.completedModule || '');
    if (event === 'session_start') eventDetail = 'Started session';
    if (event === 'heartbeat') eventDetail = 'Still active';
    if (event === 'api_usage') eventDetail = 'Tokens: ' + (data.inputTokens || 0) + ' in / ' + (data.outputTokens || 0) + ' out — $' + (data.cost || '0');

    logSheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }),
      displayName,
      event,
      eventDetail
    ]);

    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Allow GET requests for testing
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'Claude Mastery Tracker is running',
    message: 'Send POST requests from the course to track progress'
  })).setMimeType(ContentService.MimeType.JSON);
}
