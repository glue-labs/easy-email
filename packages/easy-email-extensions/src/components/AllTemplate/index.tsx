import { Button, Card, Divider } from '@arco-design/web-react';
import Meta from '@arco-design/web-react/es/Card/meta';
import React from 'react';
import { useForm } from 'react-final-form';
import { useExtensionProps } from '../Providers/ExtensionProvider';
import { MjmlToJson } from '@extensions/utils/MjmlToJson';

export const TemplateUi = () => {
  const { templates, updateDefaultData } = useExtensionProps();
  const form = useForm();

  const onSubmit = (mjml: string, id: number) => {
    const content = MjmlToJson(mjml);
    console.log('Content', content);
    form.restart({
      subject: '',
      content,
      subtitle: ''
    });
    updateDefaultData && updateDefaultData(+id);
  };

  return (
    <>
      {
        templates?.map((card: any, index: any) => {
          return (
            <div key={index}>
              <Card
                hoverable
                key={index}
                style={{ width: 360, padding: '10px' }}
                cover={(
                  <div style={{ height: 204, overflow: 'hidden' }}>
                    <img
                      style={{ width: '100%', transform: 'translateY(-20px)' }}
                      alt='dessert'
                      src={card.imageUrl}
                    />
                  </div>
                )}
              >
                <Meta
                  title={card.title}
                  key={index}
                />
                <br />
                <Button onClick={() => onSubmit(card.templateMjml, card.id)}>Use This Template
                </Button>
              </Card>
              <Divider style={{ border: '5px solid rgb(var(--gray-3))' }} />
            </div>
          );
        })
      }
    </>
  );
};
