import '@testing-library/jest-dom';
jest.mock('lucide-react', () =>
    new Proxy({}, {
      get: () => ({ className, ...rest }) =>
        <svg data-testid="trend-icon" className={className} {...rest} />,
    }),
  );
  