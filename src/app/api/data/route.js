import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import fs from 'fs';

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

function getCredentials() {
  try {
    const creds = fs.readFileSync('creds.json');
    oauth2Client.setCredentials(JSON.parse(creds));
  } catch (error) {
    console.log('No creds found');
  }
}

getCredentials();

export async function GET() {
  const searchConsole = google.searchconsole({
    version: 'v1',
    auth: oauth2Client,
  });

  try {
    const { data } = await searchConsole.searchanalytics.query({
      siteUrl: 'https://thecatflix.com',
      startDate: '2023-12-12',
      endDate: '2024-01-10',
      dimensions: ['date'],
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error executing request', error);
    return NextResponse.json({ error: 'Error executing request' });
  }
}
