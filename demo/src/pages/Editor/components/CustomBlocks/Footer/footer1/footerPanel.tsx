import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, CollapseWrapper, ColorPickerField, EditTabField, ImageUploaderField, TextField } from 'easy-email-extensions';
import React from 'react';

export function footerPanel(props: any) {
  const { focusIdx } = useFocusIdx();

  const footerAttributeJson = [
    {
      components: [
        {
          "type": "BlockLevel",
          "label": "Footer Block",
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
          "label": "Company Name",
          "path": ".children.[0].children.[0].children.[0]",
          "properties": [
            {
              "label": "Header",
              "path": ".data.value",
              "value": "#c1c1c1"
            }
          ]
        },
        {
          "type": "Group Links",
          "label": "Links",
          "path": ".children[1]children[0]",
          "properties": [
            {
              "label": "My Profile",
              "path": ".children[0]children[0].data.value",
              "value": [
                {
                  "content": "My Profile",
                  "value": "#ffffff"
                }
              ]
            },
            {
              "label": "Contact",
              "path": ".children[1]children[0].data.value",
              "value": [
                {
                  "content": "Contact",
                  "value": "#ffffff"
                }
              ]
            },
            {
              "label": "Help",
              "path": ".children[2]children[0].data.value",
              "value": [
                {
                  "content": "Explore",
                  "value": "#ffffff"
                }
              ]
            }
          ]
        },
        {
          "type": "Social",
          "label": "Social Links",
          "path": ".children[2]children[0]children[0].data.value.elements",
          "properties": [
            {
              "value": [
                {
                  "content": "facebook",
                  "href": "",
                  "src": ""
                },
                {
                  "content": "google",
                  "href": "",
                  "src": ""
                },
                {
                  "content": "twitter",
                  "href": "",
                  "src": ""
                }
              ]
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
          footerAttributeJson[0].components.map((attribute: any, index: number) => {

            if (attribute.label === 'Footer Block') {
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
            if (attribute.label === 'Company Name') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Company Name')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        console.log();
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

            if (attribute.label === 'Links') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Links')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties.map((props: any, index: number) => {
                        return (
                          <TextField
                            label={props.label}
                            name={`${focusIdx}${attribute.path}${props.path}.content`}
                            inline
                          />
                        );
                      })}
                    </Space>
                  </Collapse.Item>
                </CollapseWrapper>
              );
            }

            if (attribute.label === 'Social Links') {
              return (
                <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
                  <Collapse.Item
                    contentStyle={{ padding: 0 }}
                    name='1'
                    header={t('Social Links')}
                  >
                    <Space
                      direction='vertical'
                      style={{ width: '100%' }}
                    >
                      {attribute.properties[0].value.map((props: any, index: number) => {
                        return (
                          <Grid.Row>
                              <Grid.Col span={11}>
                                <TextField
                                  label={t('name')}
                                  name={`${focusIdx}${attribute.path}.[${index}].content`}
                                />
                              </Grid.Col>
                              <Grid.Col
                                offset={1}
                                span={11}
                              >
                                <TextField
                                  label={t('url')}
                                  name={`${focusIdx}${attribute.path}.[${index}].src`}
                                />
                              </Grid.Col>
                            </Grid.Row>
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
