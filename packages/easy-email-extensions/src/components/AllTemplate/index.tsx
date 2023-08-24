import { IEmailTemplate } from '@';
import { Button, Card, Divider, Select } from '@arco-design/web-react';
import Meta from '@arco-design/web-react/es/Card/meta';
import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import { useExtensionProps } from '../Providers/ExtensionProvider';

export const TemplateUi = () => {
  const { templates } = useExtensionProps();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const form = useForm();

  const onSubmit = (values: IEmailTemplate) => {
    form.restart(values);
  };

  // Filter templates based on selected types
  const filteredTemplates = templates?.filter(template => {
    if (selectedCategory === 'all') {
      return true; // Show all templates
    }
    let type = (template.templateJson.type == selectedCategory)
    return type;
  });

  return (
    <>
      <div>
        <Select
          style={{ padding: 15 }}
          value={selectedCategory}
          onChange={(value) => setSelectedCategory(value)}
        >
          <Select.Option key='all' value='all'>All</Select.Option>
          <Select.Option key='custom' value='custom'>Custom</Select.Option>
          <Select.Option key='default' value='default'>Default</Select.Option>
        </Select>
      </div>
      {
        filteredTemplates?.map((card: any, index: any) => (
          <div key={index}>
            <Card
              hoverable
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
              <Meta title={card.title} />
              <br />
              <Button onClick={() => onSubmit(card.templateJson)}>Use This Template</Button>
            </Card>
            <Divider style={{ border: '5px solid rgb(var(--gray-3))' }} />
          </div>
        ))
      }
    </>
  );
};
