import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase configuration
const supabaseUrl = 'https://gvesiqpwsqgosfsobggx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2ZXNpcXB3c3Fnb3Nmc29iZ2d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5Mzk3MjUsImV4cCI6MjA4MzUxNTcyNX0.YoqYLZmkmda4B5TvTDobbmN8cAWRLIMk80flqEI5Srk';

const supabase = createClient(supabaseUrl, supabaseKey);

// Bucket configuration
const BUCKETS = {
    batch1: 'batch1-photos',
    batch2: 'batch2-photos',
    batch3: 'batch3-photos',
    photos1: 'photos-part1',
    photos2: 'photos-part2',
};

// File paths
const PUBLIC_DIR = path.join(__dirname, '..', 'public');
const BATCH1_DIR = path.join(PUBLIC_DIR, 'drive-download-20260106T151449Z-1-001', 'batch1');
const BATCH2_DIR = path.join(PUBLIC_DIR, 'drive-download-20260106T151449Z-1-001', 'batch2');
const BATCH3_DIR = path.join(PUBLIC_DIR, 'drive-download-20260106T151449Z-1-001', 'batch3');
const PHOTOS_DIR = path.join(PUBLIC_DIR, 'photos');

// Helper function to get all files in a directory
function getFiles(dir) {
    const files = fs.readdirSync(dir);
    return files.filter(file => {
        const filePath = path.join(dir, file);
        return fs.statSync(filePath).isFile() && !file.startsWith('.');
    });
}

// Helper function to upload file
async function uploadFile(bucketName, filePath, fileName) {
    try {
        const fileBuffer = fs.readFileSync(filePath);
        const contentType = getContentType(fileName);

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(fileName, fileBuffer, {
                contentType,
                upsert: true,
            });

        if (error) {
            console.error(`❌ Error uploading ${fileName} to ${bucketName}:`, error.message);
            return null;
        }

        console.log(`✅ Uploaded: ${fileName} → ${bucketName}`);
        return data;
    } catch (err) {
        console.error(`❌ Failed to read/upload ${fileName}:`, err.message);
        return null;
    }
}

// Get content type based on file extension
function getContentType(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    const types = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.webp': 'image/webp',
        '.svg': 'image/svg+xml',
    };
    return types[ext] || 'application/octet-stream';
}

// Main upload function
async function uploadAllPhotos() {
    console.log('🚀 Starting photo upload to Supabase...\n');

    let totalUploaded = 0;
    let totalFailed = 0;

    // Upload batch1
    console.log('📁 Uploading batch1 photos...');
    const batch1Files = getFiles(BATCH1_DIR);
    for (const file of batch1Files) {
        const result = await uploadFile(BUCKETS.batch1, path.join(BATCH1_DIR, file), file);
        result ? totalUploaded++ : totalFailed++;
    }

    // Upload batch2
    console.log('\n📁 Uploading batch2 photos...');
    const batch2Files = getFiles(BATCH2_DIR);
    for (const file of batch2Files) {
        const result = await uploadFile(BUCKETS.batch2, path.join(BATCH2_DIR, file), file);
        result ? totalUploaded++ : totalFailed++;
    }

    // Upload batch3
    console.log('\n📁 Uploading batch3 photos...');
    const batch3Files = getFiles(BATCH3_DIR);
    for (const file of batch3Files) {
        const result = await uploadFile(BUCKETS.batch3, path.join(BATCH3_DIR, file), file);
        result ? totalUploaded++ : totalFailed++;
    }

    // Upload photos - split across 2 buckets
    console.log('\n📁 Uploading photos folder...');
    const photoFiles = getFiles(PHOTOS_DIR);
    const midpoint = Math.ceil(photoFiles.length / 2);

    console.log('  → Part 1 (first half)...');
    for (let i = 0; i < midpoint; i++) {
        const file = photoFiles[i];
        const result = await uploadFile(BUCKETS.photos1, path.join(PHOTOS_DIR, file), file);
        result ? totalUploaded++ : totalFailed++;
    }

    console.log('  → Part 2 (second half)...');
    for (let i = midpoint; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const result = await uploadFile(BUCKETS.photos2, path.join(PHOTOS_DIR, file), file);
        result ? totalUploaded++ : totalFailed++;
    }

    console.log('\n' + '='.repeat(50));
    console.log(`✨ Upload complete!`);
    console.log(`✅ Uploaded: ${totalUploaded} files`);
    console.log(`❌ Failed: ${totalFailed} files`);
    console.log('='.repeat(50));

    // Print bucket summary
    console.log('\n📊 Bucket Distribution:');
    console.log(`  • ${BUCKETS.batch1}: ${batch1Files.length} files`);
    console.log(`  • ${BUCKETS.batch2}: ${batch2Files.length} files`);
    console.log(`  • ${BUCKETS.batch3}: ${batch3Files.length} files`);
    console.log(`  • ${BUCKETS.photos1}: ${midpoint} files`);
    console.log(`  • ${BUCKETS.photos2}: ${photoFiles.length - midpoint} files`);
}

// Run the upload
uploadAllPhotos().catch(console.error);
