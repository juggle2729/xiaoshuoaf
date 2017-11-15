// import { lazyLoading } from './lazyLoading'
import { URL_PREFIX } from '../../../const'

export default {
  meta: {
    label: '物料配置',
    icon: 'fa-laptop',
    expanded: true
  },

  children: [
    {
      name: '审核模式开关',
      path: URL_PREFIX + '/data_config/sensor_switch',
      component: 'data_config/sensor'
    },
    {
      name: '支付渠道列表',
      path: URL_PREFIX + '/data_config/pay_type',
      component: 'data_config/payType'
    },
    {
      name: '批量查询',
      path: URL_PREFIX + '/data_config/transaction_details',
      component: 'data_config/transactionDetails'
    }
  ]
}
