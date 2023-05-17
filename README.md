# Introduction 
This sample is designed for use in VsCode and includes source code for testing the web frontend using Playwright. It also uses the Allure reporter to report results 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1. Install node
2. Install npm
3. Install VsCode

### Documentation
If you want to learn more refer the following:
- [Playwright Official Docs](https://playwright.dev/docs/intro)

# Install Dependencies
On the commandline at the base of the project, perform 
_npm install_

# Verify Installation
From command line navigate to source project folder and perform
Run _npm run wdio_
NOTE: Make sure your browser is up-to-date.

# Check version of Playwright
To check your version of Cypress you can perform the following:
_npx playwright --version_ 

# Updating All Packages
Install the package update checker using this documentation [here](https://www.npmjs.com/package/npm-check-updates)

Run the following command to determine the difference between all package versions in package.json versus the latest out there:
_npx ncu_

Then to update all packages that have been identified, you can run the following to update your package.json:
_npx npm-check-updates -u_ 

Then run _npm install_ to install new versions from your package.json.

# Build and Test
1. From command line navigate to source project folder and perform.  The different ways to run tests can be found [here](https://playwright.dev/docs/running-tests).

## Run specific spec noninteractively
By default, tests will run in headless mode, unless you run the following command 
_npx playwright test_

## Run all tests interactively
By default, tests will run in headless mode, unless you run the following command 
_npx playwright test --headed_

Or using the commands from package.json

_npm run test_

## Run specific spec 
_npx playwright test tests/sample.spec.js_

## Run UI tests in debug mode
_npx playwright test --debug_ which will launch the Playwright Inspector for Debugging. 
More information [here](https://playwright.dev/docs/debug)
NOTE: You cannot debug API calls using Inspector.

## Run API tests in debug mode
Perform the following:
1. Modify package.json to include the command in the test script section
2. SHIFT + CNTRL + V for Windows and search for 'Debug npm script'
This will look at the script section in the package.json and debug your script

Similarly, you can use the Javascript debugger in the terminal.

## Run specific suite interactively
See documentation [here](https://webdriver.io/docs/organizingsuites/) or [here](https://playwright.dev/docs/api/class-suite)

_npx playwright test --suite <suiteName>_

## Run tests using a specific configuration
See documentation [here](https://webdriver.io/docs/organizingsuites/)
_npx playwright test --config <configuration file>_

## Run tests using a specific environment
See documentation when it comes to parameterized tests [here](https://playwright.dev/docs/test-parameterize)

This framework is already wired to running tests across environments in the _playwright.config.js_. You can make updates to the specific environment urls there. If you want to run tests against a specific environment, first set the corresponding environment (i.e., DEV, QA, STAGING). After, you can run the test
_$env:ENVIRONMENT='QA'_
_npx playwright test_

## Run tests using a specific browser (Cross Browser Testing)
By default, the _playwright.config.js_ file is wired to support running against chrome, firefox, and webkit through the projects node. If a project is not specified, it will run all projects or aka. all browsers in the project node.  If you want to run chrome project, for example:
_npx playwright test --project=<project name>_  

For example: _npx playwright test --project=chrome_  

Likewise, for firefox: _npx playwright test --project=firefox_  

## Serial and Parallelization
### Running Test files in parallel
By default test files are triggeed in parallel, but individual tests present in a file will run sequentially. By just running all tests, it will assign a worker for each spec test file in the targeted test directory.

So by default, playwright does support running tests in parallel. However, the number of workers can be controlled throught _workers_ flag in the _playwright.config.js_ file.  If this flag's value is set to '1,' you are disabling parallelization.  Ff nothing is set, by default it will the spec test files in parallel and for each test in that file in sequence. 

See more information on expanding your ability to run tests in parallel [here](https://playwright.dev/docs/test-parallel)

### Running Test in same file in parallel
You can simply apply configuration to the test.describe.  As seen below, this will run 3 workers in a parallel for the 3 tests in a given file.
```
test.describe.configure({mode: 'parallel'});
test("Test 1", async({page})=>
{

})

test("Test 2", async({page})=>
{

})

test("Test 3", async({page})=>
{

})

```
See more information on expanding your ability to run tests in parallel [here](https://playwright.dev/docs/test-parallel)

### Running Test in same file in serial mode
By specifying to run tests in serial mode, you can control what tests run based on order of precedence. As outlined below, if a test fails, it will skip the next test after it. However, this is not normally recommended. Each test should be interdependent from another.  There might be edge cases though.

```
test.describe.configure({mode: 'serial'});
test("Test 1", async({page})=>
{

})

test("Test 2", async({page})=>
{

})

test("Test 3", async({page})=>
{

})

```

## Tagging Tests (Running suites or test categories based on tags)
You can specify tags within the test title name using the '@' as seen below:
```
test("@smoke Test 1", async({page})=>
{

})
```
Then to run tests with that specific tag, for example you can perform from command line:
_npx playwright test --grep @smoke_

## Show last HTML report
_npx playwright show-report_


## Reducing flakiness on browser runs
It is recommended to run in headless mode, buy setting headless to true in the different project nodes in _playwright.config.js_

## Additional Reporters
See additional reporters [here](https://playwright.dev/docs/test-reporters)

## Getting Test Traces (Logs)

By default, it is turned on. However, you can turn it off by removing or setting the trace configuration value in your config to _off_.
```
use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'http://www.google.com',
     //browserName : 'chromium',
     screenshot: 'on',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

```
More Information [here](https://debbie.codes/blog/reports-tracing-tests-in-playwright/)

## Viewing Test Traces

Precondition: See above on how to generate trace files from tests.  You can set options in the playwright.config.js.

Perform the following:

1. Navigate to [Playright Trace Loader](trace.playrwight.dev)
2. Select zip file from your test-results directory

More information [here](https://playwright.dev/docs/trace-viewer)

## Getting Screenshots 

By default, it is turned on. However, you can turn it off by removing or setting the screenshot configuration value in your config to _off_.

```
use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'http://www.google.com',
     //browserName : 'chromium',
     screenshot: 'on',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

```
More information can be found [here](https://testersdock.com/playwright-screenshot-capture/)

## Code Development
### Codegen Tool
_npx playwright codegen <application url>_
More information [here](https://playwright.dev/docs/codegen)

### Development Documentation
 - General Test Development: [here](https://playwright.dev/docs/writing-tests)
 - API Testing: [here](https://playwright.dev/docs/test-api-testing)
 - Mock APIs: [here](https://playwright.dev/docs/mock)
 - Mock Browser APIs: [here](https://playwright.dev/docs/mock-browser-apis)
 - Intercepting Network Calls: [here](https://playwright.dev/docs/network)
 - Adding fixtures - [here](https://playwright.dev/docs/test-fixtures#:~:text=Playwright%20Test%20is%20based%20on,instead%20of%20their%20common%20setup.)
 - Parameterize tests - [here](https://playwright.dev/docs/test-parameterize)
 - Best Practices - [here](https://playwright.dev/docs/best-practices)
 - Test Configurations - [here](https://playwright.dev/docs/test-configuration) and [here](https://playwright.dev/docs/api/class-testconfig)
 - Page locator - [here](https://playwright.dev/docs/pages)
 - General locators - [here](https://playwright.dev/docs/locators)
 - Assertions - [here](https://playwright.dev/docs/test-assertions#list-of-assertions)
 - ViewPort Emulation - [here](https://playwright.dev/python/docs/emulation)
 - Retries - [here](https://playwright.dev/docs/test-retries)
 - Autowaiting - [here](https://playwright.dev/docs/actionability)
 - Screen shots - [here](https://playwright.dev/docs/screenshots)
 - Video - [here](https://playwright.dev/docs/videos)

 ### TypeScript Integration
 - TypeScript: [here](https://playwright.dev/docs/test-typescript)

## Integrating Visual Testing
Implement Visual Testing [here](https://playwright.dev/docs/test-snapshots)

# Contribute
If you would like to contribute to the source, please reach out to Director of Quality Engineering, Antwan Maddox,
or the Automation Team within the Quality Guild.
