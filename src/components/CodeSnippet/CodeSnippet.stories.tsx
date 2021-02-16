import React from 'react';
import { Story } from '@storybook/react/types-6-0';
import { CodeSnippet, CodeSnippetProps } from '.';

export default {
  title: 'ZeroHeight/CodeSnippet',
  component: CodeSnippet,
};

const exampleCode = `
import React, { useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
`.trim();

const Template: Story<CodeSnippetProps> = (args) => <CodeSnippet {...args}>{exampleCode}</CodeSnippet>;

export const Basic = Template.bind({});
Basic.args = {
  className: 'jsx',
};

export const NoLineNumbers = Template.bind({});
NoLineNumbers.args = {
  lineNumbers: false,
  className: 'jsx',
  theme: 'light',
};

export const Partial = Template.bind({});
Partial.args = {
  className: 'jsx',
  start: 2,
  end: 6,
};

const InlineTemplate: Story<CodeSnippetProps> = (args) => (
  <>
    {' '}
    Test <CodeSnippet {...args}>Inline Code</CodeSnippet>{' '}
  </>
);
export const Inline = InlineTemplate.bind({});
Inline.args = {
  className: 'jsx',
  inline: true,
};
