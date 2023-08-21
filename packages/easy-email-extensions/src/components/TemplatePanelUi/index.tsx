import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, CollapseWrapper, ColorPickerField, EditTabField, ImageUploaderField, TextField } from '@extensions';
import React from 'react';


export function TemplatePanelUi(props: any) {
  const { focusIdx } = useFocusIdx();

  const templateJson = [
    {
      "type": "page",
      "data": {
        "value": {
          "breakpoint": "480px",
          "headAttributes": "",
          "font-size": "14px",
          "line-height": "1.7",
          "headStyles": [],
          "fonts": [],
          "responsive": true,
          "font-family": "lucida Grande,Verdana,Microsoft YaHei",
          "text-color": "#000000"
        }
      },
      "attributes": {
        "background-color": "#F4F4F4",
        "width": "600px",
        "css-class": "mjml-body"
      },
      "children": [
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "padding": "30px 0px 0px 0px",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "background-color": "#ffffff"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "image",
                  "data": {
                    "value": {}
                  },
                  "attributes": {
                    "align": "center",
                    "height": "auto",
                    "src": "https://assets.maocanhua.cn/b999e7e4-9242-4435-a4f6-c8f1d6fdfd96-image.png",
                    "target": "_blank",
                    "width": "214px",
                    "padding": "10px 25px 10px 25px"
                  },
                  "children": []
                },
                {
                  "type": "text",
                  "data": {
                    "value": {
                      "content": "<p style=\"text-align: center; margin: 10px 0;color:#151e23;font-size:14px;font-family:Georgia,Helvetica,Arial,sans-serif\">Product | Concept | Contact</p>"
                    }
                  },
                  "attributes": {
                    "align": "left",
                    "font-size": "13px",
                    "line-height": "22px",
                    "color": "#55575d",
                    "font-family": "Arial, sans-serif",
                    "padding": "0px 25px 15px 25px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "padding": "0px 0px 0px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "image",
                  "data": {
                    "value": {}
                  },
                  "attributes": {
                    "align": "center",
                    "height": "auto",
                    "src": "https://assets.maocanhua.cn/ed0590da-b6dc-4d14-bfc7-6f1931a390fd-image.png",
                    "target": "_blank",
                    "width": "600px",
                    "padding": "0px 0px 0px 0px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "30px 0px 0px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "text",
                  "data": {
                    "value": {
                      "content": "<p style=\"line-height: 30px; margin: 10px 0; text-align: center; color:#151e23; font-size:30p; font-family:Georgia,Helvetica,Arial,sans-serif\">- Our Holiday Recipes -</p>"
                    }
                  },
                  "attributes": {
                    "align": "left",
                    "font-size": "30px",
                    "line-height": "22px",
                    "color": "#55575d",
                    "font-family": "Arial, sans-serif",
                    "padding": "10px 25px 10px 25px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "20px 0px 0px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "image",
                  "data": {
                    "value": {}
                  },
                  "attributes": {
                    "align": "center",
                    "height": "auto",
                    "src": "https://assets.maocanhua.cn/be61d137-bb44-4358-a681-dea81d2a8ec1-image.png",
                    "target": "_blank",
                    "width": "1200px",
                    "padding": "0px 30px 20px 30px"
                  },
                  "children": []
                }
              ]
            },
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "text",
                  "data": {
                    "value": {
                      "content": "<p style=\"margin: 10px 0; color:#151e23; font-size:16px; font-family:Georgia,Helvetica,Arial,sans-serif\"><b>Cake Title</b></p>\n          <p style=\"line-height: 16px; margin: 10px 0;font-size:14px; color:#151e23; font-family:Georgia,Helvetica,Arial,sans-serif; color:#354552\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n          <p style=\"line-height: 16px; margin: 10px 0; color:#354552; font-size:14px; font-family:Georgia,Helvetica,Arial,sans-serif\"><u>Choose me</u> &gt;</p>"
                    }
                  },
                  "attributes": {
                    "align": "left",
                    "font-size": "13px",
                    "line-height": "22px",
                    "color": "#55575d",
                    "font-family": "Arial, sans-serif",
                    "padding": "0px 40px 0px 40px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "rtl",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "0px 0px 0px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "image",
                  "data": {
                    "value": {}
                  },
                  "attributes": {
                    "align": "center",
                    "height": "auto",
                    "src": "https://assets.maocanhua.cn/b3e16b18-9385-421e-b6a7-b28a749d6abf-image.png",
                    "target": "_blank",
                    "width": "1200px",
                    "padding": "20px 30px 20px 30px"
                  },
                  "children": []
                }
              ]
            },
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "text",
                  "data": {
                    "value": {
                      "content": "<p style=\"margin: 10px 0; color:#151e23; font-size:16px; font-family:Georgia,Helvetica,Arial,sans-serif\"><b>Cake Title</b></p>\n          <p style=\"line-height: 16px; margin: 10px 0;font-size:14px; color:#151e23; font-family:Georgia,Helvetica,Arial,sans-serif; color:#354552\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n          <p style=\"line-height: 16px; margin: 10px 0; color:#354552; font-size:14px; font-family:Georgia,Helvetica,Arial,sans-serif\"><u>Choose me</u> &gt;</p>"
                    }
                  },
                  "attributes": {
                    "align": "left",
                    "font-size": "13px",
                    "line-height": "22px",
                    "color": "#55575d",
                    "font-family": "Arial, sans-serif",
                    "padding": "0px 40px 0px 40px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "0px 0px 0px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "image",
                  "data": {
                    "value": {}
                  },
                  "attributes": {
                    "align": "center",
                    "height": "auto",
                    "src": "https://assets.maocanhua.cn/6c23a5d0-ec6c-4634-8753-49e4a2da407e-image.png",
                    "target": "_blank",
                    "width": "1200px",
                    "padding": "20px 30px 20px 30px"
                  },
                  "children": []
                }
              ]
            },
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "text",
                  "data": {
                    "value": {
                      "content": "<p style=\"margin: 10px 0; color:#151e23; font-size:16px; font-family:Georgia,Helvetica,Arial,sans-serif\"><b>Cake Title</b></p>\n          <p style=\"line-height: 16px; margin: 10px 0;font-size:14px; color:#151e23; font-family:Georgia,Helvetica,Arial,sans-serif; color:#354552\">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>\n          <p style=\"line-height: 16px; margin: 10px 0; color:#354552; font-size:14px; font-family:Georgia,Helvetica,Arial,sans-serif\"><u>Choose me</u> &gt;</p>"
                    }
                  },
                  "attributes": {
                    "align": "left",
                    "font-size": "13px",
                    "line-height": "22px",
                    "color": "#55575d",
                    "font-family": "Arial, sans-serif",
                    "padding": "0px 40px 0px 40px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "0px 0px 20px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "button",
                  "data": {
                    "value": {
                      "content": "Discover all desserts"
                    }
                  },
                  "attributes": {
                    "align": "center",
                    "background-color": "#354552",
                    "color": "#ffffff",
                    "font-weight": "normal",
                    "border-radius": "3px",
                    "line-height": "120%",
                    "target": "_blank",
                    "vertical-align": "middle",
                    "border": "none",
                    "text-align": "center",
                    "href": "#",
                    "font-size": "14px",
                    "font-family": "Georgia, Helvetica, Arial, sans-serif",
                    "text-decoration": "none",
                    "text-transform": "none",
                    "padding": "10px 25px 10px 25px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "0px 0px 0px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "image",
                  "data": {
                    "value": {}
                  },
                  "attributes": {
                    "align": "center",
                    "height": "auto",
                    "src": "https://assets.maocanhua.cn/0a270377-104e-4ea8-bd94-3df6d7afaa01-image.png",
                    "target": "_blank",
                    "width": "600px",
                    "padding": "0px 0px 0px 0px"
                  },
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "type": "section",
          "data": {
            "value": {
              "noWrap": false
            }
          },
          "attributes": {
            "background-repeat": "repeat",
            "background-size": "auto",
            "background-position": "top center",
            "border": "none",
            "direction": "ltr",
            "text-align": "center",
            "background-color": "#ffffff",
            "padding": "20px 0px 20px 0px"
          },
          "children": [
            {
              "type": "column",
              "data": {
                "value": {}
              },
              "attributes": {
                "border": "none",
                "vertical-align": "top",
                "padding": "0px 0px 0px 0px"
              },
              "children": [
                {
                  "type": "text",
                  "data": {
                    "value": {
                      "content": "Powered By x.glue.is"
                    }
                  },
                  "attributes": {
                    "align": "center",
                    "padding": "10px 25px 10px 25px"
                  },
                  "children": []
                },
                {
                  "type": "social",
                  "data": {
                    "value": {
                      "elements": [
                        {
                          "href": "",
                          "icon-size": "20px",
                          "target": "_blank",
                          "src": "https://assets.maocanhua.cn/93013b18-062d-48d7-ae00-4a5f0a9ac988.png",
                          "content": "Facebook",
                          "font-size": "13px",
                          "line-height": "22px",
                          "text-padding": "4px 4px 4px 0",
                          "vertical-align": "middle",
                          "text-decoration": "none",
                          "color": "#333333",
                          "name": "facebook"
                        },
                        {
                          "href": "",
                          "icon-size": "20px",
                          "target": "_blank",
                          "src": "https://assets.maocanhua.cn/a81ddd4b-3a12-47be-91f3-28d71eced397.png",
                          "content": "Google",
                          "font-size": "13px",
                          "line-height": "22px",
                          "text-padding": "4px 4px 4px 0",
                          "vertical-align": "middle",
                          "text-decoration": "none",
                          "color": "#333333",
                          "name": "pinterest"
                        },
                        {
                          "href": "",
                          "icon-size": "20px",
                          "target": "_blank",
                          "src": "https://assets.maocanhua.cn/0a411326-17c5-4814-ad3a-6927266f097e.png",
                          "content": "Twitter",
                          "font-size": "13px",
                          "line-height": "22px",
                          "text-padding": "4px 4px 4px 0",
                          "vertical-align": "middle",
                          "text-decoration": "none",
                          "color": "#333333",
                          "name": "instagram"
                        }
                      ]
                    }
                  },
                  "attributes": {
                    "align": "center",
                    "color": "#333333",
                    "mode": "horizontal",
                    "font-size": "13px",
                    "font-weight": "normal",
                    "border-radius": "3px",
                    "line-height": "22px",
                    "text-padding": "4px 4px 4px 0px",
                    "icon-padding": "0px",
                    "icon-size": "20px",
                    "padding": "10px 25px 10px 25px"
                  },
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  ];



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
          label='Header'
          name={`${focusIdx}.children[1].children[0].children[0].attributes.src`}
          inline

        />
        <TextField
          label='Footer'
          name={`${focusIdx}.children[8].children[0].children[0].data.value.content`}
          inline
          
        />
        </Stack>
      </AttributesPanelWrapper>

    </>
  );
}
