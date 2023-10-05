import React, { useEffect, useState } from 'react';
import { Tabs } from '@arco-design/web-react';
import { AttributePanel } from '@extensions/AttributePanel';
import { DataPanel } from '@extensions/DataPanel';
import { FullHeightOverlayScrollbars } from '@extensions/components/FullHeightOverlayScrollbars';
import { IconLeft } from '@arco-design/web-react/icon';
import styles from './index.module.scss';
// import { BlockLayer } from '@extensions/BlockLayer';
// import { GlobalAttributePanel } from '@extensions/GlobalAttributePanel';

export interface ConfigurationPanelProps {
  showSourceCode: boolean;
  jsonReadOnly: boolean;
  mjmlReadOnly: boolean;
  height: string;
  onBack?: () => void;
  compact?: boolean;
}

export function ConfigurationPanel({
  showSourceCode,
  height,
  onBack,
  compact,
}: ConfigurationPanelProps) {
  const [inited, setInited] = useState(false);

  useEffect(() => {
    // Tabs 在 drawer 里面有bug
    let timer = setTimeout(() => {
      setInited(true);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!inited) return null;

  return (
    <>
      {showSourceCode ? (
        <Tabs
          className={styles.tabs}
          renderTabHeader={(_, DefaultHeader) =>
            !compact ? (
              <div
                className={styles.largeTabsHeader}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div
                  style={{ padding: 10, cursor: 'pointer' }}
                  onClick={onBack}
                >
                  <IconLeft fontSize={16} />
                </div>

                <DefaultHeader style={{ flex: 1 }} />
              </div>
            ) : (
              <div
                className={styles.largeTabsHeader}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <DefaultHeader style={{ flex: 1 }} />
              </div>
            )
          }
        >
          <Tabs.TabPane
            title={
              <div style={{ height: 40, lineHeight: '40px' }}>{t('Attributes')}</div>
            }
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              {/* <BlockLayer/> */}
              <AttributePanel />
              {/* <GlobalAttributePanel/> */}
            </FullHeightOverlayScrollbars>
          </Tabs.TabPane>

          <Tabs.TabPane
            destroyOnHide
            key='Data'
            title={
              <div style={{ height: 40, lineHeight: '40px' }}>{t('Data')}</div>
            }
          >
            <FullHeightOverlayScrollbars height={`calc(${height} - 60px)`}>
              <DataPanel />
            </FullHeightOverlayScrollbars>
          </Tabs.TabPane>
        </Tabs>
      ) : (
        <AttributePanel />
      )}
    </>
  );
}
