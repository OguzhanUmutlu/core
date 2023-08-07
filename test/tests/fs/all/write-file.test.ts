import { backends, fs, configure } from '../../../common';
import * as path from 'path';
import common from '../../../common';
import { promisify } from 'node:util';
import { jest } from '@jest/globals';

const s =
	'南越国是前203年至前111年存在于岭南地区的一个国家，国都位于番禺，疆域包括今天中国的广东、广西两省区的大部份地区，福建省、湖南、贵州、云南的一小部份地区和越南的北部。南越国是秦朝灭亡后，由南海郡尉赵佗于前203年起兵兼并桂林郡和象郡后建立。前196年和前179年，南越国曾先后两次名义上臣属于西汉，成为西汉的“外臣”。前112年，南越国末代君主赵建德与西汉发生战争，被汉武帝于前111年所灭。南越国共存在93年，历经五代君主。南越国是岭南地区的第一个有记载的政权国家，采用封建制和郡县制并存的制度，它的建立保证了秦末乱世岭南地区社会秩序的稳定，有效的改善了岭南地区落后的政治、经济现状。\n';

describe.each(backends)('%s File Writing with Read and Write', (name, options) => {
	const configured = configure({ fs: name, options });

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('should write and read file with specified content', async () => {
		await configured;

		if (fs.getRootFS().isReadOnly()) {
			return;
		}

		const join = path.join;
		const filename = join(common.tmpDir, 'test.txt');
		await promisify<string, string, void>(fs.writeFile)(filename, s);
		const buffer = await promisify(fs.readFile);
		filename;
		const expected = Buffer.byteLength(s);
		expect(expected).toBe(buffer.length);

		await promisify(fs.unlink)(filename);
	});

	it('should write and read file using buffer', async () => {
		await configured;

		if (fs.getRootFS().isReadOnly()) {
			return;
		}

		const join = path.join;
		const filename = join(common.tmpDir, 'test2.txt');

		const buf = Buffer.from(s, 'utf8');

		await promisify<string, Buffer, void>(fs.writeFile)(filename, buf);
		const buffer = await promisify(fs.readFile);
		filename;
		expect(buf.length).toBe(buffer.length);

		await promisify(fs.unlink)(filename);
	});
});
