import React, { useState, useRef } from 'react';
import { uniqueId } from 'lodash';
import classNames from 'classnames';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import { IconCloseEncapsulated } from '@arduino/react-icons';

import { GenericFieldProps } from '../utils';
import { Wrapper, WrapperProps } from '../wrapper';

// Import css styles and bind the class names
import style from './input.module.scss';

export interface AddressProps extends GenericFieldProps, WrapperProps {
  /**
   * contains the initial value of the field
   */
  value?: string;
  latLng?: { lat: number; lng: number };
  /**
   * show a _clear_ button when input has value
   */
  clearable?: boolean;
  /**
   * send event when a new location is selected.
   * If no valid location is selected, then latLong is null.
   * Please set the error message accordingly when receiving null as location
   */
  onChange?: (latLong: { lat: number; lng: number; address: string } | null) => void;
  /**
   * fires when the field lose focus
   */
  onBlur?: (event: React.FocusEvent<any>) => void;
}

/**
 * A Component used to simplify address inputs.
 *
 * Typing an address, it will show a list of valid (existing) addresses for the user to select.
 *
 * Providing `onChange` callback you will get an object with latitude, longitude and the address typed (or selected)
 * by the user.
 *
 * Error management is left to the consumer of this component
 *
 * **Note**: To use this component, you are going to need to load Google Maps JavaScript API
 * `<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>`
 *
 */
export function Address({
  value = '',
  clearable = true,
  onChange,
  onBlur,
  id: fieldId,
  name,
  label,
  error,
  successMsg,
  infoMsg,
  withoutStatus,
  isDisabled,
  isReadOnly,
  isRequired,
  helper,
}: AddressProps): React.ReactElement {
  // Control the component with react
  const [id] = useState(fieldId || uniqueId());
  const [address, setAddress] = useState(value || '');

  const textInput = useRef(null);

  const changeValue = (address) => {
    setAddress(address);
  };

  const resolveAddress = (address) => {
    return new Promise((resolve) => {
      if (address.length < 10) {
        onChange({ lat: null, lng: null, address });
        resolve('');
      }

      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          // Bubble up event
          if (onChange) {
            onChange({ ...latLng, address });
          }
          resolve('');
        })
        .catch(() => {
          // Bubble up event, no matches have found
          if (onChange) {
            onChange({ lat: null, lng: null, address });
          }
          resolve('');
        });
    });
  };

  const handleSelect = (addr) => {
    setAddress(addr);

    resolveAddress(addr);
  };

  const resetValue = (): void => {
    setAddress('');
    textInput.current.focus();
    // Bubble up event, no matches have found
    if (onChange) {
      onChange({ lat: null, lng: null, address });
    }
  };

  // Compute css classes
  const inputClasses = classNames(style.input, style.address__input, {
    ['hasValue']: address && address.length > 0,
    [style['success']]: successMsg && successMsg.length,
    [style['error']]: error && error.length,
  });
  const suggestionsClasses = classNames(style.address__suggestions, {
    [style['address__suggestions--error']]: error && error.length,
  });

  // prepare wrapper props
  const wrapperProps: WrapperProps = {
    label,
    error,
    successMsg,
    infoMsg,
    htmlFor: id,
    withoutStatus,
    helper,
  };

  const renderControls = (): React.ReactElement => {
    if (!address || address.length == 0 || !clearable) {
      return null;
    }

    return (
      <div className={style['input-controls']}>
        {address.length > 0 && clearable && !isDisabled && !isReadOnly && (
          <IconCloseEncapsulated
            className={classNames(style.close, style.inputAction)}
            onClick={resetValue}
          ></IconCloseEncapsulated>
        )}
      </div>
    );
  };

  const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
    <Wrapper {...wrapperProps}>
      <input
        disabled={isDisabled}
        required={isRequired}
        readOnly={isReadOnly}
        id={id}
        name={name}
        className={inputClasses}
        ref={textInput}
        {...getInputProps()}
        onBlur={(e) => {
          e.persist();
          resolveAddress(address).then(() => onBlur(e));
        }}
      />
      {renderControls()}
      {suggestions.length > 0 && (
        <div className={suggestionsClasses}>
          {suggestions.map((suggestion, i) => {
            const className = classNames(style['address__suggestions-item'], {
              [style['address__suggestions-item--active']]: suggestion.active,
            });

            return (
              <div key={i} {...getSuggestionItemProps(suggestion, { className })}>
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      )}
    </Wrapper>
  );

  // Render component
  return (
    <PlacesAutocomplete
      value={address}
      onChange={changeValue}
      onSelect={handleSelect}
      shouldFetchSuggestions={address.length > 3}
      onError={(status, clearSuggestions) => {
        clearSuggestions();
      }}
    >
      {renderFunc}
    </PlacesAutocomplete>
  );
}
