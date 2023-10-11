import React, { useState } from 'react';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Tooltip, Button } from '@arco-design/web-react';
import { IconFont } from 'easy-email-editor';
import { BackgroundColor, CollapseWrapper } from '../attributes';
import { HtmlEditor } from '../UI/HtmlEditor';
import { TextField } from '@extensions/components/Form';

export function DefaultAttributePanel() {
  const [visible, setVisible] = useState(false);

  const attributeePanelJson = {
    "cssFields": {
        "logoWidth": {
            "value": "100px",
            "component": "logoComponent",
            "styleName": "width"
        },
        "logoHeight": {
            "value": "40px",
            "component": "logoComponent",
            "styleName": "height"
        }
    },
    "dataFields": [
        {
            "type": "string",
            "block": "logoComponent",
            "label": "Logo",
            "category": "fieldValue",
            "focusIdPath": "children[0].children[0].children[0].attributes.src",
            "mergeTagValue": "logo"
        },
        {
            "type": "string",
            "block": "brandComponent",
            "label": "brandName",
            "category": "fieldValue",
            "focusIdPath": "children[1].children[0].children[0].data.value.content",
            "mergeTagValue": "brand"
        },
        {
            "type": "string",
            "label": "Header Image Url",
            "category": "fieldValue",
            "focusIdPath": "children[2].children[0].children[0].attributes.src",
            "mergeTagValue": "headerImgUrl"
        }
    ]
  };

  return (
    <AttributesPanelWrapper>
      <CollapseWrapper defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item
          name='1'
          header={t('Data')}
        >

          {attributeePanelJson.dataFields.map((obj, ind) => {
            if (obj.type === 'string') {
              <TextField key={ind} name={obj.label} showDataOptions={true}></TextField>
            }
          })}
        </Collapse.Item>
      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
