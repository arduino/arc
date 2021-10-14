import React from 'react';
import { action } from '@storybook/addon-actions';
import { OverlayProvider } from 'react-aria';

import { SupportForm, SupportFormPropsInterface, FormConfigInterface } from './SupportForm';
import { ConfigFieldInterface } from './SupportField';
import { Story } from '@storybook/react';
import mdx from './SupportForm.mdx';

const Template: Story<SupportFormPropsInterface> = (args) => (
  <OverlayProvider>
    <SupportForm {...args}>Label</SupportForm>
  </OverlayProvider>
);

export default {
  title: 'Form/Support',
  component: SupportForm,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const config: FormConfigInterface = {
  title: 'TEST - CONTACT US',
  // footer: <div>Footer</div>,
  inlineSubmit: true,
  mustBeConfirmed: true,
  onSubmissionMessage: 'Thanks for your feedback\n\nYou can enter another request',
  // endpoint: "https://support-api.oniudra.cc/v1/tickets",
  tags: ['just-static-tags'],
  reCaptchaKey: '**REMOVED**',
  fields: [
    [{ id: 'hr1', type: 'hr-line' }],
    // [
    //   {
    //     id: 'step1',
    //     type: 'empty',
    //     children: (
    //       <span>
    //         Part 1 of 4: <strong>Tell us more about yourself</strong>
    //       </span>
    //     ),
    //   },
    // ],
    [
      {
        id: 'phone',
        type: 'phone',
        label: 'Phone',
        placeholder: 'Enter phone',
        attachToBody: true,
        required: true,
        helperText: 'Help Text',
      },
    ],
    [
      {
        id: 'address',
        type: 'address',
        label: 'Address',
        placeholder: 'Enter address',
        attachToBody: true,
        required: true,
      },
    ],
    [
      {
        id: 'inquiry-type',
        label: 'Inquiry Type',
        attachToBody: true,
        type: 'select',
        helperText: 'Help Text',
        placeholder: 'Select an Inquiry type',
        values: [
          { value: 'assistance', tags: ['assistance'] },
          { value: 'info', tags: ['info'] },
          { value: 'other', tags: ['other'], infoMsg: 'Other is Selected. You can Use [Links](www.example.com) Here' },
        ],
        required: true,
      },
    ],
    [
      {
        id: 'product',
        label: 'Product (uses select labels)',
        attachToBody: true,
        type: 'select',
        isMulti: true,
        placeholder: 'Select a Product',
        values: [
          { label: 'Product A', value: 'product a', tags: ['product-a'] },
          { label: 'Product B', value: 'product b', tags: ['product-b'] },
          { label: 'Product Other', value: 'other', tags: ['other-product'] },
        ],
        required: false,
        helperText: 'Help Text',
      },
      {
        id: 'sub-product-empty',
        type: 'empty',
        showOnParentField: [
          {
            parentFieldId: 'product',
            parentFieldValue: '',
          },
        ],
      },
      {
        id: 'sub-product-a',
        label: 'Conditional Product selection (Product a)',
        values: [
          { value: 'product a - assistance', tags: ['assistance'] },
          { value: 'product a - request info', tags: ['info'] },
        ],
        type: 'select',
        required: true,
        showOnParentField: [
          {
            parentFieldId: 'product',
            parentFieldValue: 'product a',
          },
        ],
      },
      {
        id: 'sub-product-b',
        label: 'Conditional Product selection (Product b)',
        values: [
          { value: 'product b - assistance', tags: ['assistance'] },
          { value: 'product b - request info', tags: ['info'] },
        ],
        type: 'select',
        required: true,
        showOnParentField: [
          {
            parentFieldId: 'product',
            parentFieldValue: 'product b',
          },
        ],
      },
      {
        id: 'sub-other',
        label: 'Conditional free text (Product Other)',
        type: 'input',
        required: false,
        showOnParentField: [
          {
            parentFieldId: 'product',
            parentFieldValue: 'other',
          },
        ],
      },
    ],

    [
      {
        id: 'multiple-parents',
        label: 'Conditional field from multiple parents',
        type: 'input',
        required: true,
        showOnParentField: [
          {
            parentFieldId: 'inquiry-type',
            parentFieldValue: 'info',
          },
          {
            parentFieldId: 'product',
            parentFieldValue: 'other',
          },
          {
            parentFieldId: 'sub-product-a',
            parentFieldValue: 'product a - request info',
          },
          {
            parentFieldId: 'sub-product-b',
            parentFieldValue: 'product b - request info',
          },
        ],
      },
    ],
    [
      {
        id: 'body',
        label: 'Request',
        placeholder: 'Enter Request Message',
        type: 'textarea',
        required: true,
      },
    ],
    [
      {
        id: 'checkbox-group',
        label: 'Checkbox Group',
        type: 'checkboxgroup',
        helperText: 'Help Text',
        values: [
          { value: 'cb1', label: 'cb1', tags: ['cb1'] },
          { value: 'cb2', label: 'cb2', tags: ['cb2'] },
          { value: 'cb3', label: 'cb3', tags: ['cb3'] },
        ],
        required: true,
      },

      {
        id: 'radio-group',
        label: 'Radio Group',
        type: 'radiogroup',
        values: [
          { value: 'radio1', label: 'radio1', tags: ['radio1'] },
          { value: 'radio2', label: 'radio2', tags: ['radio2'] },
        ],
        required: true,
      },
    ],
    [
      {
        id: 'tos',
        label: '[Terms](http://example.com) and [Conditions](http://example.com)',
        type: 'checkbox',
        required: true,
      },
    ],
  ],
};

export const Basic = Template.bind({});
Basic.args = {
  onSubmit: action('onChange'),
  className: 'custom-class',
  config,
};

const subjectOverride: ConfigFieldInterface = {
  id: 'subject',
  type: 'input',
  generateFn: (form) => {
    return `Auto Subject - ${form.name} / ${form.email} - ${form['inquiry-type']}`;
  },
};

// add a subject field to override the default one
const configAutoSubject = { ...config, fields: [[subjectOverride], ...config.fields] };

export const AutoSubject = Template.bind({});
AutoSubject.args = {
  ...Basic.args,
  config: configAutoSubject,
};

const arduinoDaySubmitConfig = {
  title: 'Event Submission',
  inlineSubmit: true,
  onSubmissionMessage: 'Event registered.\n\nYou will receive an email as soon as we approve it!',
  tags: [],
  reCaptchaKey: '**REMOVED**',
  mustBeConfirmed: false,
  onSubmit: (values) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { subject, empty, organizer, organization, event, location, ...valuesToSend } = values;

    valuesToSend.location = location.address;
    valuesToSend.lat = location.lat;
    valuesToSend.lng = location.lng;
    valuesToSend['activity-list'] = valuesToSend['activity-list'].join('|');
    console.log(valuesToSend);

    return fetch('https://hooks.zapier.com/hooks/catch/9381837/oxsobcu/', {
      method: 'POST',
      body: JSON.stringify(valuesToSend),
    });
  },
  fields: [
    [
      {
        id: 'subject',
        type: 'input',
        generateFn: () => {
          return ``;
        },
      },
    ],
    [
      {
        id: 'organizer',
        type: 'empty',
        children: <strong>Organizer Info</strong>,
      },
    ],
    [
      {
        id: 'name',
        type: 'input',
        label: 'Organizer Full Name',
        placeholder: 'Full Name of the Organizer',
        attachToBody: false,
        required: true,
      },
      {
        id: 'email',
        type: 'email',
        label: 'Organizer Email',
        placeholder: 'Email of the Organizer',
        attachToBody: false,
        required: true,
      },
    ],
    [
      {
        id: 'phone',
        type: 'phone',
        label: 'Organizer Phone Number',
        placeholder: 'Enter phone',
        attachToBody: false,
        required: true,
      },
    ],
    [
      {
        id: 'organization',
        type: 'empty',
        children: <strong>Organization Info</strong>,
      },
    ],
    [
      {
        id: 'organization-name',
        type: 'input',
        label: 'Organization Name',
        placeholder: 'Name of the Organization',
        attachToBody: false,
        required: true,
      },
      {
        id: 'organizer-type',
        label: 'Type of Organization',
        placeholder: 'Select a Type',
        type: 'select',
        isMulti: false,
        values: [
          { value: 'edu', label: 'Classroom, School, School District, University, Library', tags: [] },
          { value: 'fablab', label: 'Fablab or Makerspace', tags: [] },
          { value: 'club', label: 'After-school club, Code club, Meetup', tags: [] },
          { value: 'foundation', label: 'Museum, organization, foundation', tags: [] },
          { value: 'profit', label: 'Arduino distributor, reseller, store', tags: [] },
          { value: 'other', label: 'Other', tags: [] },
        ],
        attachToBody: false,
        required: true,
      },
    ],
    [
      {
        id: 'online-event',
        type: 'checkbox',
        label: 'Online Event',
        attachToBody: false,
        required: false,
      },
    ],
    [
      {
        id: 'organization-url',
        type: 'input',
        label: 'Organization URL',
        placeholder: 'URL of the Organization',
        attachToBody: false,
        required: false,
        showOnParentField: [
          {
            parentFieldId: 'online-event',
            parentFieldValue: '',
          },
        ],
      },
    ],
    [
      {
        id: 'event',
        type: 'empty',
        children: <strong>Event Info</strong>,
      },
    ],
    [
      {
        id: 'event-name',
        type: 'input',
        label: 'Event Name',
        placeholder: 'Name of the Event',
        attachToBody: false,
        required: true,
      },
      {
        id: 'event-url',
        type: 'input',
        label: 'Event Url',
        placeholder: 'URL of the Event',
        attachToBody: false,
        required: false,
      },
    ],
    [
      {
        id: 'location',
        type: 'address',
        label: 'Event Location',
        placeholder: 'Location of the Event',
        attachToBody: false,
        required: true,
      },
    ],
    [
      {
        id: 'activity-list',
        label: 'Activity List',
        placeholder: 'Select the Activities',
        type: 'select',
        isMulti: true,
        values: [
          { value: 'open_day', label: 'Open Day', tags: [] },
          { value: 'show_and_tell', label: 'Show-and-Tell', tags: [] },
          { value: 'workshop', label: 'Workshop and Live Demo', tags: [] },
          { value: 'talk', label: 'Talk', tags: [] },
          { value: 'ask_expert', label: 'Ask the Arduino Expert', tags: [] },
          { value: 'hackathon', label: 'Hackathon', tags: [] },
        ],
        attachToBody: false,
        required: true,
      },
    ],
    [
      {
        id: 'agenda-link',
        type: 'input',
        label: 'Online Agenda Link',
        placeholder: 'Link to Agenda URI',
        attachToBody: false,
        required: false,
      },
    ],
    [
      {
        id: 'empty',
        type: 'empty',
      },
    ],
  ],
};
export const ArduinoDay = Template.bind({});
ArduinoDay.args = {
  ...Basic.args,
  config: arduinoDaySubmitConfig,
};
