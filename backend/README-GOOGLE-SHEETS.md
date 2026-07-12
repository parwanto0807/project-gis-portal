# Google Sheets Integration for Suggestion System

## Overview

This integration connects the suggestion system (ImprovementSuggestion) to Google Sheets, enabling automatic data sync for tracking and reporting.

## How It Works

1. User submits suggestion via `/api/v1/suggestions`
2. Data saved to PostgreSQL (primary storage)
3. After DB success, automatically appended to Google Sheet (non-blocking)

## Column Mapping

Each suggestion becomes one row with these columns:

| No | Column | Field |
|----|--------|-------|
| 1 | No. Form | `noForm` |
| 2 | Tanggal | `tanggal` |
| 3 | NIK | `nik` |
| 4 | Nama Karyawan | `namaKaryawan` |
| 5 | Departemen | `departemen` |
| 6 | Area Proses | `areaProses` |
| 7 | Area Temuan | `areaTemuan` |
| 8 | Focus Defect | `focusDefect` |
| 9 | Judul Ide | `judulIde` |
| 10 | Kondisi Saat Ini | `kondisiSaatIni` |
| 11 | Akar Masalah | `akarMasalah` |
| 12 | Usulan Improvement | `usulanImprovement` |
| 13 | NG Ratio Sebelum | `ngRatioSebelum` |
| 14 | NG Ratio Sesudah | `ngRatioSesudah` |
| 15 | Impact Turun | `impactTurun` |
| 16 | Nominal Apresiasi | `nominalApresiasi` |
| 17 | PIC Implementasi | `picImplementasi` |
| 18 | Target Selesai | `targetSelesai` |
| 19 | Tanggal Approval | `tanggalApproval` |
| 20 | Status Approval | `statusApproval` |
| 21 | Created At | `createdAt` |

## Setup

### 1. Create Service Account

1. Go to [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials)
2. Create a **Service Account**
3. Generate JSON key
4. Copy **client_email** and **private_key**
5. Share your Google Sheet with the service account email as **Editor**

### 2. Set Environment Variables in `.env`

```env
GOOGLE_SHEETS_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID="your-google-spreadsheet-id"
```

Note: Spreadsheet ID is from the URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`

### 3. Prepare Sheet

First row must be headers matching column order above. Sheets service appends after the first row.

## Test Connection

Run temp test script via node:
```bash
node -e "import('./src/services/googleSheetsService.js').then(m => m.testConnection().then(r => console.log(JSON.stringify(r, null, 2))))"
```

## Architecture

```
User → Frontend → API → suggestionController.createSuggestion()
                            ├── Save to PostgreSQL (primary)
                            └── Append to Google Sheet (secondary)
```

Integration is non-blocking: Google Sheets failure won't prevent data submission.
