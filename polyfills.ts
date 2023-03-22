// global is not defined
if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

// buffer is not defined
import { Buffer } from 'buffer';
if (typeof window !== 'undefined') {
  (window as any).Buffer = Buffer;
}

// process is not defined
import process from 'process';
if (typeof window !== 'undefined') {
  (window as any).process = process;
}
