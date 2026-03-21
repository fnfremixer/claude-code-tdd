# Acceptance Checklist

Go through each item, explicitly confirm each one in the chat.

1. Do tests cover ALL levels of abstraction? (not just the lowest layer)
2. Have you read the code of every test? Do asserts check real values?
3. Are mocks only at the HTTP boundary?
4. Were failing tests fixed by changing code, not tests?
5. If there was a new mock or change to an existing mock of a third-party API — study the real API behavior through its library or by calling it directly if no library exists.
6. Trace EVERY changed/created test through the real src/ code. For each test: walk line by line through the real code, make sure mock objects support the execution path and real logic actually runs rather than being intercepted earlier. Zero failures with mass changes is a red flag requiring special attention.
7. E2E tests with real external services (OpenAI, etc.): if `test/e2e/` has tests with `skipIf` — you MUST run them with real keys from `.env` before acceptance. A skipped E2E test = an unverified API contract. The step is NOT accepted until E2E tests are green.
