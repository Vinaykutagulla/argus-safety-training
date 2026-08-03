import net from 'net';
import path from 'path';
import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

let serverProcess: ChildProcessWithoutNullStreams | null = null;
let serverPort: number | null = null;

const projectRoot = path.resolve(__dirname, '..', '..', '..');

function getNextBinPath() {
  return path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next');
}

async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1');
    server.on('listening', () => {
      const address = server.address();
      if (address && typeof address !== 'string') {
        const port = address.port;
        server.close(() => resolve(port));
      } else {
        server.close(() => reject(new Error('Failed to allocate free port')));
      }
    });
    server.on('error', err => reject(err));
  });
}

async function waitForServer(url: string, timeoutMs = 90000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (response.ok || response.status < 500) {
        return;
      }
    } catch {
      // Keep retrying until the server is accepting requests.
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  throw new Error(`Timed out waiting for test server at ${url}`);
}

export async function startNextTestServer() {
  if (serverProcess && !serverProcess.killed) {
    return { serverProcess, port: serverPort! };
  }

  serverPort = await getFreePort();
  const nextBinPath = getNextBinPath();

  try {
    serverProcess = spawn(process.execPath, [nextBinPath, 'dev', '--hostname', '127.0.0.1', '--port', serverPort.toString()], {
      cwd: projectRoot,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        PORT: serverPort.toString(),
      },
      stdio: 'pipe',
      shell: false,
    });
  } catch (error) {
    serverProcess = spawn(process.execPath, [nextBinPath, 'dev', '--hostname', '127.0.0.1', '--port', serverPort.toString()], {
      cwd: projectRoot,
      env: {
        ...process.env,
        NODE_ENV: 'test',
        PORT: serverPort.toString(),
      },
      stdio: 'pipe',
      shell: true,
    });
  }

  serverProcess.stdout?.on('data', data => {
    process.stdout.write(`[next-test-server] ${data}`);
  });

  serverProcess.stderr?.on('data', data => {
    process.stderr.write(`[next-test-server] ${data}`);
  });

  await waitForServer(`http://127.0.0.1:${serverPort}/api/auth/login`);
  return { serverProcess, port: serverPort };
}

export async function stopNextTestServer() {
  if (!serverProcess || serverProcess.killed) {
    return;
  }

  serverProcess.kill('SIGTERM');
  await new Promise(resolve => setTimeout(resolve, 2000));
  serverProcess = null;
}
