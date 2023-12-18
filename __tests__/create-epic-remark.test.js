const { execSync } = require('child_process');

describe('create-epic-remark CLI', () => {
  it('should display the help information', () => {
    const output = execSync('node ./index.js --help').toString();
    expect(output).toContain('Usage:');
    expect(output).toContain('--example <type>');
  });

  it('should display an error if no example is specified', () => {
    try {
      execSync('node ./index.js --example');
    } catch (error) {
      const errorOutput = error.stderr.toString();
      expect(errorOutput).toContain("error: option '--example <type>' argument missing");
    }
  });

  it('should display an error for an invalid example argument', () => {
    try {
      execSync('node ./index.js --example invalidExample');
    } catch (error) {
      const errorOutput = error.stderr.toString();
      expect(errorOutput).toContain("Invalid example: 'invalidExample'. Valid examples are");
    }
  });

  it('should display the version information', () => {
    const output = execSync('node ./index.js --version').toString();
    expect(output.trim()).toBe('0.1.5');
  });

  it('should display an error for an invalid flag', () => {
    try {
      execSync('node ./index.js --invalidFlag');
    } catch (error) {
      const errorOutput = error.stderr.toString();
      expect(errorOutput).toContain("error: unknown option '--invalidFlag'");
    }
  });
});
