import { useEditorProps } from 'easy-email-editor';
import { Button, Form, FormInstance, Input, Message, Modal, Space, Upload } from '@arco-design/web-react';
import { IconSave } from '@arco-design/web-react/icon';
import React, { useEffect, useRef, useState } from 'react';
import { ImageUploaderField } from '@extensions/components/Form';

export function DataPanel() {
  const { setMergeTags, mergeTags } = useEditorProps();
  const { onUploadImage } = useEditorProps();
  const formRef = useRef<FormInstance>(null);
  const [initialValues, setInitialValues] = useState<{
    tagData:
    Array<{
      key: string;
      value: string;
    }>;
  }>({ tagData: [] });

  useEffect(() => {
    if (!mergeTags) return;

    const mutableKeys = Object.keys(mergeTags).filter(tag => mergeTags[tag]?.isMutable);
    const newValues = {
      tagData: mutableKeys.map((k: string) => {
        return {
          key: k,
          value: mergeTags && mergeTags[k]?.value
        };
      }),
    };

    if (mutableKeys.length) {
      formRef?.current?.setFieldsValue(newValues);
    }
    setInitialValues(newValues);
  }, [mergeTags]);

  async function uploadImage(blob: Blob, key: string) {
    if (!onUploadImage) {
      return 'Failed';
    }

    const imageUrl = await onUploadImage(blob);

    const newObject = { ...mergeTags };
    newObject[key] = {
      value: imageUrl,
      isMutable: true,
    };

    setMergeTags && setMergeTags(newObject);
    return imageUrl;
  }

  const removeHandler = (key: string) => {
    const newObject = { ...mergeTags };

    newObject[key].value = undefined;

    setMergeTags && setMergeTags(newObject);
  };


  return (
    <div style={{ padding: 0 }}>
      <Form
        ref={formRef}
        autoComplete='off'
        onSubmit={(values => {
          const newObj: Record<string, any> = {};
          values.tagData.map((tag: { key: string; value: string; }) => {
            newObj[tag.key] = tag.value;
          });

          setMergeTags && setMergeTags({
            ...mergeTags,
            ...newObj
          });
        })}
        initialValues={initialValues}
        onValuesChange={(_, v) => {
          if (Array.isArray(_)) {
            return;
          }
          if (typeof _ === 'object') {
            const key = Object.keys(_)[0];
          }
        }}
      >
        <Form.List field='tagData'>
          {(fields, { add, remove, move }, ...rest) => {
            return (
              <div>
                {fields.map((item, index) => {
                  if (formRef.current?.getFieldValue(item.field + '.key') === 'productLogo') {
                    return (
                      <div key={item.key}>
                        <Space style={{ padding: 10 }}>
                          <Form.Item
                            field={item.field + '.key'}
                            rules={[{ required: true }]}
                            noStyle
                            label={item.field + '.key'}
                          >
                            <Input readOnly style={{ color: "black", cursor: "no-drop" }} />
                          </Form.Item>
                          <Space direction='vertical'>
                            <Form.Item
                              field={item.field + '.value'}
                              rules={[{ required: true }]}
                              noStyle
                            >
                              <Input />
                            </Form.Item>
                            <ImageUploaderField

                              label={t('src')}
                              labelHidden
                              equalSpacing={true}
                              formItem={{
                                field: item.field + '.value',
                                label: item.field + '.key',
                                noStyle: true,
                              }}
                              name={`upload`}
                              removeHandler={() => removeHandler(formRef.current?.getFieldValue(item.field + '.key'))}
                              uploadHandler={(blob) => uploadImage(blob, formRef.current?.getFieldValue(item.field + '.key'))}
                            />
                          </Space>
                        </Space>
                      </div>
                    );
                  }
                  return (
                    <div key={item.key}>
                      <Space style={{ padding: 10 }}>
                        <Form.Item
                          field={item.field + '.key'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input readOnly style={{ color: "black", cursor: "no-drop" }} />
                        </Form.Item>
                        <Form.Item
                          field={item.field + '.value'}
                          rules={[{ required: true }]}
                          noStyle
                        >
                          <Input />
                        </Form.Item>
                      </Space>
                    </div>
                  );
                })}
                <Form.Item style={{ padding: 10 }}>
                  <Space >
                    <Button
                      icon={<IconSave />}
                      type='primary'
                      htmlType='submit'
                    >
                      Save Data
                    </Button>
                  </Space>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    </div >
  );
}
