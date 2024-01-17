import { google } from 'googleapis';
import fs from 'fs/promises';
import { NextResponse } from 'next/server';

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

async function getCredentials() {
  try {
    const creds = await fs.readFile('creds.json');
    oauth2Client.setCredentials(JSON.parse(creds));
  } catch (error) {
    console.log('No creds found');
  }
}

getCredentials();

export async function GET(req) {
  const url = new URL(req.url);

  const code = url.searchParams.get('code');

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    await fs.writeFile('creds.json', JSON.stringify(tokens));

    const mainUrl = url.origin;

    // Now you can use `oauth2Client` for further API requests
    return NextResponse.redirect(mainUrl);
  } catch (error) {
    console.error('Error exchanging code for tokens', error.message);
    return NextResponse.json({ error: 'Error exchanging code for tokens' });
  }
}

export async function POST() {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly',
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return NextResponse.json({ url });
}
