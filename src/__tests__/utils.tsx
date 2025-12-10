import { ReactElement } from 'react';
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Re-export everything from testing-library
export * from '@testing-library/react';

// Define an extended render result that includes the user
interface CustomRenderResult extends RenderResult {
  user: ReturnType<typeof userEvent.setup>;
}

/**
 * Custom render function that wraps the component
 * and sets up userEvent.
 *
 * @param ui - The React component to render
 * @param options - Additional render options
 * @returns The render result with added user property for userEvent
 */
function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): CustomRenderResult {
  // Setup userEvent
  const user = userEvent.setup({ delay: null }); // Set delay to null for synchronous events in tests

  // Use RTL's render
  const renderResult = rtlRender(ui, options);

  // Return the render result with user added
  return {
    ...renderResult,
    user,
  };
}

// Override the render method
export { render };
