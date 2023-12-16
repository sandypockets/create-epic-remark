const { execSync } = require('child_process');

describe('create-epic-remark CLI', () => {
  it('should display the help information', () => {
    const output = execSync('node ./index.js --help').toString();
    expect(output).toContain('Usage:');
    expect(output).toContain('--example <type>');
  });

  it('should display an error if no example is specified', () => {
    try {
      execSync('node ./index.js');
    } catch (error) {
      const errorOutput = error.stderr.toString();
      expect(errorOutput).toContain('Please specify an example to scaffold.');
    }
  });

  it('should display an error for an invalid example argument', () => {
    try {
      execSync('node ./index.js --example invalidExample');
    } catch (error) {
      const errorOutput = error.stderr.toString();
      expect(errorOutput).toContain("Example 'invalidExample' not found.");
    }
  });

  // Uncomment when epic-remark is public
  // it('should successfully create a project for a valid example', () => {
  //   const validExample = 'next-tailwind';
  //   execSync(`node ./index.js --example ${validExample}`);
  //   const projectDir = './my-epic-remark-project';
  //   expect(fs.existsSync(projectDir)).toBe(true);
  //
  //   fs.rmdirSync(projectDir, { recursive: true });
  // });
});
