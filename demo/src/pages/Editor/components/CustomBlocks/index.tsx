import { BlockManager } from 'easy-email-core';
import { BlockAttributeConfigurationManager } from 'easy-email-extensions';
import { CustomBlocksType } from './constants';
import { Panel as ProductRecommendationPanel, ProductRecommendation } from './ProductRecommendation';

import { Panel as TopBarPanel1 } from './TopBar/topbar1/panel';
import { Body2 } from './Body/body2';

import { Footer1 } from './Footer/footer1';
import { TopBar3 } from './TopBar/topbar3';
import { TopBar4 } from './TopBar/topbar4';
import { TopBar5 } from './TopBar/topbar5';
import { TopBar6 } from './TopBar/topbar6';
import { topBar5Panel } from './TopBar/topbar5/panel';
import { footerPanel } from './Footer/footer1/footerPanel';
import { TopBar1 } from './TopBar/topbar1';
import { TopBar2 } from './TopBar/topbar2';
import { Body1 } from './Body/body1';
import { bodyPanel } from './Body/body1/bodyPanel';

BlockManager.registerBlocks({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendation,
  [CustomBlocksType.TOPBAR_1]: TopBar1,
  [CustomBlocksType.TOPBAR_2]: TopBar2,
  [CustomBlocksType.TOPBAR_3]: TopBar3,
  [CustomBlocksType.TOPBAR_4]: TopBar4,
  [CustomBlocksType.TOPBAR_5]: TopBar5,
  [CustomBlocksType.TOPBAR_6]: TopBar6,
  [CustomBlocksType.BODY_1]: Body1,
  [CustomBlocksType.BODY_2]: Body2,
  [CustomBlocksType.FOOTER_1]: Footer1
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.PRODUCT_RECOMMENDATION]: ProductRecommendationPanel,
  [CustomBlocksType.TOPBAR_5]: topBar5Panel,
  [CustomBlocksType.FOOTER_1]: footerPanel,
  [CustomBlocksType.BODY_1]: bodyPanel

});
