// lib/gcs.ts
import { Storage } from '@google-cloud/storage';
import { tmpdir } from 'os';
import { writeFileSync } from 'fs';
import path from 'path';

export function getGCSClient() {
  if (!process.env.GCS_KEY_BASE64) throw new Error("Missing GCS_KEY_BASE64");

  const credentials = JSON.parse(
    Buffer.from(process.env.GCS_KEY_BASE64, 'base64').toString('utf8')
  );

  return new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    credentials, // <- safer and avoids fs I/O
  });
}