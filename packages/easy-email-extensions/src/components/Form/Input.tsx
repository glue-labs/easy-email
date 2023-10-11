import { IconFont, useEditorProps } from '@';
import { Input as ArcoInput, InputProps as ArcoInputProps, Button, Grid, Popover } from '@arco-design/web-react';
import React, { useCallback } from 'react';
import { MergeTags } from '@extensions';

export interface InputProps extends Omit<ArcoInputProps, 'onChange'> {
  showDataOptions?: boolean;
  quickchange?: boolean;
  value: string;
  onChange: (val: string) => void;
}

export function Input(props: InputProps) {
  const {
    showDataOptions = false,
    quickchange,
    value = '',
    onKeyDown: onPropsKeyDown,
    onChange: propsOnChange,
  } = props;

  const { mergeTags } = useEditorProps();

  const onChange = useCallback(
    (val: string) => {
      propsOnChange(val);
    },
    [propsOnChange]
  );

  const onKeyDown = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (onPropsKeyDown) {
        onPropsKeyDown?.(ev);
      }

      if (quickchange) {
        let step = 0;
        if (ev.key === 'ArrowUp') {
          step = 1;
        }
        if (ev.key === 'ArrowDown') {
          step = -1;
        }

        if (step) {
          if (/^\d+/.test(value)) {
            ev.preventDefault();
            onChange(
              String(value).replace(/^(\d+)/, (_, match) => {
                return (Number(match) + step).toString();
              })
            );
          }
        }
      }
    },
    [onPropsKeyDown, quickchange, value, onChange]
  );

  return (
    <>
      <Grid.Row style={{ width: '100%' }}>

        <ArcoInput
          {...{ ...props, quickchange: undefined }}
          onChange={(value) => onChange(value)}
          onKeyDown={onKeyDown}
          addBefore= {showDataOptions && mergeTags && (
            <Popover
              trigger='click'
              content={<MergeTags value={value} onChange={onChange} />}
            >
              <Button icon={<IconFont iconName='icon-merge-tags' />} />
            </Popover>
          )}
        />
      </Grid.Row>

    </>
  );
}
