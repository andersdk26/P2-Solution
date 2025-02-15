import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import { parse as urlPass } from 'node:url';
import * as path from 'path';

const port = 3000;
const rootDir = '../front-end/'; // Change this to your project's root if needed
const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    // Add other MIME types as needed
};

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    // Get the requested file path
    const query = urlPass(req.url || '', true);
    let filePath: string = path.join(
        rootDir,
        query.pathname === '/' || query.pathname === null
            ? 'index.html'
            : query.pathname
    );
    filePath = path.resolve(filePath);
    if (!filePath.startsWith(path.resolve(rootDir))) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    // Get the file extension
    const extname: string = path.extname(filePath);

    // Set the correct MIME type
    const contentType: string =
        mimeTypes[extname] || 'application/octet-stream';

    // Check if the file exists
    fs.exists(filePath, (exists: boolean) => {
        if (exists) {
            // Read the file and send it
            fs.readFile(
                filePath,
                (error: NodeJS.ErrnoException | null, content: Buffer) => {
                    if (error) {
                        // Error reading file
                        res.writeHead(500);
                        res.end(`Server Error: ${error.code}`);
                    } else {
                        // Send the file with the correct MIME type
                        res.writeHead(200, { 'Content-Type': contentType });
                        res.end(content, 'utf-8');
                    }
                }
            );
        } else {
            // File not found
            res.writeHead(404);
            res.end('File Not Found');
        }
    });
});

server.listen(port, () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
});
