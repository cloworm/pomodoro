import '@testing-library/jest-dom/extend-expect'
import '@testing-library/jest-dom'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    // `useQueryParam` uses `asPath` and NOT `query`.
    // To set query params in a test: `asPath: '/?pattern=[a-z]&flags=gi'`
    asPath: '',
  })),
}))
