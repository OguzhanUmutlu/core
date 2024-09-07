import { type Cred } from '../cred.js';
import { Errno, ErrnoError } from '../error.js';
import { type File } from '../file.js';
import { type Stats } from '../stats.js';
import type { FileSystem, FileSystemMetadata } from '../filesystem.js';
import type { Mixin } from './shared.js';

/**
 * Implements the non-readonly methods to throw `EROFS`
 */
/* eslint-disable @typescript-eslint/require-await */
export function Readonly<T extends typeof FileSystem>(
	FS: T
): Mixin<
	T,
	{
		metadata(): FileSystemMetadata;
		rename(oldPath: string, newPath: string, cred: Cred): Promise<void>;
		renameSync(oldPath: string, newPath: string, cred: Cred): void;
		createFile(path: string, flag: string, mode: number, cred: Cred): Promise<File>;
		createFileSync(path: string, flag: string, mode: number, cred: Cred): File;
		unlink(path: string, cred: Cred): Promise<void>;
		unlinkSync(path: string, cred: Cred): void;
		rmdir(path: string, cred: Cred): Promise<void>;
		rmdirSync(path: string, cred: Cred): void;
		mkdir(path: string, mode: number, cred: Cred): Promise<void>;
		mkdirSync(path: string, mode: number, cred: Cred): void;
		link(srcpath: string, dstpath: string, cred: Cred): Promise<void>;
		linkSync(srcpath: string, dstpath: string, cred: Cred): void;
		sync(path: string, data: Uint8Array, stats: Readonly<Stats>): Promise<void>;
		syncSync(path: string, data: Uint8Array, stats: Readonly<Stats>): void;
	}
> {
	abstract class ReadonlyFS extends FS {
		public metadata(): FileSystemMetadata {
			return { ...super.metadata(), readonly: true };
		}
		/* eslint-disable @typescript-eslint/no-unused-vars */
		public async rename(oldPath: string, newPath: string, cred: Cred): Promise<void> {
			throw new ErrnoError(Errno.EROFS);
		}

		public renameSync(oldPath: string, newPath: string, cred: Cred): void {
			throw new ErrnoError(Errno.EROFS);
		}

		public async createFile(path: string, flag: string, mode: number, cred: Cred): Promise<File> {
			throw new ErrnoError(Errno.EROFS);
		}

		public createFileSync(path: string, flag: string, mode: number, cred: Cred): File {
			throw new ErrnoError(Errno.EROFS);
		}

		public async unlink(path: string, cred: Cred): Promise<void> {
			throw new ErrnoError(Errno.EROFS);
		}

		public unlinkSync(path: string, cred: Cred): void {
			throw new ErrnoError(Errno.EROFS);
		}

		public async rmdir(path: string, cred: Cred): Promise<void> {
			throw new ErrnoError(Errno.EROFS);
		}

		public rmdirSync(path: string, cred: Cred): void {
			throw new ErrnoError(Errno.EROFS);
		}

		public async mkdir(path: string, mode: number, cred: Cred): Promise<void> {
			throw new ErrnoError(Errno.EROFS);
		}

		public mkdirSync(path: string, mode: number, cred: Cred): void {
			throw new ErrnoError(Errno.EROFS);
		}

		public async link(srcpath: string, dstpath: string, cred: Cred): Promise<void> {
			throw new ErrnoError(Errno.EROFS);
		}

		public linkSync(srcpath: string, dstpath: string, cred: Cred): void {
			throw new ErrnoError(Errno.EROFS);
		}

		public async sync(path: string, data: Uint8Array, stats: Readonly<Stats>): Promise<void> {
			throw new ErrnoError(Errno.EROFS);
		}

		public syncSync(path: string, data: Uint8Array, stats: Readonly<Stats>): void {
			throw new ErrnoError(Errno.EROFS);
		}
	}
	return ReadonlyFS;
}
/* eslint-enable @typescript-eslint/require-await */