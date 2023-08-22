import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, CollapseWrapper, ColorPickerField, EditTabField, ImageUploaderField, TextField } from '@extensions';
import React from 'react';


export function TemplatePanelUi(props: any) {
  const { focusIdx } = useFocusIdx();

  return (
    <>
      <AttributesPanelWrapper style={{ padding: '20px' }}>
        <Stack vertical>
        <TextField
          label='Logo'
          name={`${focusIdx}.children[0].children[0].children[0].attributes.src`}
          inline

        />
        <TextField
          label='Company Address'
          name={`${focusIdx}.children[2].children[0].children[1].data.value.content`}
          inline

        />
        <TextField
          label='Company Name'
          name={`${focusIdx}.children[2].children[0].children[2].data.value.content`}
          inline

        />
        </Stack>
      </AttributesPanelWrapper>

    </>
  );
}
