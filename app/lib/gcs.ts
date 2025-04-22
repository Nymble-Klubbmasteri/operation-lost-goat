// lib/gcs.ts
import { Storage } from '@google-cloud/storage';
import { tmpdir } from 'os';
import { writeFileSync } from 'fs';
import path from 'path';

export function getGCSClient() {
  const keyPath = path.join(tmpdir(), 'gcs-key.json');

  if (!process.env.GCS_KEY_BASE64) throw new Error("Missing GCS_KEY_BASE64");
  const jsonString = Buffer.from(process.env.GCS_KEY_BASE64, 'base64').toString('utf8');
  writeFileSync(keyPath, jsonString);

  return new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: keyPath,
  });
}