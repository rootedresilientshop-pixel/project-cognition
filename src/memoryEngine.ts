import * as fs from 'fs';
import * as path from 'path';

export interface FailureLog {
	problem: string;
	approach: string;
	result: string;
	nextSteps: string;
}

export interface ProjectMemory {
	intent: string;
	decisions: string;
	recentFailures: Array<{
		filename: string;
		content: string;
		lesson?: string;
	}>;
	config: Record<string, any>;
}

export class MemoryEngine {
	private memoryDir: string;
	private failuresDir: string;
	private intentFile: string;
	private decisionsFile: string;
	private configFile: string;

	constructor(workspaceRoot: string) {
		this.memoryDir = path.join(workspaceRoot, '.cognition');
		this.failuresDir = path.join(this.memoryDir, 'failures');
		this.intentFile = path.join(this.memoryDir, 'intent.md');
		this.decisionsFile = path.join(this.memoryDir, 'decisions.md');
		this.configFile = path.join(this.memoryDir, 'config.json');
	}

	async initializeProjectMemory(): Promise<void> {
		// Create directories
		if (!fs.existsSync(this.memoryDir)) {
			fs.mkdirSync(this.memoryDir, { recursive: true });
		}
		if (!fs.existsSync(this.failuresDir)) {
			fs.mkdirSync(this.failuresDir, { recursive: true });
		}

		// Create intent.md template
		if (!fs.existsSync(this.intentFile)) {
			const intentTemplate = `---
version: 1.0
last_updated: ${new Date().toISOString().split('T')[0]}
---

# Project Intent

## Core Vision
*Describe in one sentence what this project does and why it exists*

## Key Goals
- *Goal 1: What you're trying to achieve*
- *Goal 2: Another objective*
- *Goal 3: Optional third goal*

## Technology Stack
- **Language**: *TypeScript/Python/etc*
- **Framework**: *Next.js/FastAPI/etc*
- **Database**: *PostgreSQL/MongoDB/etc*

## Core Architecture Decision
*Explain why you chose THIS architecture over alternatives*

## Non-Negotiable Constraints
- *Constraint 1: Why this is non-negotiable*
- *Constraint 2: Why this is non-negotiable*
`;
			fs.writeFileSync(this.intentFile, intentTemplate, 'utf-8');
		}

		// Create decisions.md template
		if (!fs.existsSync(this.decisionsFile)) {
			const decisionsTemplate = `# Architectural Decisions

## Decision: [Decision Name]
- **Chosen**: [What approach you selected]
- **Rejected**: [Alternatives you considered]
- **Rationale**: [Why you chose the selected approach]
- **Date**: YYYY-MM-DD
- **Status**: Final

---

## Decision Template

When adding a new decision, use this format:

\`\`\`markdown
## Decision: [Clear, specific name]
- **Chosen**: [Specific technology/approach]
- **Rejected**: [Alternatives you considered]
- **Rationale**: [Why. Focus on tradeoffs.]
- **Date**: YYYY-MM-DD
- **Status**: Final | Revisitable | Deprecated
\`\`\`
`;
			fs.writeFileSync(this.decisionsFile, decisionsTemplate, 'utf-8');
		}

		// Create failures README
		if (!fs.existsSync(path.join(this.failuresDir, 'README.md'))) {
			const failuresReadme = `# Failed Attempts Log

Log debugging attempts that took >15 minutes or had surprising root causes.

See main docs for format and guidance.
`;
			fs.writeFileSync(path.join(this.failuresDir, 'README.md'), failuresReadme, 'utf-8');
		}

		// Create config file
		if (!fs.existsSync(this.configFile)) {
			const config = {
				version: '1.0',
				createdAt: new Date().toISOString(),
				memoryFormat: 'markdown',
				failureTracking: true,
				autoInject: true,
				maxRecentFailures: 10,
				enablePreflightChecks: true
			};
			fs.writeFileSync(this.configFile, JSON.stringify(config, null, 2), 'utf-8');
		}
	}

	async logFailure(failure: FailureLog): Promise<void> {
		const timestamp = new Date().toISOString();
		const sanitizedTimestamp = timestamp.replace(/[:.]/g, '-');
		const filename = `${sanitizedTimestamp}.md`;
		const filepath = path.join(this.failuresDir, filename);

		const content = `---
date: ${timestamp}
problem: "${failure.problem}"
---

# Failed Attempt

## Problem
${failure.problem}

## What We Tried
${failure.approach}

## Result
${failure.result}

## Lesson for AI
${failure.nextSteps || '(Learning still being processed)'}
`;

		fs.writeFileSync(filepath, content, 'utf-8');
	}

	async getProjectMemory(): Promise<ProjectMemory> {
		const intent = this.readFileOrEmpty(this.intentFile);
		const decisions = this.readFileOrEmpty(this.decisionsFile);
		const config = this.readConfig();
		const recentFailures = this.getRecentFailures(config.maxRecentFailures || 10);

		return {
			intent,
			decisions,
			recentFailures,
			config
		};
	}

	async generateMemoryInjection(): Promise<string> {
		const memory = await this.getProjectMemory();
		const lines: string[] = [];

		lines.push('[PROJECT COGNITION - MEMORY INJECTION]');
		lines.push('');

		if (memory.intent.trim()) {
			lines.push('## Project Context');
			lines.push(memory.intent);
			lines.push('');
		}

		if (memory.decisions.trim()) {
			lines.push('## Key Decisions (Non-Negotiable)');
			// Extract decision summaries
			const decisions = this.extractDecisionSummaries(memory.decisions);
			if (decisions.length > 0) {
				decisions.forEach(d => lines.push(`- ${d}`));
			}
			lines.push('');
		}

		if (memory.recentFailures.length > 0) {
			lines.push('## Known Failures (Don\'t Repeat)');
			memory.recentFailures.forEach(failure => {
				const lesson = this.extractLessonFromFailure(failure.content);
				const basename = path.basename(failure.filename, '.md');
				if (lesson) {
					lines.push(`- **${basename}**: ${lesson}`);
				}
			});
			lines.push('');
		}

		lines.push('---');
		lines.push('');
		lines.push('Now, here\'s the actual question:');
		lines.push('');

		return lines.join('\n');
	}

	private extractDecisionSummaries(decisionsContent: string): string[] {
		const summaries: string[] = [];
		const decisionBlocks = decisionsContent.split(/## Decision:/);

		decisionBlocks.forEach(block => {
			if (!block.trim()) return;

			const lines = block.split('\n');
			const name = lines[0].trim();
			let chosen = '';
			let rejected = '';
			let rationale = '';

			lines.forEach(line => {
				if (line.includes('**Chosen**')) {
					chosen = line.split('**Chosen**')[1]?.split('-')[0]?.trim() || '';
				} else if (line.includes('**Rejected**')) {
					rejected = line.split('**Rejected**')[1]?.trim() || '';
				} else if (line.includes('**Rationale**')) {
					rationale = line.split('**Rationale**')[1]?.trim() || '';
				}
			});

			if (name && chosen) {
				const summary = `**${name}**: Using ${chosen} (not ${rejected}) because ${rationale}`;
				summaries.push(summary);
			}
		});

		return summaries;
	}

	private extractLessonFromFailure(failureContent: string): string {
		const lessonMatch = failureContent.match(/## Lesson for AI\n(.*?)(?:\n##|$)/s);
		if (lessonMatch && lessonMatch[1]) {
			return lessonMatch[1].trim().split('\n')[0];
		}
		return '';
	}

	private getRecentFailures(max: number): Array<{ filename: string; content: string }> {
		if (!fs.existsSync(this.failuresDir)) {
			return [];
		}

		const files = fs.readdirSync(this.failuresDir)
			.filter(f => f.endsWith('.md') && f !== 'README.md')
			.sort()
			.reverse()
			.slice(0, max);

		return files.map(filename => ({
			filename,
			content: fs.readFileSync(path.join(this.failuresDir, filename), 'utf-8')
		}));
	}

	private readFileOrEmpty(filePath: string): string {
		return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
	}

	private readConfig(): Record<string, any> {
		if (!fs.existsSync(this.configFile)) {
			return { maxRecentFailures: 10 };
		}
		try {
			return JSON.parse(fs.readFileSync(this.configFile, 'utf-8'));
		} catch {
			return { maxRecentFailures: 10 };
		}
	}
}
