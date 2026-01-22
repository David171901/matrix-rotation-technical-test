/// <reference types="vitest/globals" />
import '@testing-library/jest-dom'

import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'vitest' {
  interface Assertion<T = unknown> extends TestingLibraryMatchers<T, void> {
    _testingLibraryMatchers?: never
  }
  interface AsymmetricMatchersContaining extends TestingLibraryMatchers<unknown, void> {
    _testingLibraryMatchers?: never
  }
}
