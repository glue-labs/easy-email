import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, CollapseWrapper, ColorPickerField, EditTabField, ImageUploaderField, TextField } from 'easy-email-extensions';
import React from 'react';

export function bodyPanel(props: any) {
  const { focusIdx } = useFocusIdx();

  const bodyAttributeJson = [
    {
      components: [
        {
          "type": "BlockLevel",
          "label": "Body Block",
          "path": "",
          "properties": [
            {
              "label": "Background Color",
              "path": ".attributes.background-color",
              "value": "#ffffff"
            },
            {
              "label": "Background Image",
              "path": ".attributes.background-url",
              "value": "https://s3.com/path"
            }
          ]
        },
        {
          "type": "Text",
          "label": "Heading",
          "path": ".children[0]",
          "properties": [
            {
              "label": "Header",
              "path": ".data.value",
              "value": "#c1c1c1",
              "content":"We Serve Healthy &amp; Delicious Foods"
            }
          ]
        },
        {
          "type": "Text",
          "label": "Description",
          "path": ".children[1]",
          "properties": [
            {
              "label": "Description",
              "path": ".data.value",
              "content":"",
              "value": "#c1c1c1"
            }
          ]
        },
        {
          "type": "Button",
          "label": "Button Text",
          "path": ".children[2]",
          "properties": [
            {
              "label": "Button Text",
              "path": ".data.value",
              "content":"",
              "background-color": "#ffffff",
            }
          ]
        },
      ]
    }
  ];

  return (
    <AttributesPanelWrapper style={{ padding: '20px' }}>
      <Stack vertical>
        {
          bodyAttributeJson[0].components.map((attribute: any, index: number) => {

            if (attribute.label === 'Body Block') {
              return (
                attribute.properties.map((prop: any, index: number) => {
                  if (prop.label === 'Background Color') {
                    return (
                      <ColorPickerField
                        label='Background color'
                        name={`${focusIdx}${prop.path}`}
                        inline
                      // alignment='center'
                      />
                    );
                  }
                  if (prop.label === 'Background Image') {
                    return (
                      <>
                        <ImageUploaderField
                          label={prop.label}
                          name={`${focusIdx}${prop.path}`}
                          inline
                        // alignment='center'
                        />
                      </>
                    );
                  }
                })
              );
            }
            if (attribute.label === 'Heading') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Heading')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        return (
                          <TextField
                            label={attribute.label}
                            name={`${focusIdx}${attribute.path}${props.path}.content`}
                          />
                        );
                      })}
                    </Space>
                  </Collapse.Item>
                </CollapseWrapper>
              );
            }
            if (attribute.label === 'Description') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Description')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        return (
                          <TextField
                            label={attribute.label}
                            name={`${focusIdx}${attribute.path}${props.path}.content`}
                          />
                        );
                      })}
                    </Space>
                  </Collapse.Item>
                </CollapseWrapper>
              );
            }
            if (attribute.label === 'Button Text') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Button Text')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        return (
                          <TextField
                            label={attribute.label}
                            name={`${focusIdx}${attribute.path}${props.path}.content`}
                          />
                        );
                      })}
                    </Space>
                  </Collapse.Item>
                </CollapseWrapper>
              );
            }
          })
        }
      </Stack>
    </AttributesPanelWrapper>
  );
}
