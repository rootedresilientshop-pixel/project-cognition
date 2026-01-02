import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { MemoryEngine } from './memoryEngine';

let memoryEngine: MemoryEngine;

function getDetailedErrorMessage(error: any): string {
	if (error instanceof Error) {
		return error.message;
	}
	return String(error);
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Project Cognition extension activated');

	// Initialize memory engine with workspace root (or empty string if none)
	const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || '';
	memoryEngine = new MemoryEngine(workspaceRoot);

	// Register commands
	context.subscriptions.push(
		vscode.commands.registerCommand('projectCognition.initProject', () => {
			initializeProject();
		}),
		vscode.commands.registerCommand('projectCognition.quickSetup', () => {
			quickSetup();
		}),
		vscode.commands.registerCommand('projectCognition.logFailure', () => {
			logFailure();
		}),
		vscode.commands.registerCommand('projectCognition.viewMemory', () => {
			viewMemory();
		}),
		vscode.commands.registerCommand('projectCognition.injectMemory', () => {
			injectMemory();
		})
	);

	// Show quick setup on first activation if no .cognition folder exists
	checkFirstRun();
}

function checkFirstRun() {
	const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
	if (!workspaceRoot) return;

	const cognitionPath = path.join(workspaceRoot, '.cognition');

	if (!fs.existsSync(cognitionPath)) {
		const message = 'Project Cognition: Set up project memory?';
		vscode.window.showInformationMessage(
			message,
			'Quick Setup',
			'Initialize Manually',
			'Not Now'
		).then(selection => {
			if (selection === 'Quick Setup') {
				quickSetup();
			} else if (selection === 'Initialize Manually') {
				initializeProject();
			}
		});
	}
}

async function quickSetup() {
	try {
		// Step 1: Project vision
		const vision = await vscode.window.showInputBox({
			title: 'Project Cognition Quick Setup - Step 1/3',
			placeHolder: 'e.g., "Automate D&D content generation"',
			prompt: 'What is your project vision? (1-2 sentences)',
			ignoreFocusOut: true
		});

		if (!vision) {
			vscode.window.showInformationMessage('Setup cancelled');
			return;
		}

		// Step 2: Key decisions
		const decisions = await vscode.window.showInputBox({
			title: 'Project Cognition Quick Setup - Step 2/3',
			placeHolder: 'e.g., "Use Claude API, SQLite for storage, monthly releases"',
			prompt: 'List 2-3 key architectural decisions (comma-separated)',
			ignoreFocusOut: true
		});

		if (!decisions) {
			vscode.window.showInformationMessage('Setup cancelled');
			return;
		}

		// Step 3: Confirm and create
		const choice = await vscode.window.showQuickPick(
			['Yes, create project memory', 'Cancel'],
			{ title: 'Project Cognition Quick Setup - Step 3/3', ignoreFocusOut: true }
		);

		if (choice !== 'Yes, create project memory') {
			vscode.window.showInformationMessage('Setup cancelled');
			return;
		}

		// Create the memory files
		await memoryEngine.initializeProjectMemory();

		// Format decisions
		const decisionLines = decisions.split(',').map((d, i) => {
			return `## Decision ${i + 1}: ${d.trim()}\n- **Chosen**: \n- **Rejected**: \n- **Rationale**: \n- **Status**: \n- **Date**: ${new Date().toISOString().split('T')[0]}\n`;
		}).join('\n');

		// Get workspace root to determine paths
		const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!workspaceRoot) {
			vscode.window.showErrorMessage('Workspace closed unexpectedly');
			return;
		}

		const cognitionDir = path.join(workspaceRoot, '.cognition');
		const intentPath = path.join(cognitionDir, 'intent.md');
		const decisionsPath = path.join(cognitionDir, 'decisions.md');

		// Update intent.md
		const intentContent = `# Project Intent\n\n## Vision\n${vision}\n`;
		fs.writeFileSync(intentPath, intentContent, 'utf-8');

		// Update decisions.md
		fs.writeFileSync(decisionsPath, `# Architectural Decisions\n\n${decisionLines}`, 'utf-8');

		vscode.window.showInformationMessage('✓ Project memory initialized! Edit .cognition/intent.md and .cognition/decisions.md to add details.');

		// Open intent.md for editing
		const doc = await vscode.workspace.openTextDocument(intentPath);
		await vscode.window.showTextDocument(doc);

	} catch (error) {
		vscode.window.showErrorMessage(`Setup failed: ${getDetailedErrorMessage(error)}`);
	}
}

async function initializeProject() {
	try {
		const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!workspaceRoot) {
			vscode.window.showErrorMessage('Project Cognition requires an open workspace folder. Use File → Open Folder first.');
			return;
		}

		await memoryEngine.initializeProjectMemory();
		vscode.window.showInformationMessage('✓ Project Cognition initialized! Edit .cognition/intent.md and .cognition/decisions.md');
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to initialize: ${getDetailedErrorMessage(error)}`);
	}
}

async function logFailure() {
	try {
		const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
		if (!workspaceRoot) {
			vscode.window.showErrorMessage('Project Cognition requires an open workspace folder. Use File → Open Folder first.');
			return;
		}

		const problem = await vscode.window.showInputBox({
			placeHolder: 'What problem are you debugging?',
			prompt: 'Problem description',
			ignoreFocusOut: true
		});

		if (!problem) return;

		const approach = await vscode.window.showInputBox({
			placeHolder: 'What did you try?',
			prompt: 'Your attempted approach',
			ignoreFocusOut: true
		});

		if (!approach) return;

		const result = await vscode.window.showInputBox({
			placeHolder: 'What happened?',
			prompt: 'Result of your attempt',
			ignoreFocusOut: true
		});

		if (!result) return;

		const nextSteps = await vscode.window.showInputBox({
			placeHolder: 'What to try next',
			prompt: 'Next steps (optional)',
			ignoreFocusOut: true
		});

		await memoryEngine.logFailure({
			problem,
			approach,
			result,
			nextSteps: nextSteps || ''
		});

		vscode.window.showInformationMessage('✓ Failure logged to project memory');
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to log attempt: ${getDetailedErrorMessage(error)}`);
	}
}

async function viewMemory() {
	try {
		const memory = await memoryEngine.getProjectMemory();

		// Build memory display
		let content = '# Project Memory\n\n';

		if (memory.intent.trim()) {
			content += '## Project Intent\n';
			content += memory.intent + '\n\n';
		}

		if (memory.decisions.trim()) {
			content += '## Architectural Decisions\n';
			content += memory.decisions + '\n\n';
		}

		if (memory.recentFailures.length > 0) {
			content += '## Recent Failed Attempts\n\n';
			memory.recentFailures.forEach(failure => {
				content += `### ${failure.filename}\n`;
				content += failure.content + '\n\n';
			});
		} else {
			content += '## Recent Failed Attempts\n\n';
			content += '*(No failed attempts logged yet)*\n\n';
		}

		const doc = await vscode.workspace.openTextDocument({
			language: 'markdown',
			content: content
		});
		await vscode.window.showTextDocument(doc);
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to view memory: ${getDetailedErrorMessage(error)}`);
	}
}

async function injectMemory() {
	try {
		const injection = await memoryEngine.generateMemoryInjection();
		await vscode.env.clipboard.writeText(injection);
		vscode.window.showInformationMessage('✓ Memory injected to clipboard! Paste into your AI tool prompt.');
	} catch (error) {
		vscode.window.showErrorMessage(`Failed to inject memory: ${getDetailedErrorMessage(error)}`);
	}
}

export function deactivate() {}
