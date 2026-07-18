# Google Drive Catalogue Setup

The catalogue source is an Excel Office file stored in Google Drive. It is downloaded through the Drive API and parsed during the site build.

## Setup
1. Create or select a Google Cloud project.
2. Enable the Google Drive API.
3. Create a service account for the ArtLoka website catalogue reader.
4. Create a JSON key for that service account and store it securely.
5. Share the Excel file with the service-account email as **Viewer**.
6. In Vercel, add:
   - `GOOGLE_DRIVE_FILE_ID=1h_nZinF1Go99_nI2shEaCzi3kSojhyQUhTgFgArXTRU`
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL=<service-account email>`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=<private key with newline escapes>`
7. Trigger a preview deployment and confirm the build log reports the expected product count.

## Security
- Never commit the service-account JSON or private key.
- Use read-only Drive scope.
- Share only the specific catalogue file or restricted folder required by the website.
- Rotate the key if it is exposed.

## Publishing workflow
1. Catalogue owner updates the approved Excel file.
2. Team triggers a Vercel preview deployment or deploy hook.
3. Build downloads, validates and normalizes the workbook.
4. Team reviews the preview and QA report.
5. Approved deployment is promoted or merged to production.
