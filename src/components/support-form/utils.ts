import 'whatwg-fetch';
import * as Yup from 'yup';

import { FormConfigInterface } from './SupportForm';
import { ConfigFieldInterface } from './SupportField';
import { flatten } from 'lodash';

type RequesterType = {
  name: string;
  email: string;
};

type TicketType = {
  ticket: {
    subject: string;
    comment: {
      body: string;
    };
    tags: string[];
    requester: RequesterType;
    custom_fields: { id: number; value: string }[];
  };
};

export const getUniqueTags = (
  formValues: Record<string, string>,
  fieldsFlatArray: ConfigFieldInterface[],
  formStaticTags: string[]
): string[] =>
  fieldsFlatArray.reduce(
    (prev, curr) => {
      // check if the field has been populated
      const formValue = formValues[curr.id];

      if (typeof formValue === 'undefined') return prev;

      let selectedTags = [];
      switch (curr.type) {
        case 'checkbox':
          selectedTags = formValue && curr.tags ? curr.tags : [];
          break;

        case 'select':
          selectedTags =
            curr.values &&
            curr.values
              .filter((val) => {
                return Array.isArray(formValue) ? formValue.includes(val.value) : val.value === formValue;
              })
              .reduce((prev, curr) => {
                return [...prev, ...curr.tags];
              }, []);
          break;

        default:
          break;
      }

      return Array.from(new Set([...prev, ...selectedTags]));
    },
    [...formStaticTags]
  );

export const addRequesterFields = (config: FormConfigInterface): FormConfigInterface => {
  const fieldsToAdd: ConfigFieldInterface[][] = [
    [{ id: 'name', type: 'input', label: 'Name', placeholder: 'Enter your Name', required: true }],
    [{ id: 'email', type: 'email', label: 'Email', placeholder: 'Enter e-mail address', required: true }],
    [
      {
        id: 'subject',
        type: 'input',
        label: 'Subject',
        placeholder: 'Enter Request Subject',
        required: true,
        minLen: 5,
      },
    ],
  ];

  const fieldsFlatArray = flatten(config.fields).map((field) => field.id);

  return {
    ...config,
    fields: [...fieldsToAdd.map((row) => row.filter((field) => !fieldsFlatArray.includes(field.id))), ...config.fields],
  };
};

export const buildValidationShape = (fieldsFlatArray: ConfigFieldInterface[]): Yup.ObjectSchema<any> => {
  const validationShape = fieldsFlatArray.reduce((prev, curr) => {
    let yupType = null;

    if (curr.type === 'checkbox') {
      yupType = Yup.boolean();
    } else {
      yupType = Yup.string();
    }

    if (curr.type === 'select') {
      yupType = yupType.nullable();
      if (curr.isMulti) {
        yupType = Yup.array(Yup.string()).nullable();
      }
    }
    if (curr.type === 'address') {
      yupType = Yup.object({ lat: Yup.string(), lng: Yup.string(), address: Yup.string() });
    }

    if (typeof curr.minLen !== 'undefined') {
      yupType = yupType.min(curr.minLen, `Must be ${curr.minLen} characters or more`);
    }
    if (typeof curr.maxLen !== 'undefined') {
      yupType = yupType.max(curr.maxLen, `Must be ${curr.maxLen} characters or less`);
    }

    if (curr.type === 'email') {
      yupType = yupType.email('Invalid email address');
    }

    if (curr.showOnParentField && curr.showOnParentField.length > 0 && curr.required) {
      for (const parent of curr.showOnParentField) {
        yupType = yupType.when(`${parent.parentFieldId}`, {
          is: (value) => {
            // normalize value to an array
            const parentValuesArray = Array.isArray(value) ? value : [value];

            // look for parentFieldValue in the specified field
            return parentValuesArray.includes(parent.parentFieldValue);
          },
          then: yupType.required('Required'),
        });
      }
    } else if (curr.required) {
      if (yupType.type === 'boolean') {
        const err = `You have to accept this field to move forward`;
        yupType = yupType.oneOf([true], err).required(err);
      } else {
        yupType = yupType.required('Required');
      }
    }

    return { ...prev, [curr.id]: yupType };
  }, {});

  return Yup.object().shape(validationShape);
};

export function fillFields(
  form: Record<string, string>,
  fieldsFlatArray: ConfigFieldInterface[]
): Record<string, string> {
  return fieldsFlatArray.reduce((prev, curr) => {
    if (curr.generateFn) {
      return { ...prev, [curr.id]: curr.generateFn(form) };
    }
    return prev;
  }, {});
}

export function form2Ticket(
  form: Record<string, string>,
  fieldsFlatArray: ConfigFieldInterface[],
  formStaticTags: string[]
): TicketType {
  const { name, email, subject } = form;

  // populate customfields
  const customFields = fieldsFlatArray
    .filter((field) => field.customId)
    .map((field) => {
      return { id: field.customId, value: form[field.id] };
    });

  const requester: RequesterType = { name, email };

  // get all fields that should go in ticket body.
  const fieldsToAttachInBody = fieldsFlatArray
    .filter((field) => field.attachToBody || field.id === 'body')
    .reduce((prev, curr) => {
      return `${prev}\n\n\n#${curr.id}:\n${form[curr.id]}`;
    }, '');

  const comment = {
    body: fieldsToAttachInBody,
  };

  const tags = getUniqueTags(form, fieldsFlatArray, formStaticTags);

  return { ticket: { subject, comment, tags, requester, custom_fields: customFields } };
}

export type postForm = (ticket: TicketType, token: string, endpoint: string) => Promise<Response | any>;

export const postTicket: postForm = (ticket, token, endpoint) => {
  const queryParams: Record<string, string> = { token: token };

  // if endpoint not set, assume we are testing and set skip = true
  if (!endpoint) {
    endpoint = 'https://support-api.oniudra.cc/v2/tickets';
    queryParams['skip'] = 'true';
  }

  endpoint +=
    '?' +
    Object.keys(queryParams)
      .map((k) => `${k}=${queryParams[k]}`)
      .join('&');

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticket),
  });
};
