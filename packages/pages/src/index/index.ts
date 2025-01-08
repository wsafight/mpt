import { startup } from '../startup';
import routes from './routes';
import { loadAssets } from '@mpt/blocks';

// 提前加载
loadAssets('echarts');

startup(routes);
