import * as fs from 'fs';
import * as path from 'path';
import { MemoryEngine } from './memoryEngine';

// Simple assertion helpers
function assert(condition: boolean, message: string) {
	if (!condition) {
		throw new Error(`Assertion failed: ${message}`);
	}
}

function assertEquals(actual: any, expected: any, message: string) {
	if (actual !== expected) {
		throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`);
	}
}

// Test suite
const testDir = path.join(__dirname, '..', 'test-memory');

async function runTests() {
	console.log('Running Memory Engine Tests...\n');

	let passed = 0;
	let failed = 0;

	try {
		// Test 1: Initialize project memory creates correct files
		console.log('Test 1: Initialize creates correct directory structure');
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true });
		}
		fs.mkdirSync(testDir, { recursive: true });

		const engine = new MemoryEngine(testDir);
		await engine.initializeProjectMemory();

		assert(fs.existsSync(path.join(testDir, '.cognition')), 'cognition dir created');
		assert(fs.existsSync(path.join(testDir, '.cognition', 'intent.md')), 'intent.md created');
		assert(fs.existsSync(path.join(testDir, '.cognition', 'decisions.md')), 'decisions.md created');
		assert(fs.existsSync(path.join(testDir, '.cognition', 'config.json')), 'config.json created');
		assert(fs.existsSync(path.join(testDir, '.cognition', 'failures')), 'failures dir created');

		console.log('✓ Passed\n');
		passed++;
	} catch (e) {
		console.log(`✗ Failed: ${(e as Error).message}\n`);
		failed++;
	}

	try {
		// Test 2: Log failure creates properly formatted file
		console.log('Test 2: Log failure creates properly formatted file');
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true });
		}
		fs.mkdirSync(testDir, { recursive: true });

		const engine = new MemoryEngine(testDir);
		await engine.initializeProjectMemory();

		await engine.logFailure({
			problem: 'Memory leak issue',
			approach: 'Used weak references',
			result: 'Did not work',
			nextSteps: 'Check event listener cleanup'
		});

		const failures = fs.readdirSync(path.join(testDir, '.cognition', 'failures'))
			.filter(f => f.endsWith('.md') && f !== 'README.md');

		assert(failures.length === 1, `Expected 1 failure file, got ${failures.length}`);

		const failureContent = fs.readFileSync(
			path.join(testDir, '.cognition', 'failures', failures[0]),
			'utf-8'
		);

		assert(failureContent.includes('Memory leak issue'), 'Problem included in failure');
		assert(failureContent.includes('Lesson for AI'), 'Lesson section included');
		assert(failureContent.includes('date:'), 'Date field included in YAML frontmatter');

		console.log('✓ Passed\n');
		passed++;
	} catch (e) {
		console.log(`✗ Failed: ${(e as Error).message}\n`);
		failed++;
	}

	try {
		// Test 3: Get project memory returns correct structure
		console.log('Test 3: Get project memory returns correct structure');
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true });
		}
		fs.mkdirSync(testDir, { recursive: true });

		const engine = new MemoryEngine(testDir);
		await engine.initializeProjectMemory();

		const memory = await engine.getProjectMemory();

		assert(memory.intent !== undefined, 'intent property exists');
		assert(memory.decisions !== undefined, 'decisions property exists');
		assert(Array.isArray(memory.recentFailures), 'recentFailures is array');
		assert(memory.config !== undefined, 'config property exists');

		console.log('✓ Passed\n');
		passed++;
	} catch (e) {
		console.log(`✗ Failed: ${(e as Error).message}\n`);
		failed++;
	}

	try {
		// Test 4: Generate memory injection formats correctly
		console.log('Test 4: Generate memory injection formats correctly');
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true });
		}
		fs.mkdirSync(testDir, { recursive: true });

		const engine = new MemoryEngine(testDir);
		await engine.initializeProjectMemory();

		// Add some content
		const intentPath = path.join(testDir, '.cognition', 'intent.md');
		fs.writeFileSync(
			intentPath,
			`# Project Intent\n\n## Core Vision\nBuild a test project`
		);

		const injection = await engine.generateMemoryInjection();

		assert(injection.includes('[PROJECT COGNITION - MEMORY INJECTION]'), 'Header included');
		assert(injection.includes('## Project Context'), 'Context section included');
		assert(injection.includes('Build a test project'), 'Intent content included');
		assert(injection.includes('Now, here\'s the actual question:'), 'Prompt section included');

		console.log('✓ Passed\n');
		passed++;
	} catch (e) {
		console.log(`✗ Failed: ${(e as Error).message}\n`);
		failed++;
	}

	try {
		// Test 5: Multiple failures return most recent ones
		console.log('Test 5: Multiple failures return most recent ones');
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true });
		}
		fs.mkdirSync(testDir, { recursive: true });

		const engine = new MemoryEngine(testDir);
		await engine.initializeProjectMemory();

		// Add 5 failures
		for (let i = 0; i < 5; i++) {
			await engine.logFailure({
				problem: `Problem ${i}`,
				approach: `Approach ${i}`,
				result: `Result ${i}`,
				nextSteps: `Next ${i}`
			});
			// Small delay to ensure different timestamps
			await new Promise(r => setTimeout(r, 10));
		}

		const memory = await engine.getProjectMemory();
		assert(memory.recentFailures.length === 5, `Expected 5 recent failures, got ${memory.recentFailures.length}`);

		console.log('✓ Passed\n');
		passed++;
	} catch (e) {
		console.log(`✗ Failed: ${(e as Error).message}\n`);
		failed++;
	}

	try {
		// Test 6: Config file is read correctly
		console.log('Test 6: Config file is read correctly');
		if (fs.existsSync(testDir)) {
			fs.rmSync(testDir, { recursive: true });
		}
		fs.mkdirSync(testDir, { recursive: true });

		const engine = new MemoryEngine(testDir);
		await engine.initializeProjectMemory();

		const memory = await engine.getProjectMemory();

		assertEquals(memory.config.version, '1.0', 'Config version correct');
		assert(memory.config.createdAt !== undefined, 'createdAt timestamp exists');
		assertEquals(memory.config.maxRecentFailures, 10, 'Default maxRecentFailures is 10');

		console.log('✓ Passed\n');
		passed++;
	} catch (e) {
		console.log(`✗ Failed: ${(e as Error).message}\n`);
		failed++;
	}

	// Cleanup
	if (fs.existsSync(testDir)) {
		fs.rmSync(testDir, { recursive: true });
	}

	console.log(`\n${'='.repeat(50)}`);
	console.log(`Tests Passed: ${passed}`);
	console.log(`Tests Failed: ${failed}`);
	console.log(`${'='.repeat(50)}`);

	if (failed > 0) {
		process.exit(1);
	}
}

// Run tests
runTests().catch(console.error);
