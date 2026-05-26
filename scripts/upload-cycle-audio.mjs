import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const SUPABASE_URL = 'https://ivqeokuxgxemhydvopdd.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2cWVva3V4Z3hlbWh5ZHZvcGRkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODc3Mjk3OSwiZXhwIjoyMDk0MzQ4OTc5fQ.eL9nHnTCLd7BXseuXKIcOoOuhqDTqFrj7vG6EljMPA4';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

const FILES = [
  'a1-1', 'a1-2', 'a1-3',
  'a2-1', 'a2-2', 'a2-3',
  'b1-1', 'b1-2', 'b1-3',
];

async function upload() {
  for (const id of FILES) {
    const localPath = `/Users/josedavidduartesilva/Downloads/${id}.mp3`;
    const storagePath = `textos/${id}.mp3`;

    console.log(`Uploading ${id}.mp3...`);
    const buffer = readFileSync(localPath);

    const { error } = await supabase.storage
      .from('cycle-audio')
      .upload(storagePath, buffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      });

    if (error) {
      console.error(`  ERROR ${id}:`, error.message);
    } else {
      const { data } = supabase.storage.from('cycle-audio').getPublicUrl(storagePath);
      console.log(`  OK → ${data.publicUrl}`);
    }
  }
  console.log('\nDone.');
}

upload();
