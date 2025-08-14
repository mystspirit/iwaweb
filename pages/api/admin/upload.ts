import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new formidable.IncomingForm({
    uploadDir: uploadsDir,
    keepExtensions: true,
    multiples: false,
  });

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Upload failed', details: err });
    }
    const file = files.image;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    // Return relative path for use in frontend
    const uploadedFile = Array.isArray(file) ? file[0] as formidable.File : file as formidable.File;
    const filePath = uploadedFile.newFilename;
    return res.status(200).json({ url: `/uploads/${filePath}` });
  });
}
